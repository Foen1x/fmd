package com.tss.formdesigner.web.action;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tss.formdesigner.service.FmdService;
import com.tss.util.FmdSettings;
import com.tss.util.ModuleUtil;


/**
 * For form designer
 * @author fuzheng
 *
 */
@Controller
public class FormDesignerAction {
    
	//logger
	private static Logger logger = Logger.getLogger(FormDesignerAction.class.getName());
	
	/**
	 * fmd service
	 */
	@Autowired
	private FmdService fmds;
	
	/**
	 * navigation action
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/fmdmanage")
    public String fmdmanage(@Context HttpServletRequest request) {
    	try {
    		String path = "formmanager";
    		
    		return path;
		} catch (Exception e) {
			logger.severe("Error in init action: "+e.getMessage());
			e.printStackTrace();
			return null;
		}
    }
	
	/**
	 * navigation action
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/fmddesign")
    public String fmddesign(@Context HttpServletRequest request) {
    	try {
    		String path = "formdesigner";
    		String loginName = "admin";
    		//String displayName = "超级管理员";
    		String realPath = request.getServletContext().getRealPath("/");
    		String formid = request.getParameter("formid");
    		String formtype = request.getParameter("formtype");
    		String versionid = request.getParameter("versionid");
    		logger.finer("fmddesign loginName="+loginName);
    		logger.finer("fmddesign formtype="+formtype);
    		logger.finer("fmddesign formid="+formid);
    		logger.finer("fmddesign versionid="+versionid);
    		
    		//set formid and versionid
    		if (formid!=null && versionid!=null) {
    			request.setAttribute("formid", formid);
    			request.setAttribute("versionid", versionid);
    		} else {
    			//TODO check formtype
    			request.setAttribute("formtype", formtype);//form type for new form
    		}
    		
    		//check if current user is editor, always true for new form
    		boolean isEditor = formid==null ? true : fmds.isEditor(loginName, formid, versionid);
    		request.setAttribute("isEditor", isEditor);
    		
    		//get layout modules
    		String modules_path_layout = FmdSettings.getValue(FmdSettings.MODULE_PATH_LAYOUT);
    		logger.finer("fmddesign modules_path_layout="+modules_path_layout);
    		request.setAttribute("modules_path_layout", modules_path_layout);
    		request.setAttribute("modules_layout", ModuleUtil.getModuleNames(realPath, modules_path_layout));
    		
    		//get control modules
    		String modules_path_control = FmdSettings.getValue(FmdSettings.MODULE_PATH_CONTROL);
    		logger.finer("fmddesign modules_path_control="+modules_path_control);
    		request.setAttribute("modules_path_control", modules_path_control);
    		request.setAttribute("modules_control", ModuleUtil.getModuleNames(realPath, modules_path_control));
    		
    		return path;
		} catch (Exception e) {
			logger.severe("Error in init action: "+e.getMessage());
			e.printStackTrace();
			return null;
		}
    }
	
}
