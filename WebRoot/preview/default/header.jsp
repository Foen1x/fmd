<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

    <div class="header_bj">
       <div class="header">
         <div class="left">
           <ul>
             <li id="_tabMain" class="select"><b class="se_bj_l"></b><a href="javascript:;" onclick="showPageMain(this)">主表单</a><b class="se_bj_r"></b></li>
             <li id="_tabDiagram" class="unselect"><b class="unse_bj_l"></b><a href="javascript:;" onclick="showPageDiagram(this)">流程图</a><b class="unse_bj_r"></b></li>
           </ul>
         </div>
         <div class="right">
            <ul>
              <li class="bc"><a href="javascript:void(0)" onclick="doSave()"><img src="<%= path %>/skins/default/css/images/head_bc.png" width="13" height="13" />保存</a></li>
              <li class="tj"><a href="javascript:void(0)" onclick="doSubmit()"><img src="<%= path %>/skins/default/css/images/head_tj.png" width="13" height="13" />提交</a></li>
              <li class="tj"><a href="javascript:void(0)" onclick="doSubmit()"><img src="<%= path %>/skins/default/css/images/head_tj.png" width="13" height="13" />通过</a></li>
              <li><a href="javascript:void(0)" onclick="doRefuse()"><img src="<%= path %>/skins/default/css/images/head_bh.png" width="13" height="13" />驳回</a></li>
              <li><a href="javascript:void(0)" onclick="doReturn()"><img src="<%= path %>/skins/default/css/images/head_th.png" width="13" height="13" />退回</a></li>
              <li><a href="javascript:void(0)" onclick="doReject()"><img src="<%= path %>/skins/default/css/images/head_refuse.png" width="13" height="13" />拒绝</a></li>
              <li><a href="javascript:void(0)" onclick="doReassign()"><img src="<%= path %>/skins/default/css/images/head_zb.png" width="13" height="13" />转办</a></li>
              <li><a href="javascript:void(0)" onclick="doInvolve()"><img src="<%= path %>/skins/default/css/images/head_add.png" width="13" height="13" />加签</a></li>
              <li><a href="javascript:void(0)" onclick="doClaimRepeal()"><img src="<%= path %>/skins/default/css/images/head_th.png" width="13" height="13" />退领</a></li>
<!--               <li class="bz"><a href="javascript:void(0)" onclick="doComments()"><img src="<%//= path %>/skins/default/css/images/head_bz.png" width="13" height="13" />意见</a></li> -->
              <li><a href="javascript:void(0)" onclick="doCancel()"><img src="<%= path %>/skins/default/css/images/head_zx.png" width="13" height="13" />撤销</a></li>
              <li><a href="javascript:void(0)" onclick="doClose()"><img src="<%= path %>/skins/default/css/images/head_gb.png" width="13" height="13" />关闭</a></li>
              <li id="header_btn_helper" style="display:none"><a href="javascript:void(0)" onclick="doHelp()"><img src="<%= path %>/skins/default/css/images/head_help.png" width="13" height="13" />帮助</a></li>
            </ul>
         </div>      
       </div>
     </div>
     
<script>
function showPageMain(tabObj) {
    $("#_pageMain").show();
    $("#_pageDiagram").hide();
    $(".fy").show();
}

function showPageDiagram(tabObj) {
    $("#_pageMain").hide();
    $("#_pageDiagram").show();
    $(".fy").hide();
}

function doSubmit() {
	alert("datactx.b=\n\n"+JSON.stringify(datactx.b));
}

function doSave() {
	alert("datactx.b=\n\n"+JSON.stringify(datactx.b));
}
</script>