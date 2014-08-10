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
<link href="<%=path%>/skins/bootstrap-blue/css/bootstrap.min.css"
	rel="stylesheet">
<script src="<%=path%>/js/jquery/jquery-1.10.2.js"></script>

<script src="<%=path%>/skins/bootstrap-blue/js/bootstrap.min.js"></script>
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
			<li class="active"><a href="#tabbody_1" data-toggle="tab">主表单 </a></li>
			<li><a href="#tabbody_2" data-toggle="tab">附件(5)</a></li>
			<li><a href="#tabbody_3" data-toggle="tab">历史</a></li>
			<li><a href="#tabbody_4" data-toggle="tab">流程图</a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade in active" id="tabbody_1">
			
				<div class="panel panel-info container">
					<div class="panel-heading">
						<h3 class="panel-title">基本信息</h3>
					</div>
					<div class="panel-body">
						<div class="table-responsive form-inline">
							<table class="table">
							   <tbody>
							      <tr>
							         <td class="col-md-4">
								         <label style="width:30%">文本框</label>
								         <input style="width:60%" type="text" class="form-control" placeholder="文本输入">
							         </td>
							         <td class="col-md-4">
								         <label>文本框</label>
								         <input type="text" class="form-control" placeholder="文本输入">
							         </td>
							         <td class="col-md-4">
								         <label>文本框</label>
								         <input type="text" class="form-control" placeholder="文本输入">
							         </td>
							      </tr>
							      <tr>
							         <td class="col-md-4">
								         <label for="name">文本框</label>
								         <input type="text" class="form-control" placeholder="文本输入">
							         </td>
							         <td class="col-md-4">
								         <label for="name">文本框</label>
								         <input type="text" class="form-control" placeholder="文本输入">
							         </td>
							         <td class="col-md-4">
								         <label for="name">文本框</label>
								         <span class="help-block">一个较长的帮助文本块，超过一行，
   需要扩展到下一行。本实例中的帮助文本总共有两行。</span>
							         </td>
							      </tr>
							      <tr>
							         <td class="col-md-4">
								         <label for="name">文本框</label>
								         <input type="text" class="form-control" placeholder="文本输入">
							         </td>
							         <td class="col-md-4">
								         <label for="name">文本框</label>
								         <input type="text" class="form-control" placeholder="文本输入">
							         </td>
							         <td class="col-md-4">
							         	<label for="name">文本框</label>
								         <div class="input-group input-group-lg">
									         <span class="input-group-addon">@</span>
									         <input type="text" class="form-control" placeholder="Twitterhandle">
									      </div>
							         </td>
							      </tr>
							   </tbody>
							</table>
						</div>
					</div>
				</div>
				
				<div class="panel panel-info container">
					<div class="panel-heading">
						<h3 class="panel-title">基本信息</h3>
					</div>
					<div class="panel-body">
						    <form class="form-horizontal">  
						        <div class="row">  
						            <div class="col-md-1">
						            	<label class="control-label">文本框</label>
						            </div>
						            <div class="col-md-3">
								        <input type="text" class="form-control" placeholder="文本输入">
								    </div>
						            <div class="col-md-1">
						            	<label for="name">文本框</label>
						            </div>
						            <div class="col-md-3">
								        <input type="text" class="form-control" placeholder="文本输入">
								    </div>
								    <div class="col-md-1">
						            	<label for="name">文本框</label>
						            </div>
						            <div class="col-md-3">
						            	<p class="form-control-static">email@example.com</p>
								    </div>
						        </div>  
						        <div class="row">  
						            <div class="col-md-4 form-group">
						            	<label class="col-md-4" for="c1">文本框1</label>
								        <input type="text" class="form-control" placeholder="文本输入" id="c1">
								    </div>  
						            <div class="col-md-4 form-group">
						            	<label class="col-md-4">文本框22</label>
								        <input type="text" class="form-control" placeholder="文本输入">
								    </div>  
						            <div class="col-md-4 form-group">
						            	<label class="col-md-4">文本框333</label>
								        <input type="text" class="form-control" placeholder="文本输入">
								    </div>
						        </div>  
						        <div class="row">
						            <div class="col-md-4 form-group">
						            	<label class="col-md-4" for="name">文本框444</label>
								        <input type="text" class="col-md-7 form-control" placeholder="文本输入">
								    </div>
						            <div class="col-md-4 form-group">
						            	<label class="col-md-4" for="name">文本框555</label>
								        <input type="text" class="form-control col-md-8" placeholder="文本输入">
								    </div>
						            <div class="col-md-4 form-group">
						            	<label class="col-md-4" for="name">文本框6</label>
								        <input type="text" class="form-control col-md-8" placeholder="文本输入">
								    </div>
						        </div>
						    </form>
					</div>
				</div>
				
			</div>
			<div class="tab-pane fade" id="tabbody_2">
				<p>iOS 是一个由苹果公司开发和发布的手机操作系统。最初是于 2007 年首次发布 iPhone、iPod Touch 和
					Apple TV。iOS 派生自 OS X，它们共享 Darwin 基础。OS X 操作系统是用在苹果电脑上，iOS
					是苹果的移动版本。</p>
			</div>
			<div class="tab-pane fade" id="tabbody_3">
				<p>jMeter 是一款开源的测试软件。它是 100% 纯 Java 应用程序，用于负载和性能测试。</p>
			</div>
			<div class="tab-pane fade" id="tabbody_4">
				<p>jMeter 是一款开源的测试软件。它是 100% 纯 Java 应用程序，用于负载和性能测试。</p>
			</div>
		</div>
	</div>

<script type="text/javascript">
$(function() {
	$(".panel-heading").click(function(e){$(this).next().toggle();});
});
</script>
</body>
</html>