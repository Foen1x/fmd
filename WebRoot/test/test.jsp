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
	
	<title>Form Designer</title>
	<link rel="stylesheet" href="<%=path%>/js/jquery-ui/jquery-ui.css">
	<link rel="stylesheet" href="<%=path%>/js/dhtmlx3/dhtmlx.css">
	<link rel="stylesheet" href="<%=path%>/css/formoid-default-skyblue.css">
	<link rel="stylesheet" href="<%=path%>/css/formbasic.css">
	<link rel="stylesheet" href="<%=path%>/css/formdesigner.css">
	
	<script src="<%=path%>/js/jquery-1.10.2.js"></script>
	<script src="<%=path%>/js/jquery-ui/jquery-ui.js"></script>
	<script src="<%=path%>/js/json2.js"></script>
	<script src="<%=path%>/js/dhtmlx3/dhtmlx.js"></script>
	<script src="<%=path%>/test/test.js"></script>

	<style>
	
	html, body {
		width: 100%;
		height: 100%;
		margin: 0px;
		padding: 0px;
		overflow: hidden;
	}
	
	body {
		font-family: "Microsoft YaHei","Trebuchet MS","Verdana","Arial","Helvetica","sans-serif";
		font-size:100%;
		background-color:#EBEBEB;
	}
	
	button {
		width:150px;
		height:20px;
	}
	
	</style>
</head>
<body>
<script>
contextroot = "<%=path%>";
window.onload = function () {
	var g1 = new dhtmlXGridObject("div1");
	g1.setSkin("dhx_skyblue");// set grid skin
	g1.setImagePath(contextroot+"/js/dhtmlx3/imgs/");//path to images required by grid
	g1.setHeader("选择,序号,记账码,账号,分配,文本,金额");// set column names
	g1.setInitWidths("40,40,60,150,220,340,80");// set  column width in px
	g1.setColTypes("ch,stree,dhxCalendar,ro,ro,ro,ro");// set column types
	g1.setColumnIds("ch,no,pk,account,allocation,text,money");// set column names
	g1.setColAlign("center,center,center,left,left,left,right"); // set column values align
	g1.setColumnsVisibility("false,false,false,false,false,false,false");
	g1.setEditable(true);
	g1.init();// initialize grid

	g1.addRow(1,[1,"0","0","0","0","0","0"]);
}

</script>
<div id="div1" style="width:500px;height:400px"></div>
</body>
</html>
