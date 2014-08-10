package com.tss.formdesigner.service;

import java.util.logging.Logger;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tss.formdesigner.dao.mysql.TsFormMapper;
import com.tss.formdesigner.dao.mysql.TsFormVersionMapper;
import com.tss.formdesigner.model.TsForm;
import com.tss.formdesigner.model.TsFormVersion;
import com.tss.formdesigner.model.TsFormVersionKey;
import com.tss.formdesigner.parser.Parser;
import com.tss.formdesigner.parser.ParserFactory;
import com.tss.util.FmdSettings;

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
		Parser parser = ParserFactory.getParser(FmdSettings.getValue(FmdSettings.PARSER_IMPL));
		
		try {
			parser.init(realPath, skin, lang);
			
			if (TsForm.TYPE_PROCESS.equalsIgnoreCase(form.getFormtype())) {
				JSONObject formdata = JSONObject.fromObject(version.getFormdata());
				JSONArray blocks = formdata.getJSONObject("formconf").getJSONArray("tabs").getJSONObject(0).getJSONArray("items");
				JSONObject propconfs = formdata.getJSONObject("propconf");
				StringBuilder mHtml = parser.parseModules(blocks.toString(), propconfs.toString());
				logger.finer("generatePreview="+mHtml);
				return "{\"success\":true}";
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "{\"success\":false}";
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