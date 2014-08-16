<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
String path = request.getContextPath();
String lang = "zh";
%>
<html lang="<%=lang%>">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
	<title><%="zh".equalsIgnoreCase(lang) ? "表单设计" : "Form Designer"%></title>
	<link rel="shortcut icon" type="image/x-icon" href="<%=path%>/favicon.ico" />
	
	<link rel="stylesheet" href="<%=path%>/js/dhtmlx3/dhtmlx_classic.css">
	<link rel="stylesheet" href="<%=path%>/js/dhtmlx3/dhtmlx_custom_classic.css">
	<link rel="stylesheet" href="<%=path%>/js/jquery-ui/jquery-ui.css">
	
	<link rel="stylesheet" href="<%=path%>/css/formoid-default-skyblue.css">
	<link rel="stylesheet" href="<%=path%>/css/formbasic.css">
	<link rel="stylesheet" href="<%=path%>/css/formdesigner.css">
	<link rel="stylesheet" href="<%=path%>/css/formdesigner_elem.css">
	<link rel="stylesheet" href="<%=path%>/css/tipsy.css">
	
	<script src="<%=path%>/js/jquery/jquery-1.10.2.js"></script>
	<script src="<%=path%>/js/jquery/jquery.i18n.properties-min-1.0.9.js"></script>
	<script src="<%=path%>/js/jquery/jquery.tipsy.js"></script>
	<script src="<%=path%>/js/jquery-ui/jquery-ui.js"></script>
	<script src="<%=path%>/js/3rdpartyother/json2.js"></script>
	<script src="<%=path%>/js/util/common.js"></script>
	
	<script src="<%=path%>/js/dhtmlx3/dhtmlx.js"></script>
	<script src="<%=path%>/js/dhtmlx3_ext/util.js"></script>
	<script src="<%=path%>/js/dhtmlx3_ext/dhxwindow.js"></script>
	<script src="<%=path%>/js/dhtmlx3_ext/excell_types.js"></script>
	<script src="<%=path%>/js/dhtmlx3_ext/validator.js"></script>
	
	<script src="<%=path%>/js/formdesigner/formdesigner_i18n_<%=lang%>.js"></script>
	<script src="<%=path%>/js/formdesigner/formdesigner_elem_i18n_<%=lang%>.js"></script>

	<style>
	
	
	</style>
</head>
<body>
<div class="wait">
	<div>
		<div><img src='<%=path%>/images/loading.gif'></div>
		<div class="waitMsg"></div>
	</div>
</div>
<div id="fmdmaindiv"></div>
<script src="<%=path%>/js/formdesigner/formdesigner.js"></script>
<script src="<%=path%>/js/formdesigner/formdesigner_elem.js"></script>
<script src="<%=path%>/js/formdesigner/formdesigner_propfunc.js"></script>
<script src="<%=path%>/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script>

window.onload = function() {

	waitstart();
	
	//context path
	ctxpath = '<%=path%>';
	
	//dhx constants
	dhtmlx.image_path = ctxpath + '/js/dhtmlx3/imgs/';
	dhx_skin = "dhx_skyblue";

	//language
	fmd.lang = '<%=lang%>';
	fmd.inputformtype = '<%=request.getAttribute("formtype")%>';

	//init component basic vars
	fmdf_initComponentMeta();
	
	//load modules
	//alert(JSON.stringify(fmdmeta_prop));
	try {
		waitstart();
		var modules_layout = <%=request.getAttribute("modules_layout")%>;
		//fmdf_loadModules(ctxpath + '<%=request.getAttribute("modules_path_layout")%>', modules_layout);
		var modules_control = <%=request.getAttribute("modules_control")%>;
		fmdf_loadModules(ctxpath + '<%=request.getAttribute("modules_path_control")%>', modules_control);
	} catch(e){
		dhtmlx.message({expire:-1,type:"error",
			text:"An error has occured while loading modules.<br/> Please, see the log file!<br/>"+e
			});
	}

	//init
	var formid = <%=request.getAttribute("formid")==null ? null : "\""+request.getAttribute("formid")+"\""%>;
	var versionid = <%=request.getAttribute("versionid")==null ? null : "\""+request.getAttribute("versionid")+"\""%>;
	fmd.isEditor = <%=request.getAttribute("isEditor")%>;

	waitend();
	
	fmdf_init(formid, versionid);

	


	//testing
	/* menu = new dhtmlXMenuObject();
	menu.setIconsPath(ctxpath + '/images/');
	menu.setSkin(dhx_skin);
	menu.renderAsContextMenu();
	//menu.addContextZone('fmdcanvas');
	menu.addNewChild(menu.topId, 0, "open", "Open", false, "ok.png");

	$(".selectable").bind("contextmenu", function(e) {
		alert(e.screenX +"=="+ e.screenY);
		menu.showContextMenu(e.screenX, e.screenY);
	}); */
	
};

window.onresize = function() {
	fmd.body_layout && fmd.body_layout.setSizes();
}
</script>

</body>
</html>
