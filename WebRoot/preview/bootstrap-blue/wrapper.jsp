<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String lang = "zh";
%>
<!DOCTYPE html>
<html>
<head>
<title>Bootstrap</title>
<link href="<%=path%>/skins/bootstrap-blue/css/custom.css"
	rel="stylesheet">
<link href="<%=path%>/skins/bootstrap-blue/css/bootstrap.css"
	rel="stylesheet">
<script src="<%=path%>/js/jquery/jquery-1.10.2.js"></script>
<script src="<%=path%>/js/3rdpartyother/json2html.js"></script>
<script src="<%=path%>/skins/bootstrap-blue/js/bootstrap.js"></script>

${refscript}
${headerscript}
</head>
<body>

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">任务操作</a>
		</div>
		<div>
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">提交</a></li>
				<li><a href="#">驳回</a></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">高级<b class="caret"></b>
				</a>
					<ul class="dropdown-menu">
						<li><a href="#">转办</a></li>
						<li><a href="#">加签</a></li>
						<li><a href="#">通知</a></li>
						<li class="divider"></li>
						<li><a href="#">分离的链接</a></li>
						<li class="divider"></li>
						<li><a href="#">另一个分离的链接</a></li>
					</ul></li>
			</ul>
		</div>
	</nav>

	<div id="main">
		<ul id="myTab" class="nav nav-tabs">
			<li class="active"><a href="#tabbody_1" data-toggle="tab">主表单
			</a></li>
			<li><a href="#tabbody_2" data-toggle="tab">附件</a></li>
			<li><a href="#tabbody_3" data-toggle="tab">历史</a></li>
			<li><a href="#tabbody_4" data-toggle="tab">流程图</a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="tabbody_1">
				<% String formfile = request.getParameter("formfile");
		        if (formfile!=null && formfile.trim().length()>0) {%>
		        <jsp:include page="<%=formfile%>" ></jsp:include>
		        <%} %>
			</div>
			<div class="tab-pane fade" id="tabbody_2">
				<p>系统预留页面</p>
			</div>
			<div class="tab-pane fade" id="tabbody_3">
				<p>系统预留页面</p>
			</div>
			<div class="tab-pane fade" id="tabbody_4">
				<p>系统预留页面</p>
			</div>
		</div>
	</div>

<script type="text/javascript">
$(function() {
	$(".panel-heading").click(function(e){$(this).next().toggle();});
});
</script>
${bodyscript}
</body>
</html>