<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>


<script type="text/javascript">

</script>

<input id="_drafter" class="input4" type="hidden" name="drafter" value="" desc="申请人id" />
<input id="_draftDeptId" class="input4" type="hidden" name="draftDeptId" value="" desc="申请人部门id" />
<input id="_draftCompanyCode" class="input" type="hidden" name="draftCompanyCode" desc="申请人公司代码" value="" />
           
<div class="main">
    <h1 class="main_title" id="bpdTitle"></h1>
<!--     <span class="main_title" id="bpdTitle" style="font-weight:blod;float:left"></span> -->
<!--     <span id="currActivityName" style="padding-top:20px;float:left"></span> -->
    <span class="number">单号：<span id="btNo"></span></span>
</div>
<div class="mk">
	<h2 class="mk_title mk_title_1">基本信息<img src="<%= path %>/skins/default/css/images/mk_title_imgz.jpg" width="15" height="15" /></h2>
		<table width="100%" border="0" cellpadding="0" cellspacing="0"  class="tb_2td">
			<tr>
				<td>
				    <span class="label">申请时间</span>
				    <span class="item">
				      <span class="readonly" id="span_createTime"></span>
				    </span>
				</td>
				<td>
				    <span class="label">申请人</span>
				    <span class="item"><span class="readonly" id="span_drafter"></span></span>
				</td>
			</tr>
			<tr>
				<td>
				    <span class="label">公司</span>
				    <span class="item"><span class="readonly" id="span_draftCompanyName"></span></span>
				</td>
				<td>
                    <span class="label">部门名称</span>
                    <span class="item"><span class="readonly" id="span_draftDept"></span></span>
                </td>
			</tr>
			<tr>
                <td>
                    <span class="label">手机号码</span>
                    <span class="item">
                        <input id="_draftMobile" class="input" type="text" name="draftMobile" maxlength="20" dataType="number" desc="手机号码"/>
                    </span>
                    <span class="item" style="display:none"><span class="readonly" id="span_draftMobile"></span></span>
                </td>
                <td>
                    <span class="label">分机号码</span>
                    <span class="item">
                        <input id="_draftExtNum" class="input" type="text" name="draftExtNum" maxlength="20" dataType="number" desc="分机号码"/>
                    </span>
                    <span class="item" style="display:none"><span class="readonly" id="span_draftExtNum"></span></span>
                </td>
            </tr>
		</table>
</div>
