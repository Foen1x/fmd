<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="./common.jsp" %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><%="zh".equalsIgnoreCase(lang) ? "表单设计预览" : "Form Designer Preview"%></title>
<link rel="stylesheet" type="text/css" href="<%= path %>/skins/default/css/css.css"/>
<link rel="stylesheet" type="text/css" href="<%= path %>/skins/default/js/jqueryui/css/jquery.ui.min.css">
<%@ include file="./commonhead.jsp" %>
<script src="<%=path%>/js/jquery/jquery.tipsy.js"></script>
<script type="text/javascript" src="<%= path %>/skins/default/js/jqueryui/js/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="<%= path %>/js/3rdpartyother/angular-all.min.js"></script>
<%-- <script type="text/javascript" src="<%= path %>/preview/angular-helper.js"></script> --%>
<script type="text/javascript" src="<%= path %>/preview/dummydata.js"></script>
<script type="text/javascript">

function initAngularApp() {
	
	angularApp = angular.module("pfApp", []);

	angularApp.controller("datactx", function($scope) {
		    $scope.b = datactx.b;
		    $scope.p = datactx.p;
			$scope.m = datactx.m;

		});

	angular.bootstrap($('.content')[0], ['pfApp']);
}

	
function initAngularAppData() {
	//read from db
	pv_initData();
}


$(document).ready(function(){
	initAngularAppData();
	initAngularApp();
	//$('.label').tipsy({gravity:"w"});
});

</script>
</head>

<body>
<div class='wait'>
	<div>
		<div><img src='<%= path %>/skins/default/css/images/loading.gif'></div>
		<div>请耐心等待...</div>
	</div>
</div>
<form autocomplete="off" >
<div class="form">

    <%@ include file="./header.jsp" %>
    
    <div class="content" id="_pageMain" ng-controller="datactx">
        <%@ include file="./baseInfo.jsp" %>
        
        <% String formfile = request.getParameter("formfile");
        if (formfile!=null && formfile.trim().length()>0) {%>
        <jsp:include page="<%=formfile%>" ></jsp:include>
        <%} %>
        
        <%@ include file="./attachment.jsp" %>

        <%@ include file="./commentsInfo.jsp" %>
    </div>
    
    <div class="content" id="_pageDiagram" style="display:none">
       <div class="img" id="div_bpdDiagram" >
          <div id="_popMsg" style="display:none; border:#ccc solid 1px; width:250px; height:110px;border-radius:3px;position:absolute;z-index:10;background:#ffff99;padding:3px;"></div>
          <div id="img_bpdPath" style="display:none;font-family:微软雅黑; font-size:16px;font-weight:bold;position:absolute;top:0px;left:30px;z-index:10000"></div>
	   </div>
    </div>

    <%@ include file="./footer.jsp" %>
    
</div>

<div id="dialogCompleteStep" title="后续环节及处理人" style="display:none;">
  <h2>意见:</h2>
  <div id="dialogCompleteStepComments">
    <span class="in-select" style="padding-bottom:10px">
    </span>
  </div>
  <div id="dialogCompleteStepActor">
  </div>
</div>
<div id="dialogCompleteTask" title="同环节处理人" style="display:none;"></div>
<div id="dialogCompleteRefused" title="驳回的任务重新提交" style="display:none;"></div>

<div id="dialogJump" title="" style="display:none;">
  <h2 style="padding-top:10px;">选择环节：</h2>
  <div id="dialogJumpActs" style="height:50px">
    <span class="in-select" style="width:300px">
      <input type="hidden" id="jumpTo" value="" >   
      <input type="text" class="in_select" readonly >
      <span data-oiginal-title="" class="tip in_select_tip">
        <i class="icon-select"></i>
        <div class="select-d" style="display:none"><ul></ul></div>
      </span>
    </span>
  </div>
  <h2>意见：</h2>
  <div id="dialogJumpComments">
    <span class="in-select" style="padding-bottom:10px">
    </span>
  </div>
  <div><textarea id="_jumpComments" class="area" maxlength="200" style="width:96%;height:30px"></textarea></div>
</div>

<div id="dialogReassign" title="任务转办" style="display:none;">
  <h2>意见</h2>
  <textarea id="_reassignComments" class="area" maxlength="200" style="width:96%;height:30px"></textarea>
  <h2 style="margin-top:10px">转办给：</h2>
  <div>
    <span class="people" showtype="s">
      <input type="hidden" id="reassignToUserId" value="">
      <input type="hidden" id="reassignToUserName" value="">
      <span class="mninput mn_input" style="width:235px">
        <span contenteditable="true">&nbsp;</span>
      </span>
      <span class="tip tip_person"><i class="icon-user"></i> </span>
    </span>
  </div>
</div>

<div id="dialogInvolve" title="任务加签" style="display:none;">
    <h2 style="margin-top:10px">加签给：</h2>
    <div>
    <span class="people" showtype="s">
      <input type="hidden" id="involveUserId" value="">
      <input type="hidden" id="involveUserName" value="">
      <span class="mninput mn_input" style="width:235px">
        <span contenteditable="true">&nbsp;</span>
      </span>
      <span class="tip tip_person"> <i class="icon-user"></i> </span>
    </span>
    </div>
</div>

<div id="dialogReject" title="" style="display:none;">
  <h2>意见</h2>
  <textarea id="_rejectComments" class="area" maxlength="200" style="width:96%;height:60px"></textarea>
</div>

</form>

</body>
</html>
