package com.tss.formdesigner.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tss.formdesigner.dao.mysql.TsFormHistoryMapper;
import com.tss.formdesigner.dao.mysql.TsFormMapper;
import com.tss.formdesigner.dao.mysql.TsFormVersionMapper;
import com.tss.formdesigner.model.TsForm;
import com.tss.formdesigner.model.TsFormHistoryWithBLOBs;
import com.tss.formdesigner.model.TsFormVersion;
import com.tss.formdesigner.model.TsFormVersionKey;
import com.tss.util.Const;
import com.tss.util.DateUtil;
import com.tss.util.DhxUtil;

@Service
public class FmdService {
	
	private Logger logger = Logger.getLogger(FmdService.class.getName());
	
	@Autowired
	private TsFormMapper fDao;
	
	@Autowired
	private TsFormVersionMapper fvDao;
	
	@Autowired
	private TsFormHistoryMapper fhDao;
	

	public synchronized String[] saveForm(String loginName, String displayName, String param) {
		JSONObject p = JSONObject.fromObject(param);
		JSONObject f = p.getJSONObject("form");
		String formid = f.optString("formid");
		String versionid = null;
		System.out.println("saveForm formid="+formid);
		
		if (formid==null || formid.length()==0) {//save new form
			logger.finer("saveForm saving new form...");
			formid = "FORM-" + UUID.randomUUID().toString();
			TsForm form = new TsForm();
			form.setFormid(formid);
			form.setCreator(loginName);
			form.setCreatorname(displayName);
			Date createtime = DateUtil.getGMTDate();
			form.setCreatetime(createtime);
			form.setFormname(f.getString("formname"));
			form.setFormdesc(f.optString("formdesc"));
			form.setFormtype(f.getString("formtype"));
			form.setStatus(TsForm.STATUS_ACTIVE);
			TsFormVersion version = new TsFormVersion();
			version.setFormid(formid);
			version.setCreatetime(createtime);
			version.setUpdatetime(createtime);
			version.setCreator(loginName);
			version.setCreatorname(displayName);
			version.setCheckoutby(loginName);
			version.setCheckoutbyname(displayName);
			version.setVersionid("0");
			version.setStatus(TsFormVersion.STATUS_ACTIVE);
			version.setIsdefault(Const.FALSE0);
			version.setVersionname(TsFormVersion.CURRENT);
			version.setFormdata(p.getJSONObject("version").getString("formdata"));
			fDao.insert(form);
			fvDao.insert(version);
			versionid = version.getVersionid();
			
		} else {	//update existing form
			logger.finer("saveForm saving existing form...");
			JSONObject jv = p.getJSONObject("version");
			Date updatetime = DateUtil.getGMTDate();
			
			//set form
			TsForm form = fDao.selectByPrimaryKey(formid);
			form.setFormname(f.optString("formname"));
			form.setFormdesc(f.optString("formdesc"));
			TsFormVersionKey key = new TsFormVersionKey();
			key.setFormid(formid);
			versionid = jv.getString("versionid");
			key.setVersionid(versionid);
			TsFormVersion version = fvDao.selectByPrimaryKey(key);
			if (!"0".equals(versionid)) {//update version name and desc
				version.setVersionname(jv.getString("versionname"));
				version.setVersiondesc(jv.getString("versiondesc"));
			}
			
			//set history
			TsFormHistoryWithBLOBs his = new TsFormHistoryWithBLOBs();
			his.setChangeuserid(loginName);
			his.setChangeusername(displayName);
			his.setFormid(formid);
			his.setVersionid(versionid);
			his.setUpdatetime(updatetime);
			his.setIsautosave(p.optString("isautosave"));
			his.setFormdata(version.getFormdata());
			his.setChangeno(Long.parseLong(fhDao.getMaxChangeno(formid, versionid).get("MAX").toString())+1);
			
			//set version new value
			version.setUpdatetime(updatetime);
			version.setIsdefault(jv.optString("isdefault"));
			version.setStatus(jv.optString("status"));
			version.setFormdata(jv.optString("formdata"));
			
			fDao.updateByPrimaryKeySelective(form);
			fvDao.updateByPrimaryKeySelective(version);
			fhDao.insert(his);
			
		}
		logger.finer("saveForm return formid="+formid);
		return new String[]{formid, versionid};
	}
	
