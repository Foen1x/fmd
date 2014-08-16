

var BpmAjaxService = function() {
	
	/**
	 * 激活流程
	 */
	this.resumeInst = function(piid) {
		if( isNull(piid) ) {
			return;
		}
		var url = path + "/rest/bpmajax/inst/resume?piid="+piid;
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        dataType: "JSON",
	        success: function(ret){
	            result = ret.data;
	        },
	        error: function() {
//	        	dhtmlx.message({ type:"error", expire: -1, text:"获取人员信息失败" });
	        }
	    });
		if( isNull(result) ) {
			return false;
		} else {
			return true;
		}
	};
	
	/**
	 * 获取用户基本信息
	 */
	this.getUserInfo = function(userId) {
		var url = path + "/rest/hr/queryUserInfo/"+userId;
		var result = null;
		$.ajax({
	        type: "POST",
	        url: url,
	        cache: false,
	        async: false,
	        dataType: "JSON",
	        success: function(ret){
	            result = ret;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"获取人员信息失败: "+userId });
	        }
	    });
		return result;
	};
	
	/**
	 * 根据用户employeeNumber获取用户基本信息
	 */
	this.getUserInfoByEno = function(eno) {
		var url = path + "/rest/hr/queryByParams";
		var result = null;
		$.ajax({
	        type: "POST",
	        url: url,
	        data : {"data":"[{\"employeenumber\":\""+eno+"\"}]"},
	        cache: false,
	        async: false,
	        dataType: "JSON",
	        success: function(ret){
	        	if (!ret.data || ret.data.length==0) {
	        		dhtmlx.message({ type:"error", expire: -1, text:"获取人员信息失败: "+eno });
	        		return;
	        	}
	            result = {"loginName":ret.data[0].ntaccount, "displayName":ret.data[0].displayname, "employeeNumber":ret.data[0].employeenumber};
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"获取人员信息失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 获取公司列表
	 */
	this.getCompanyList = function() {
		var serviceName = "AJAX_CompanyInfo";
		var params = new Object();
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取公司信息失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 获取科技订单
	 * @companyCode 公司ID
	 * @internalOrderCode 科技订单号
	 * @op 类型 必输字段0代表根据科技订单号校验成本中心；1代表根据成本中心查询科技订单号及其成本中心负责人等信息
	 */
	this.getTechnologyOrderList = function(companyCode,internalOrderCode,op) {
		var serviceName = "AJAX_InnerOrder";
		var params = new Object();
		params.companyCode = companyCode;
		params.internalOrderCode =internalOrderCode;
		params.op=op;
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取科技订单信息失败" });
	        }
	    });
		return result;
	};
	
	/**
	 *获取科技订单科技订单 
	 * @companyCode 公司ID
	 * @internalOrderCode 科技订单号全输入
	 */
	this.getTechnologyOrder = function(companyCode,internalOrderCode,internalOrderName) {
		var serviceName = "AJAX_InnerOrder";
		var params = new Object();
		params.companyCode = companyCode;
		params.internalOrderCode =internalOrderCode;
		params.internalOrderName= internalOrderName;
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	           result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取科技订单信息失败" });
	        }
	    });
		return result;
	};
	
	this.getCostCenterList = function(companyCode,costCenterCode,costCenterName) {
		var serviceName = "AJAX_CostCenterInfo";
		var params = new Object();
		params.companyCode = companyCode;
		params.costCenterCode=costCenterCode;
		params.costCenterName=costCenterName;
		
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取成本中心失败" });
	        }
	    });
		return result;
		
	};
	this.getCostCenterByUid = function(userEmpNo) {
		var serviceName = "AJAX_CostCenterInfo_byPerson";
		var params = new Object();
		debug.log("userEmpNo="+userEmpNo);
		if (isNaN(userEmpNo)) {
			dhtmlx.message({ type:"error", expire: -1, text:"无法获取您的员工号" });
			return null;
		}
		params.personCode = userEmpNo;
		
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取成本中心失败" });
	        }
	    });
		return result;
		
	};
	/**
	 * 获取工程项目信息接口
	 */
	this.getContractInfo =  function (conCode,conName){
		var serviceName = "AJAX_ContractInfo";
		var params = new Object();
		params.contractCode = conCode;
		params.contractName = conName;
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取工程项目信息失败" });
	        }
	    });
		return result;
		
	}
	this.getBankCard = function(empNum) {
		var serviceName = "AJAX_CostBankCardInfo_retrieve";
		var params = new Object();
		params.employeeNumber = empNum;
		
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取员工编号失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 借款明细公共接口
	 * @debtPerson  员工号
	 * @companyCode 公司代码
	 */
	this.getLoanInformation = function(debtPerson,companyCode) {
		var serviceName = "AJAX_EmployeeLoanInfo";
		var params = new Object();
		//"P00076" "CC01"
		params.debtPerson = debtPerson;
		params.companyCode = companyCode;
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取欠款信息失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 银行卡接口（获取）
	 * @employeeNumber  员工工号
	 */
	this.getCostBankCardR = function(employeeNumber) {
		//alert("getCostBankCardR employeeNumber="+employeeNumber);
		var serviceName = "AJAX_CostBankCardInfo_retrieve";
		var params = new Object();
		params.employeeNumber = employeeNumber;
		//params.employeeNumber = employeeNumber;
//		alert(JSON.stringify(params));
		var url = path + "/rest/bpmajax/retrieveBankCard/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		//alert(url);
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	        	//alert(JSON.stringify(ret));
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"从SAP获取银行卡信息失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 银行卡接口（更新）
	 * @employeeNumber  员工工号
	 * @applyBankNo   报销卡号
	 * @bankCountryCode   银行国家代码
	 * @bankCode   银行代码
	 */
	this.getCostBankCardU = function(employeeNumber,applyBankNo,bankCountryCode,bankCode,beginDate) {
		var serviceName = "AJAX_CostBankCardInfo_update";
		var params = new Object();
		params.employeeNumber = employeeNumber;
		params.applyBankNo = applyBankNo;
		params.beginDate = beginDate;
		params.bankCountryCode = bankCountryCode;
		params.bankCode = bankCode;
//		alert(JSON.stringify(params));
//		params.beginDate = beginDate;
		var url = path + "/rest/bpmajax/saveBankCard/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(params));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"请求SAP失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 稽核会计制证接口
	 * credentialInformation
	 */
	this.LoanRefundMakeDOC = function(credentialInformation) {
		var serviceName = "AJAX_LoanRefundMakeDOC";
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(credentialInformation));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"请求SAP失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 出纳制证接口
	 * credentialInformation
	 */
	this.CashDocInfo = function(credentialInformation) {
		var serviceName = "AJAX_CashDocInfo";
		var url = path + "/rest/bpmajax/" + serviceName + "?params=" + encodeURIComponent(JSON.stringify(credentialInformation));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret.data.data;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"请求SAP失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 获取交通工具信息
	 * 
	 */
	this.getTransportAll = function(){
		var url = path + "/rest/transport/queryAll";
		var result = null;
		$.ajax({
	        type: "POST",
	        url: url,
	        data: {data:"[{}]"},
	        dataType: "json",
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret;
	        },
	        error: function() {
	        	dhtmlx.message({ type:"error", expire: -1, text:"获取交通工具信息失败" });
	        }
	    });
		return result;
	};
	
	/**
	 * 发送邮件
	 * @param _type	邮件类型
	 * @param _subject	邮件主题
	 * @param _body	邮件内容
	 * @param _toUserId	收件人
	 */
	this.sendMail = function(_type,_subject,_body,_toUserId,_copyTo){
		var params = new Object();
		params.type = _type;
		params.subject = _subject;
		params.body = _body;
		params.toUserId = _toUserId;
		params.ccUserIds = (typeof _copyTo != undefined) ? _copyTo || "" : "";
		var url = path + "/rest/bpmajax/sendMail?params=" + encodeURIComponent(JSON.stringify(params));
		var result = null;
		$.ajax({
	        type: "GET",
	        url: url,
	        cache: false,
	        async: false,
	        success: function(ret){
	            result = ret;
	        }
	    });
		return result == "success";
	};
};

function callBpmAjaxService() {
	
}