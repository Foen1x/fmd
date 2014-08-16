i18n_title_error="错误";
i18n_title_warning="警告";

i18n_msg_opsucc="操作已成功！";
i18n_msg_readfail="对不起，读取数据失败，请与系统管理员联系！";
i18n_msg_commitfail="对不起，提交数据失败，请与系统管理员联系！";
i18n_msg_configerror="对不起，系统配置错误，请与系统管理员联系！";
i18n_msg_sessiontimeout="对不起，您的会话已过期，请重新登录！";

i18n_t_confirm="请您确认";

i18n_ok="确定";
i18n_cancel="取消";

i18n_h_no="序号";
i18n_h_sel="选择";

//================dhtmlx related i18n

//canlendar, default is english
/*dhtmlXCalendarObject.prototype.langData["zh"] = {
			dateformat : "%Y-%m-%d",
			monthesFNames : "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月".split(","),
			monthesSNames : "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月".split(","),
			daysFNames : "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(","),
			daysSNames : "日,一,二,三,四,五,六".split(","),
			weekstart : 1
};*/

//canlendar format, %Y - year, %m - month, %d - day of month
dhx_calendardateformat = '%Y-%m-%d';

//grid paging, default is english
/*dhtmlXGridObject.prototype.i18n.paging = {
		results : "结果集",
		records : "记录从 ",
		to : " 到 ",
		page : "页 ",
		perpage : "行/每页",
		first : "首页",
		previous : "上一页",
		found : "找到记录数",
		next : "下一页",
		last : "尾页",
		of : " . ",
		notfound : "未找到记录",
		total : "总"
};*/

//字符串类型操作符列表
operatorlist_string = [
	                ["equal","等于"],
	                //["greaterthan","大于"],
	                //["lessthan","小于"],
                    //["greaterequal","大于等于"],
                    //["lessequal","小于等于"],
                    ["notequal","不等于"],
                    ["contains","包含"],
                    ["notcontains","不包含"]
	                ];
//数字类型操作符列表
operatorlist_number = [
   	                ["equal","等于"],
   	                ["greaterthan","大于"],
   	                ["lessthan","小于"],
	                ["greaterequal","大于等于"],
	                ["lessequal","小于等于"],
	                ["notequal","不等于"]
   	                ];

//日期类型操作符列表
operatorlist_date = [
   	                ["equal","等于"],
   	                ["greaterthan","大于"],
   	                ["lessthan","小于"],
	                ["greaterequal","大于等于"],
	                ["lessequal","小于等于"],
	                ["notequal","不等于"]
   	                ];

//枚举类型（下拉列表）操作符列表
operatorlist_enumeration = [
   	                ["equal","等于"],
	                ["notequal","不等于"]
   	                ];

//多值 multivalue
operatorlist_multivalue = [["in","包括"],["notin","不包括"]];

//中英双语类型
operatorlist_bilingual = [["contains","包含"],["notcontains","不包含"]];

//window and button
i18n_customquery_title="自定义查询";
i18n_customquery_add_condition="添加条件";
i18n_customquery_query="查询";
i18n_customquery_reset="重置";
i18n_customquery_cancel="取消";

//layout titles
i18n_customquery_lo_title_conselect="查询条件选择";
i18n_customquery_lo_title_colselect="结果列选择";

//result column selection table headers
i18n_customquery_header_choose="选择";
i18n_customquery_header_column="列名";
i18n_customquery_header_displayname="名称";
i18n_customquery_header_no="序号";

//result column selection table tooltips
i18n_customquery_sb_dragdroporder="拖动行可以排序";

//result column selection buttons
i18n_customquery_bt_all="全选";
i18n_customquery_bt_none="全不选";
i18n_customquery_bt_reverse="反选";

//提示信息
i18n_customquery_condition_not_complete="对不起，条件不完整或输入的值不正确！";
i18n_customquery_condition_cannot_duplicated="对不起，该条件不允许重复！";
i18n_customquery_condition_not_selectresult="请选择结果列";
