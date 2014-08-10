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
<script src="<%=path%>/js/3rdpartyother/json2html.js"></script>
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
			<li class="active"><a href="#tabbody_1" data-toggle="tab">主表单
			</a></li>
			<li><a href="#tabbody_2" data-toggle="tab">附件</a></li>
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
										<td style="width:33%"><label>文本框</label>
											<div class="form-control-div">
												<input type="text" class="form-control" placeholder="文本输入">
											</div></td>
										<td style="width:33%"><label>文本框</label>
											<div class="form-control-div">
												<input type="text" class="form-control" placeholder="文本输入">
											</div></td>
										<td style="width:33%"><label>文本框</label>
											<div class="form-control-div">
												<input type="text" class="form-control" placeholder="文本输入">
											</div></td>
									</tr>
									<tr>
										<td style="width:33%"><label>文本框</label>
											<div class="form-control-div">
												<input type="text" class="form-control" placeholder="文本输入">
											</div></td>
										<td style="width:33%"><label>文本框</label>
											<div class="form-control-div">
												<input type="text" class="form-control" placeholder="文本输入">
											</div></td>
										<td style="width:33%"><label>文本框</label>
											<span class="form-control-div help-block">一个帮助文本块一行</span>
										</td>
									</tr>
									<tr>
										<td style="width:33%"><label>文本框</label>
											<div class="form-control-div">
												<input type="text" class="form-control" placeholder="文本输入">
											</div></td>
										<td style="width:33%"><label>文本框</label>
											<div class="form-control-div">
												<input type="text" class="form-control" placeholder="文本输入">
											</div></td>
										<td style="width:33%"><label>文本框</label>
											<div class="input-group input-group-lg">
												<span class="input-group-addon">@</span> <input type="text"
													class="form-control" placeholder="Twitterhandle">
											</div></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div class="panel panel-info container">
					<div class="panel-heading">
						<h3 class="panel-title">业务基本信息</h3>
					</div>
					<div class="panel-body">
						<div class="table-responsive form-inline">
							<table class="table">
								<tbody>
									<tr>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<input style="width: 60%" type="text" class="form-control"
											placeholder="文本输入"></td>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<input style="width: 60%" type="text" class="form-control"
											placeholder="文本输入"></td>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<input style="width: 60%" type="text" class="form-control"
											placeholder="文本输入"></td>
									</tr>
									<tr>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<input style="width: 60%" type="text" class="form-control"
											placeholder="文本输入"></td>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<input style="width: 60%" type="text" class="form-control"
											placeholder="文本输入"></td>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<div style="width: 60%; display: inline">
												<span class="help-block">一个较长的帮助文本块，超过一行，
													需要扩展到下一行。本实例中的帮助文本总共有两行。</span>
											</div></td>
									</tr>
									<tr>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<input style="width: 60%" type="text" class="form-control"
											placeholder="文本输入"></td>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<input style="width: 60%" type="text" class="form-control"
											placeholder="文本输入"></td>
										<td class="col-lg-4"><label style="width: 30%">文本框</label>
											<div style="width: 60%" class="input-group input-group-lg">
												<span class="input-group-addon">@</span> <input type="text"
													class="form-control" placeholder="Twitterhandle">
											</div></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

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
</body>
</html>