	/**
	 * delete a form, just change status to 02
	 * @param formid
	 */
	public String deleteForm(String formid) {
		//TODO check if the form is in used
		if (isFormUsed(formid)) {
			return "{\"result\":-1}";
		}
		TsForm form = fDao.selectByPrimaryKey(formid);
		form.setStatus(TsForm.STATUS_DISCARD);
		int rs = fDao.updateByPrimaryKeySelective(form);
		return "{\"result\":"+rs+"}";
	}
	
	/**
	 * get a version
	 * @param formid
	 * @param versionid
	 * @return
	 */
	public String getVersion(String formid, String versionid) {
		TsForm form = fDao.selectByPrimaryKey(formid);
		TsFormVersionKey key = new TsFormVersionKey();
		key.setFormid(formid);
		key.setVersionid(versionid);
		TsFormVersion version = fvDao.selectByPrimaryKey(key);
		JSONObject rtn = new JSONObject();
		rtn.put("form", JSONObject.fromObject(form));
		rtn.put("version", JSONObject.fromObject(version));
		return rtn.toString();
	}
	
	/**
	 * delete a version
	 * @param formid
	 * @param versionid
	 * @return
	 */
	public String deleteVersion(String formid, String versionid) {
		if (isVersionUsed(formid, versionid)) {
			return "{\"result\":-1}";
		}
		TsFormVersion version = new TsFormVersion();
		version.setFormid(formid);
		version.setVersionid(versionid);
		version.setStatus(TsFormVersion.STATUS_DISCARD);
		int rs = fvDao.updateByPrimaryKeySelective(version);
		return "{\"result\":"+rs+"}";
	}
	
	/**
	 * update version
	 * @param versionstr
	 * @return
	 */
	public String updateVersion(String versionstr) {
		TsFormVersion version = (TsFormVersion)JSONObject.toBean(JSONObject.fromObject(versionstr), TsFormVersion.class);
		int rs = fvDao.updateByPrimaryKeySelective(version);
		return "{\"result\":"+rs+"}";
	}

	/**
	 * query form
	 * @param formstr
	 * @param fInd
	 * @param lInd
	 * @param timezoneOffset
	 * @param lang
	 * @param ordercolumns
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String queryForm(String formstr, int fInd, int lInd, int timezoneOffset, String lang, String ordercolumns) {
		Map<String, Object> params = new HashMap<String,Object>();
		Map<String, Object> form = new HashMap<String,Object>();
		if (formstr!=null) {
			form.putAll(JSONObject.fromObject(formstr));
		}
		params.put("form", form);
		params.put("fromRow", fInd-1);
		params.put("toRow", lInd);
		params.put("rows", lInd - fInd + 1);
		params.put("timezoneOffset", timezoneOffset);
		params.put("orderby", DhxUtil.parseGridOrderBy(ordercolumns));
		logger.finer("queryForm params="+params);
		List<Map<String,?>> list = fDao.pagingSelect(params);
		int total = Integer.parseInt(fDao.pagingSelectCount(params).get("COUNT").toString());
		String[] formCols = new String[]{"FORMID","FORMTYPE","FORMNAME","FORMDESC","CREATOR","CREATORNAME"};
		return DhxUtil.toGridJsonStr(list, 
				formCols, fInd, total, timezoneOffset, lang);
	}
	
	/**
	 * query version
	 * @param argstr
	 * @param fInd
	 * @param lInd
	 * @param timezoneOffset
	 * @param lang
	 * @param ordercolumns
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String queryVersion(String argstr, int fInd, int lInd, int timezoneOffset, String lang, String ordercolumns) {
		Map<String, Object> params = new HashMap<String,Object>();
		Map<String, Object> args = new HashMap<String,Object>();
		if (argstr!=null) {
			args.putAll(JSONObject.fromObject(argstr));
		}
		params.put("args", args);
		params.put("fromRow", fInd-1);
		params.put("toRow", lInd);
		params.put("rows", lInd - fInd + 1);
		params.put("timezoneOffset", timezoneOffset);
		params.put("orderby", DhxUtil.parseGridOrderBy(ordercolumns));
		logger.finer("queryVersion params="+params);
		List<Map<String,?>> list = fvDao.pagingSelect(params);
		int total = Integer.parseInt(fvDao.pagingSelectCount(params).get("COUNT").toString());
		String[] versionCols = new String[]{"VERSIONID","VERSIONNAME","VERSIONDESC","UPDATETIME","CHANGEUSERID","CHANGEUSERNAME",
				"CHECKOUTBY","CHECKOUTBYNAME","CREATOR","CREATORNAME","STATUS"};
		return DhxUtil.toGridJsonStr(list, 
				versionCols, fInd, total, timezoneOffset, lang);
	}
	
	/**
	 * clone to new version
	 * @param loginName
	 * @param displayName
	 * @param formid
	 * @param versionid
	 * @param name
	 * @param desc
	 * @return
	 */
	public synchronized String toNewVersion(String loginName, String displayName, String formid, String versionid, String name, String desc) {
		TsFormVersionKey key = new TsFormVersionKey();
		key.setFormid(formid);
		key.setVersionid(versionid);
		TsFormVersion version = fvDao.selectByPrimaryKey(key);
		version.setVersionid(String.valueOf(Integer.parseInt(fvDao.getMaxVersionid(formid).get("MAX").toString())+1));
		version.setVersionname(name);
		version.setVersiondesc(desc);
		Date d = DateUtil.getGMTDate();
		version.setCreatetime(d);
		version.setUpdatetime(d);
		version.setCreator(loginName);
		version.setCreatorname(displayName);
		version.setCheckoutby(loginName);
		version.setCheckoutbyname(displayName);
		version.setStatus(TsFormVersion.STATUS_ACTIVE);
		logger.finer("inserting version versionid="+versionid);
		fvDao.insertSelective(version);
		return "{\"result\":true, \"versionid\":\""+version.getVersionid()+"\"}";
	}
	
