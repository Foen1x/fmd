i18n_title_error="Error";
i18n_title_warning="Warning";

i18n_msg_opsucc="Operation successful！";
i18n_msg_readfail="Sorry，data reading failed, Please contact system administrators！";
i18n_msg_commitfail="Sorry，data submitting failed, Please contact system administrators！";
i18n_msg_configerror="Sorry，system configuration error, Please contact system administrators！";
i18n_msg_sessiontimeout="Sorry, your session is timeout, please login again!";

i18n_t_confirm="Please confirm";

i18n_ok="OK";
i18n_cancel="Cancel";

i18n_h_no="No.";
i18n_h_sel="Select";

//================dhtmlx related i18n

//canlendar, default is english
//dhtmlXCalendarObject.prototype.langData["en"] = ...;

//canlendar format, %Y - year, %m - month, %d - day of month
dhx_calendardateformat = 'm/%d/%Y';

//grid paging, default is english
//dhtmlXGridObject.prototype.i18n.paging = ...;

//字符类型操作符列表 英文
operatorlist_string = [
      	                ["equal","Equal"],
      	                //["greaterthan","Greater than"],
      	                //["lessthan","Less than"],
                       //["greaterequal","Greater equal"],
                       //["lessequal","Less equal"],
                       ["notequal","Not equal"],
                       ["contains","Contains"],
      	               ["notcontains","Not contains"]
      	              ];

//数字类型操作符列表
operatorlist_number = [
   	                ["equal","Equal"],
   	                ["greaterthan","Greater than"],
   	                ["lessthan","Less than"],
	                ["greaterequal","Greater equal"],
	                ["lessequal","Less equal"],
	                ["notequal","Not equal"]
   	                ];

//日期类型操作符列表
operatorlist_date = [
   	                ["equal","Equal"],
   	                ["greaterthan","Greater than"],
   	                ["lessthan","Less than"],
	                ["greaterequal","Greater equal"],
	                ["lessequal","Less equal"],
	                ["notequal","Not equal"]
   	                ];

//枚举类型（下拉列表）操作符列表
operatorlist_enumeration = [
   	                ["equal","Equal"],
	                ["notequal","Not equal"]
   	                ];

//多值 multivalue
operatorlist_multivalue = [["in","Has"],["notin","Not has"]];

//中英双语类型
operatorlist_bilingual = [["contains","Contains"],["notcontains","Not contains"]];

//window
i18n_customquery_title="Custom query";
i18n_customquery_add_condition="Add condition";
i18n_customquery_query="Query";
i18n_customquery_reset="Reset";
i18n_customquery_cancel="Cancel";

//layout titles
i18n_customquery_lo_title_conselect="Condition select";
i18n_customquery_lo_title_colselect="Result select";

//result column selection table headers
i18n_customquery_header_choose="Select";
i18n_customquery_header_column="Column";
i18n_customquery_header_displayname="Name";
i18n_customquery_header_no="No.";

//result column selection table tooltips
i18n_customquery_sb_dragdroporder="Drag a row to reorder";

//result column selection buttons
i18n_customquery_bt_all="Select all";
i18n_customquery_bt_none="Select none";
i18n_customquery_bt_reverse="Reverse selection";

//tips
i18n_customquery_condition_not_complete="Sorry，condition is not complete, or the input value is incorrect!";
i18n_customquery_condition_cannot_duplicated="Sorry, this condition can not be duplicated!";
i18n_customquery_condition_not_selectresult="Please select result columns!";
