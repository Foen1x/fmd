package com.tss.formdesigner.service;

import java.util.logging.Logger;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tss.formdesigner.dao.mysql.TsFormMapper;
import com.tss.formdesigner.dao.mysql.TsFormVersionMapper;
import com.tss.formdesigner.model.TsForm;
import com.tss.formdesigner.model.TsFormVersion;
import com.tss.formdesigner.model.TsFormVersionKey;
import com.tss.formdesigner.parser.Parser;
import com.tss.formdesigner.parser.ParserManager;
import com.tss.util.FmdSettings;
import com.tss.util.HtmlUtil;

/**
 * 
 * @author Johnny
 *
 */
@Service
public class FormDesignerService {
	
	private Logger logger = Logger.getLogger(FormDesignerService.class.getName());
	
	@Autowired
	private TsFormMapper fDao;
	
	@Autowired
	private TsFormVersionMapper fvDao;

	public String generatePreview(String formid, String versionid, String lang, String skin, String realPath) {
		TsForm form = fDao.selectByPrimaryKey(formid);
		TsFormVersionKey key = new TsFormVersionKey();
		key.setFormid(formid);
		key.setVersionid(versionid);
		TsFormVersion version = fvDao.selectByPrimaryKey(key);
		Parser parser = ParserManager.getParser();
		
		try {
			parser.init(realPath, skin, lang);
			
			if (TsForm.TYPE_PROCESS.equalsIgnoreCase(form.getFormtype())) {
				JSONObject formdata = JSONObject.fromObject(version.getFormdata());
				
				//parser modules
				JSONObject tab0 = formdata.getJSONObject("formconf").getJSONArray("tabs").getJSONObject(0);
				JSONObject propconfs = formdata.getJSONObject("propconf");
				
				JSONObject moduleRtn = parser.parseModules(tab0.toString(), propconfs.toString());
				String formmodules = HtmlUtil.formatHtmlCode(moduleRtn.getString("html"));
				String generatedScript = moduleRtn.optString("generatedscript");
				String fmdv = moduleRtn.optString("fmdv");
				logger.finer("generatePreview modules formated=\n"+formmodules);
				
				//parse form
				JSONObject env = new JSONObject();
				env.put("ctxpath", FmdSettings.getValue(FmdSettings.FORMVARS, "targetapp.contextpath"));
				
				JSONObject formprop = new JSONObject();
				formprop.put("formmodules", formmodules);
				formprop.put("generatedscript", "fmdv=JSON.parse('"+fmdv+"');\n\n"+generatedScript);
				formprop.put("refscript", formdata.optString("refscript"));
				addScript(formprop, "readyscript", formdata.optString("readyscript"));
				addScript(formprop, "bodyscript", formdata.optString("bodyscript"));
				
				StringBuilder fHtml = parser.parseForm(TsForm.TYPE_PROCESS.toLowerCase(), env.toString(), formprop.toString());
				logger.finer("generatePreview form=\n"+fHtml);
				
				//generate file
				String previewFolder = HtmlUtil.getPreviewRelativePath(skin);
				String formfile = "/" + previewFolder + "/generated/" + HtmlUtil.getPreviewFileName(formid, versionid, lang);
				String relativePath = formfile;
				
				//get js parser config for form type
				JSONObject fpcfg = parser.getFormJsParserConfig(TsForm.TYPE_PROCESS.toLowerCase());
				logger.finer("generatePreview form js parser config="+fpcfg);
				if (fpcfg!=null) {
					String wrapperPage = fpcfg.optString("wrapper_page");
					if (wrapperPage!=null && wrapperPage.trim().length()>0) {
						relativePath = "/" + previewFolder
								+ "/"
								+ wrapperPage
								+ "?formfile="
								+ formfile
								+ "&lang="+lang;//wrapper need a lang parameter
					}
				}
				
				HtmlUtil.generatedPreviewFile(realPath + formfile, fHtml.toString());
				
				return "{\"success\":true, \"relativePath\":\""+relativePath+"\"}";
			}
			return "{\"success\":false, \"err\":\"Form type:"+form.getFormtype()+" is not supported!\"}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{\"success\":false, \"err\":\""+e.getMessage()+"\"}";
		}
	}
	
	private void addScript(JSONObject formprop, String name, String script) {
		if (script!=null  && script.length()>0) {
			//script = "<script type=\"text/javascript\">" + script + "</script>";
		} else {
			script = "";
		}
		formprop.put(name, script);
	}
	
	/*private void parseItems(Parser parser, JSONObject propconf, JSONObject m) throws Exception {
		JSONArray items = m.optJSONArray("items");
		if (items==null) {
			return;
		}
		for (int i=0; i<items.size(); i++) {
			JSONObject item = items.getJSONObject(i);
			String id = item.optString("id");
			String prop = id==null ? null : propconf.getJSONObject(id).toString();
			logger.finer("generatePreview tab"+parser.parseModule(item.toString(), prop));
			parseItems(parser, propconf, item);
		}
	}*/
	
}