	/**
	 * clone to new form
	 * @param loginName
	 * @param displayName
	 * @param formid
	 * @param versionid
	 * @param name
	 * @param desc
	 * @return
	 */
	public synchronized String toNewForm(String loginName, String displayName, String formid, String versionid, String name, String desc) {
		//form
		TsForm form = fDao.selectByPrimaryKey(formid);
		form.setFormid("FORM-" + UUID.randomUUID().toString());
		Date d = DateUtil.getGMTDate();
		form.setFormname(name);
		form.setFormdesc(desc);
		form.setCreatetime(d);
		form.setCreator(loginName);
		form.setCreatorname(displayName);
		form.setStatus(TsForm.STATUS_ACTIVE);
		//version
		TsFormVersionKey key = new TsFormVersionKey();
		key.setFormid(formid);
		key.setVersionid(versionid);
		TsFormVersion version = fvDao.selectByPrimaryKey(key);
		version.setFormid(form.getFormid());
		version.setVersionid("0");
		version.setVersionname(TsFormVersion.CURRENT);
		version.setVersiondesc(null);
		version.setCreatetime(d);
		version.setUpdatetime(d);
		version.setCreator(loginName);
		version.setCreatorname(displayName);
		version.setCheckoutby(loginName);
		version.setCheckoutbyname(displayName);
		version.setStatus(TsFormVersion.STATUS_ACTIVE);
		fDao.insertSelective(form);
		fvDao.insertSelective(version);
		return "{\"result\":true, \"formid\":\""+form.getFormid()+"\", \"versionid\":\""+version.getVersionid()+"\"}";
	}
	
	/**
	 * check if an user is the editor of a version
	 * @param formid
	 * @param versionid
	 * @return
	 */
	public boolean isEditor(String loginName, String formid, String versionid) {
		TsFormVersionKey key = new TsFormVersionKey();
		key.setFormid(formid);
		key.setVersionid(versionid);
		TsFormVersion version = fvDao.selectByPrimaryKey(key);
		return loginName.equalsIgnoreCase(version.getCheckoutby());
	}
	
	/**
	 * check if the form is in used
	 * @param formid
	 * @return
	 */
	private boolean isFormUsed(String formid) {
		//TODO
		return false;
	}
	
	/**
	 * check if the form is in used
	 * @param formid
	 * @return
	 */
	private boolean isVersionUsed(String formid, String versionid) {
		//TODO
		return false;
	}
}
