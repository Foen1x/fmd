<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
String path = request.getContextPath();
String lang = "zh";
String loginName = "admin";
String displayName = "超级管理员";
%>
<html lang="<%=lang%>">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
	<title><%="zh".equalsIgnoreCase(lang) ? "表单管理" : "Form Manager"%></title>
	
	<link rel="shortcut icon" type="image/x-icon" href="<%=path%>/favicon.ico" />
	<link rel="stylesheet" href="<%=path%>/js/dhtmlx3/dhtmlx_classic.css">
	<link rel="stylesheet" href="<%=path%>/js/dhtmlx3/dhtmlx_custom_classic.css">
	<link rel="stylesheet" href="<%=path%>/js/jquery-ui/jquery-ui.css">
	<link rel="stylesheet" href="<%=path%>/css/formmanager.css">
	
	<script src="<%=path%>/js/jquery/jquery-1.10.2.js"></script>
	<script src="<%=path%>/js/jquery/jquery.i18n.properties-min-1.0.9.js"></script>
	<script src="<%=path%>/js/jquery-ui/jquery-ui.js"></script>
	
	<script src="<%=path%>/js/dhtmlx3/dhtmlx.js"></script>
	<script src="<%=path%>/js/dhtmlx3_ext/util.js"></script>
	<script src="<%=path%>/js/dhtmlx3_ext/dhxwindow.js"></script>
	<script src="<%=path%>/js/dhtmlx3_ext/excell_types.js"></script>
	<script src="<%=path%>/js/3rdpartyother/json2.js"></script>
	<script src="<%=path%>/js/util/common.js"></script>
	
	<script src="<%=path%>/js/formmanager/formmanager_i18n_<%=lang%>.js"></script>

	<style>
	
	
	</style>
</head>
<body>
<div id="fmgmaindiv" style="width:100%;height:100%"></div>
<div class="wait">
	<div>
		<div><img src='<%=path%>/images/loading.gif'></div>
		<div class="waitMsg"></div>
	</div>
</div>
<script src="<%=path%>/js/formmanager/fmdmanager.js"></script>
<script>

ctxpath = "<%=path%>";
fmg.loginName = "<%=loginName%>";
fmg.displayName = "<%=displayName%>";

fmg.lang = '<%=lang%>';
fmg.imagepath = ctxpath + '/images/';

//dhx constants
dhtmlx.image_path = ctxpath + '/js/dhtmlx3/imgs/';
dhx_skin = "dhx_skyblue";

window.onload = function() {

	fmg_initVariables();
	fmg_initLayout();
	fmg_toPagef(1, 10);
	
};

</script>

</body>
</html>
