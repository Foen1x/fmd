package com.tss.formdesigner.web.rest;


import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.tss.formdesigner.service.FmdService;
import com.tss.formdesigner.service.FormDesignerService;
import com.tss.util.Const;


/**
 * 流程实例管理类rest类型
 * @author Johnny
 * 2013-11-2
 *
 */
@Controller
@Path("/fmd")
public class FmdResource {
	
	private static Logger logger = Logger.getLogger(FmdResource.class.getName());
	
	@Autowired
	private FmdService fmds;
	
	@Autowired
	private FormDesignerService fds;
	
	/**
	 * 请求数据
	 */
	@Context
	private HttpServletRequest request;
	
	/**
	 * save form
	 * @param param
	 * @return
	 */
	@POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
	public String save(@FormParam("param")String param){
		String loginName = "admin";
		String displayName = "超级管理员";
		//String lang = "zh";
		logger.finer("save param=\n"+param);
		String[] ids = fmds.saveForm(loginName, displayName, param);
		JSONObject rtn = JSONObject.fromObject(Const.AJAX_SUCC);
		rtn.put("formid", ids[0]);
		rtn.put("versionid", ids[1]);
		return rtn.toString();
	}
	
	/**
	 * delete form
	 * @param param
	 * @return
	 */
	@POST
    @Path("deleteForm")
    @Produces(MediaType.APPLICATION_JSON)
	public String deleteForm(@FormParam("formid")String formid){
		logger.finer("deleteForm formid="+formid);
		String rtn = fmds.deleteForm(formid);
		return rtn;
	}
	
	/**
	 * query form
	 * @param param
	 * @return
	 */
	@POST
    @Path("queryForm")
    @Produces(MediaType.APPLICATION_JSON)
	public String queryForm(@FormParam("form")String form,
			@FormParam("fromRow")int fromRow,
			@FormParam("toRow")int toRow,
			@FormParam("timezoneOffset")int timezoneOffset,
			@FormParam("ordercolumns")String ordercolumns){
		String lang = "zh";
		logger.finer("queryForm form="+form);
		logger.finer("queryForm fromRow="+fromRow);
		logger.finer("queryForm toRow="+toRow);
		logger.finer("queryForm timezoneOffset="+timezoneOffset);
		logger.finer("queryForm lang="+lang);
		logger.finer("queryForm ordercolumns="+ordercolumns);
		return fmds.queryForm(form, fromRow, toRow, timezoneOffset, lang, ordercolumns);
	}
	
	/**
	 * get a version
	 * @param param
	 * @return
	 */
	@POST
    @Path("getVersion")
    @Produces(MediaType.APPLICATION_JSON)
	public String getVersion(@FormParam("formid")String formid, @FormParam("versionid")String versionid){
		//String lang = "zh";
		return fmds.getVersion(formid, versionid);
	}
	
	/**
	 * delete version
	 * @param param
	 * @return
	 */
	@POST
    @Path("deleteVersion")
    @Produces(MediaType.APPLICATION_JSON)
	public String deleteVersion(@FormParam("formid")String formid, @FormParam("versionid")String versionid){
		logger.finer("deleteVersion formid="+formid);
		logger.finer("deleteVersion versionid="+versionid);
		String rtn = fmds.deleteVersion(formid, versionid);
		return rtn;
	}
	
	/**
	 * update version
	 * @param param
	 * @return
	 */
	@POST
    @Path("updateVersion")
    @Produces(MediaType.APPLICATION_JSON)
	public String updateVersion(@FormParam("version")String version){
		logger.finer("updateVersion version="+version);
		String rtn = fmds.updateVersion(version);
		return rtn;
	}
	
	/**
	 * query version
	 * @param param
	 * @return
	 */
	@POST
    @Path("queryVersion")
    @Produces(MediaType.APPLICATION_JSON)
	public String queryVersion(@FormParam("args")String args,
			@FormParam("fromRow")int fromRow,
			@FormParam("toRow")int toRow,
			@FormParam("timezoneOffset")int timezoneOffset,
			@FormParam("ordercolumns")String ordercolumns){
		String lang = "zh";
		logger.finer("queryVersion args="+args);
		logger.finer("queryVersion fromRow="+fromRow);
		logger.finer("queryVersion toRow="+toRow);
		logger.finer("queryVersion timezoneOffset="+timezoneOffset);
		logger.finer("queryVersion lang="+lang);
		logger.finer("queryVersion ordercolumns="+ordercolumns);
		return fmds.queryVersion(args, fromRow, toRow, timezoneOffset, lang, ordercolumns);
	}
	
	/**
	 * clone to new version
	 * @param param
	 * @return
	 */
	@POST
    @Path("toNewVersion")
    @Produces(MediaType.APPLICATION_JSON)
	public String toNewVersion(@FormParam("formid")String formid, 
			@FormParam("versionid")String versionid,
			@FormParam("name")String name,
			@FormParam("desc")String desc){
		String loginName = "admin";
		String displayName = "超级管理员";
		logger.finer("toNewVersion formid="+formid);
		logger.finer("toNewVersion versionid="+versionid);
		logger.finer("toNewVersion name="+name);
		logger.finer("toNewVersion desc="+desc);
		logger.finer("toNewVersion loginName="+loginName);
		logger.finer("toNewVersion displayName="+displayName);
		String rtn = fmds.toNewVersion(loginName, displayName, formid, versionid, name, desc);
		return rtn;
	}
	
	/**
	 * clone to new version
	 * @param param
	 * @return
	 */
	@POST
    @Path("toNewForm")
    @Produces(MediaType.APPLICATION_JSON)
	public String toNewForm(@FormParam("formid")String formid, 
			@FormParam("versionid")String versionid,
			@FormParam("name")String name,
			@FormParam("desc")String desc){
		String loginName = "admin";
		String displayName = "超级管理员";
		logger.finer("toNewForm formid="+formid);
		logger.finer("toNewForm versionid="+versionid);
		logger.finer("toNewForm name="+name);
		logger.finer("toNewForm desc="+desc);
		logger.finer("toNewForm loginName="+loginName);
		logger.finer("toNewForm displayName="+displayName);
		String rtn = fmds.toNewForm(loginName, displayName, formid, versionid, name, desc);
		return rtn;
	}
	
	/**
	 * generate form preview html
	 * @param formid
	 * @param versionid
	 * @param skin
	 * @return
	 */
	@POST
    @Path("generatePreview")
    @Produces(MediaType.APPLICATION_JSON)
	public String generatePreview(@FormParam("formid")String formid, @FormParam("versionid")String versionid,
			@FormParam("skin")String skin){
		String lang = "zh";
		String realPath = request.getServletContext().getRealPath("/");
		logger.finer("toPreview lang="+lang);
		logger.finer("toPreview realPath="+realPath);
		logger.finer("toPreview formid="+formid);
		logger.finer("toPreview versionid="+versionid);
		return fds.generatePreview(formid, versionid, lang, skin, realPath);
	}
	
}
