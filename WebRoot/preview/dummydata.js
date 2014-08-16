piidTag = "tsId";

function pv_initData() {
	datactx = {};
	datactx.b={};	//business data
	datactx.p={};	//process data
	datactx.m={};	//meta data such as dictionary

	datactx.b.tsMainTable= {piidTag:"id1",
			"col1":"测试数据1",
			"col2":"测试数据2",
			"col3":"测试数据3",
			"col4":"测试数据4",
			"col5":"测试数据5",
			"col6":"123",
			"col7":"NotEmpty",
			"col8":"999.00",
			"col9":"测试数据9",
			"col10":"测试数据10",
			"col11":"测试数据11",
			"col12":"a",
			"col13":"测试数据13",
			"col14":"测试数据14",
			"col15":"测试数据15",
			"col16":"测试数据16",
			"col17":"测试数据17",
			"col18":"测试数据18",
			"col19":"测试数据19",
			"col20":"中国银行",
			"col21":"1",
			"col22":"测试数据22",
			"col23":"测试数据23",
			"col24":"测试数据24",
			"col25":"测试数据25",
			"col26":"测试数据26",
			"col27":"测试数据27",
			"col28":"测试数据28"
			};
	/*datactx.b.tsDetailTable= [{piidTag:"id1","itemno":"1","col1a":"测试数据1aaa","col2a":"测试数据1bbb"},
	                     {piidTag:"id1","itemno":"2","col1b":"测试数据1aaa","col2b":"测试数据1bbb"},
	                     {piidTag:"id1","itemno":"3","col1c":"测试数据1aaa","col2c":"测试数据1bbb"}];*/

	datactx.p.inst={piidTag:"id1",
			"userId":"admin",
			"userName":"超级管理员",
			"companyCode":"CC01",
			"btNo":"BXSQ2014001",
			"companyName":"股份公司01",
			"deptId":"000012"};

	datactx.p.activity={"activityId":"id1111","activityName":"部门经理审批"};

	datactx.p.task={"taskId":"task-1212","userId":"admin","userName":"超级管理员"};
	
	datactx.m.enu= {};
	/*datactx.m.enu.BANKINFO = [["",""],
	      					["NotEmpty", "中国银行"],
	    					["ValidAplhaNumeric", "华夏银行"],
	    					["ValidCurrency", "北京银行13"],
	    					["ValidDate", "北京银行12"],
	    					["ValidDatetime", "北京银行11"],
	    					["ValidEmail", "北京银行10"],
	    					["ValidInteger", "北京银行9"],
	    					["ValidIPv4", "北京银行8"],
	    					["ValidNumeric", "北京银行7"],
	    					["ValidTime", "北京银行6"],
	    					["ValidInteger", "北京银行5"],
	    					["ValidIPv4", "北京银行4"],
	    					["ValidNumeric", "北京银行3"],
	    					["ValidTime", "北京银行2"],
	    					["RegExp", "北京银行1"]
	    	                      ];*/
	
	datactx.m.enu.BANKINFO =[{"key":"","value":""},
	             			{"key":"NotEmpty","value":"中国银行","selected":true},
	             			{"key":"ValidAplhaNumeric","value":"华夏银行"},
	             			{"key":"ValidCurrency","value":"北京银行13"},
	             			{"key":"ValidDate","value":"北京银行12"},
	             			{"key":"ValidDatetime","value":"北京银行11"},
	             			{"key":"ValidEmail","value":"北京银行10"},
	             			{"key":"ValidInteger","value":"北京银行9"},
	             			{"key":"ValidIPv4","value":"北京银行8"},
	             			{"key":"ValidNumeric","value":"北京银行7"},
	             			{"key":"ValidTime","value":"北京银行6"},
	             			{"key":"ValidInteger","value":"北京银行5"},
	             			{"key":"ValidIPv4","value":"北京银行4"},
	             			{"key":"ValidNumeric","value":"北京银行3"},
	             			{"key":"ValidTime","value": "北京银行2"},
	             			{"key":"RegExp","value":"北京银行1"}
	                            ];
	
	datactx.m.enu.TRAVELTYPE =[{"key":"a","value":"异地"},
	             			{"key":"b","value":"本地"},
	             			{"key":"c","value":"异地当天"}
	                            ];
}

