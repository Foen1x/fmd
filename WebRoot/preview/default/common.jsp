<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>

<%
String path = request.getContextPath();
String base = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
String basePath = base + path;

String resPath = request.getContextPath()+"/skins/default/";

//login name
String loginName = (String)session.getAttribute("loginName");
if(null == loginName){
	loginName = "bpmdevadmin";
}
//login name
String displayName = (String)session.getAttribute("displayName");
if(null == displayName){
	displayName = "管理员";
}
//post id
String postId = (String)session.getAttribute("postId");
if(null == postId){
	postId = "";
}
//post name
String postName = (String)session.getAttribute("postName");
if(null == postName){
	postName = "";
}
//post id
String deptId = (String)session.getAttribute("deptId");
if(null == deptId){
	deptId = "";
}
//post name
String deptName = (String)session.getAttribute("deptName");
if(null == deptName){
	deptName = "";
}
//app language
String lang = (String)session.getAttribute("lang");
if (lang==null) {
	lang = "zh";
}
String ldapLang = "cn";
if("zh".equals(lang)){
	ldapLang = "cn";
} else {
	ldapLang = "en";
}
//app version
String jsversion = System.getProperty("bpm.jsversion");
if (jsversion==null || jsversion.length()==0) {
	jsversion = "1";
	System.setProperty("bpm.jsversion", jsversion);
}
String IE_version = "edge";
String ua = request.getHeader("user-agent");
if (ua!=null && ua.indexOf("MSIE")!=-1) {
	String version = ua.split("; ")[1].split(" ")[1];
	if ("7.0".equals(version)) {//IE compatible mode
		IE_version = "7";
	}else if ("8.0".equals(version)) {//IE compatible mode
		IE_version = "8";
	} else if ("9.0".equals(version)) {
		IE_version = "9";
	} else if ("10.0".equals(version)) {
		IE_version = "10";
	}
}
//use by Button certification authority
String resId = (String)request.getAttribute("resid");
%>