<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
// String strOp = activity == null || activity.get("enOperations") == null ? "{}" : activity.get("enOperations").toString();
// JSONObject op = JSONObject.fromObject(strOp);
// String edAttachment = op.containsKey("edAttachment") ? op.getString("edAttachment") : "";

%>
<style>

.dhxform_obj_dhx_skyblue .dhx_file_uploader div.dhx_upload_controls div.dhx_file_uploader_button {position: absolute; width: 70px; height: 25px; top: 10px;  font-size: 2px; cursor: pointer; overflow: hidden; -moz-user-select: none}
.dhx_file_uploader_button.button_browse {
	width:100px;
	height:20px;
    left: 20px;
}
.dhxform_obj_dhx_skyblue{background:#fff;}
 #file_div a{color:#C0C0C0}
 </style>

<div id="attachment1"  class="mk">
    <h2 class="mk_title">附件信息<img src="<%= path %>/skins/default/css/images/mk_title_imgz.jpg" width="15" height="15"/></h2> 
	<table id="_fjid" class="tb_2td" width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr>
		<td id="td_fid" style="background:none;">
			<div id="file_div" style="border:none;padding-top:10px;padding-bottom:10px;"></div>
			<div id="myUpload" style="width:380px; display:block; float:left; overflow:hidden;"></div>
		</td>
	  </tr>
	</table>
</div>