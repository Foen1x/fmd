fmg = {};
fmg.cc=0;//create count

newstr = [
   		{ type:"input" , name:"name", label:i18n_fmg.hd_name, labelWidth:100, labelAlign:"right", inputWidth:260, required:true},
   		{ type:"input" , name:"desc", label:i18n_fmg.hd_desc, labelWidth:100, labelAlign:"right", inputWidth:260, rows:"4"},
   		{ type:"block" , name:"form_block_1", offsetLeft:"80", offsetTop:"90", list:[
   		{ type:"button" , name:"fbok", value:i18n_fmg.ok},
   		{ type:"newcolumn"   },
   		{ type:"button" , name:"fbcancel", value:i18n_fmg.cancel}
   		]  }
   	];

//init variables
function fmg_initVariables() {
	fmg.rest_queryf = ctxpath + '/rest/fmd/queryForm';
	fmg.rest_queryv = ctxpath + '/rest/fmd/queryVersion';
	fmg.rest_delf = ctxpath + '/rest/fmd/deleteForm';
	fmg.rest_delv = ctxpath + '/rest/fmd/deleteVersion';
	fmg.rest_tonewv = ctxpath + '/rest/fmd/toNewVersion';
	fmg.rest_tonewf = ctxpath + '/rest/fmd/toNewForm';
	fmg.rest_updv = ctxpath + '/rest/fmd/updateVersion';
}

//main layout
function fmg_initLayout() {
	
	window.onresize = function() {
		fmg.body_layout && fmg.body_layout.setSizes();
	};

	//forbid f5 and backspace
	$(document).bind('keydown', function(e){
		e = window.event || e;
		var target1 = e.srcElement || e.target;
		if ( !target1 || !(target1.type) || target1.type.toLowerCase().indexOf('text')==-1) {
			if (e.keyCode==116 || e.keyCode==8) {
				e.keyCode = 0;
				return false;
			}
		}
		return true;
	});

	//forbid right click
	document.oncontextmenu = function() {
		return false;
	};
	
	//layout
	fmg.body_layout = new dhtmlXLayoutObject('fmgmaindiv', '2U', dhx_skin);
	
	fmg.body_layout.progressOn();
	fmg.body_layout.cells('a').setText(i18n_fmg.form);
	fmg.body_layout.cells('b').setText(i18n_fmg.version);
	fmg.body_layout.setAutoSize("a;b", "a;b");
	fmg.body_layout.cells('a').setWidth(620);
	
	fmg_initFormtb();
	fmg_initVersiontb();
	fmg_initFormgrid();
	fmg_initVersiongrid();
	
	//set hover
	/*$('.gridbox').on('mouseenter mouseout', 'tr',
		function(event){
			console.log(event.type);
		    if (event.type=="mouseenter"){
		    	if ($(this).hasClass('.ev_'+dhx_skin)) {
		    		$(this).addClass("gridhover");
		    	} else if ($(this).hasClass('.odd_'+dhx_skin)) {
		    		$(this).addClass("gridhover");
		    	}
		    } else {
		    	$(this).removeClass("gridhover");
		    }
		});*/
	
	
	fmg.body_layout.progressOff();
}

//toolbar for form layout
function fmg_initFormtb() {
	fmg.formtb = fmg.body_layout.cells('a').attachToolbar();
	fmg.formtb.setIconsPath(fmg.imagepath);
	
	fmg.formtb.addButton('formtb_del',0,i18n_fmg.del,"delete1.gif","delete1_dis.gif");
	fmg.formtb.addButton('formtb_new',0,i18n_fmg.new1,"new1.gif","new1_dis.gif");
	fmg.formtb.addSeparator('formtb_sp1',0);
	fmg.formtb.addButton('formtb_refresh',0,i18n_fmg.refresh,"refresh.gif","refresh_dis.gif");
	
	fmg.formtb.attachEvent("onClick", function(tbid){
		if ("formtb_new"==tbid) {
			openWindowByUrl(fmg.cc++, ctxpath+"/fmddesign.action?formtype=PROCESS");
		} else if ("formtb_del"==tbid) {
			fmg_deleteForm();
		} else if ("formtb_refresh"==tbid) {
			fmg_toPagef(1, 10);
		}
	});
	
}

//toolbar for version layout
function fmg_initVersiontb() {
	fmg.vertb = fmg.body_layout.cells('b').attachToolbar();
	fmg.vertb.setIconsPath(fmg.imagepath);
	
	//add buttons
	fmg.vertb.addButton('vertb_pushtoserver',0,i18n_fmg.pushtoserver,"pushtoserver.png","pushtoserver_dis.png");
	fmg.vertb.addSeparator('vertb_sp0',0);
	fmg.vertb.addButton('vertb_delete',0,i18n_fmg.del,"delete1.gif","delete1_dis.gif");
	fmg.vertb.addSeparator('vertb_sp1',0);
	fmg.vertb.addButton('vertb_toform',0,i18n_fmg.toform,"saveas.png","saveas_dis.png");
	fmg.vertb.addButton('vertb_toversion',0,i18n_fmg.toversion,"saveas1.png","saveas1_dis.png");
	fmg.vertb.addButton('vertb_checkin',0,i18n_fmg.checkin,"checkin.png","checkin_dis.png");
	fmg.vertb.addButton('vertb_checkout',0,i18n_fmg.checkout,"checkout.png","checkout_dis.png");
	fmg.vertb.addSeparator('vertb_sp2',0);
	fmg.vertb.addButton('vertb_refresh',0,i18n_fmg.refresh,"refresh.gif","refresh_dis.gif");
	
	fmg.vertb.disableItem('vertb_checkin');
	fmg.vertb.disableItem('vertb_checkout');
	fmg.vertb.disableItem('vertb_delete');
	
	fmg.vertb.attachEvent("onClick", function(tbid){
		if ("vertb_toversion"==tbid) {
			fmg_toNewVersion();
		} else if ("vertb_toform"==tbid) {
			fmg_toNewForm();
		} else if ("vertb_delete"==tbid) {
			fmg_deleteVersion();
		} else if ("vertb_refresh"==tbid) {
			var srow = fmg.formgrid.getSelectedRowId();
			if (srow==null) {
				dhtmlx.message(i18n_fmg.msg_plsselect + " " +i18n_fmg.form);
				return;
			}
			fmg_toPagev(1, 10);
		} else if ("vertb_checkout"==tbid) {
			fmg_checkOutVersion();
		} else if ("vertb_checkin"==tbid) {
			fmg_checkInVersion();
		}
	});
}

//grid for form layout
function fmg_initFormgrid() {
	fmg.stb = fmg.body_layout.cells('a').attachStatusBar();
	fmg.stb.setText("<div id='id_paging_stb1'></div>");
	
	fmg.formgrid = fmg.body_layout.cells('a').attachGrid();
	fmg.formgrid.setIconsPath(fmg.imagepath);
	fmg.formgrid.setHeader([i18n_fmg.hd_no,"FORMID",i18n_fmg.hd_type,i18n_fmg.hd_name,i18n_fmg.hd_desc,i18n_fmg.hd_creator,i18n_fmg.hd_creatorname,i18n_fmg.hd_op],null,["text-align:center;","text-align:center;","text-align:center","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;"]);
	fmg.formgrid.attachHeader("#rspan,&nbsp;,#rspan,<input id='sr_formname' type='text' style='width:90%'/>,<input id='sr_formdesc' type='text' style='width:90%'/>,#rspan,#rspan,#rspan");
	fmg.formgrid.setInitWidths("40,200,80,150,250,60,80,100");
	fmg.formgrid.setColumnIds("ROW_NO,FORMID,FORMTYPE,FORMNAME,FORMDESC,CREATOR,CREATORNAME,OP");
	fmg.formgrid.setColTypes("ro,ro,pairro,ro,ro,ro,ro,ro");
	fmg.formgrid.setColSorting("na,str,str,str,str,str,str,str");
	fmg.formgrid.setColumnsVisibility("false,true,false,false,false,true,false,true");
	fmg.formgrid.setColAlign("center,left,center,left,left,left,center,left");
	fmg.formgrid.setEditable(false);
	fmg.formgrid.setLang(fmg.lang);
	//default ordering
	//fmg.formgrid.grid_setOrderColumns([{"V_T_CREATE_TIME":"DESC"}]);
	
	//paging
	fmg.formgrid.setPagingWTMode(true,true,true,[10,20,50,100]);
	fmg.formgrid.enablePaging(true,10,5,'id_paging_stb1');
	fmg.formgrid.setPagingSkin("toolbar", dhx_skin);
	
	fmg.formgrid.init();
	
	fmg.formgrid.attachEvent("onPageChanged", function(ind,fInd,lInd){
		fmg_toPagef(fInd+1, lInd);
	});
	
	fmg.formgrid.attachEvent("onSelectStateChanged", function(rId){
		fmg_toPagev(1, 10);
	});
	
	//header click event
	fmg.formgrid.attachEvent("onHeaderClick", grid_onHeaderClick);
	
	//bind searcher event
	//disable onclick order by function for this header
	var tdsr_formname = $("#sr_formname").parents('td:first');
	var tdsr_formdesc = $("#sr_formdesc").parents('td:first');
	var tdsr_formdescnext = $("#sr_formdesc").parents('td:first').next();
	tdsr_formname.bind('click',fmg_stopEvent);
	tdsr_formdesc.bind('click',fmg_stopEvent);
	tdsr_formdescnext.bind('click',fmg_stopEvent);
	tdsr_formname.bind('mouseover',fmg_stopEvent);
	tdsr_formdesc.bind('mouseover',fmg_stopEvent);
	tdsr_formdescnext.bind('mouseover',fmg_stopEvent);
	$("#sr_formname").bind('keypress', fmg_enterQueryf);
	$("#sr_formdesc").bind('keypress', fmg_enterQueryf);
}

//grid for version layout
function fmg_initVersiongrid() {
	fmg.stb = fmg.body_layout.cells('b').attachStatusBar();
	fmg.stb.setText("<div id='id_paging_stb2'></div>");
	
	fmg.vergrid = fmg.body_layout.cells('b').attachGrid();
	fmg.vergrid.setIconsPath(fmg.imagepath);
	fmg.vergrid.setHeader([i18n_fmg.hd_no,"VERSIONID",i18n_fmg.hd_name,i18n_fmg.hd_desc,i18n_fmg.hd_updatetime,i18n_fmg.hd_changeuserid,i18n_fmg.hd_changeusername,i18n_fmg.hd_checkoutby,i18n_fmg.hd_checkoutbyname,i18n_fmg.hd_creator,i18n_fmg.hd_creatorname,i18n_fmg.hd_status,i18n_fmg.hd_op],
			null,
			["text-align:center;","text-align:left;","text-align:left","text-align:left","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;"]);
	fmg.vergrid.attachHeader("#rspan,#rspan,<input id='sr_versionname' type='text' style='width:90%'/>,<input id='sr_versiondesc' type='text' style='width:90%'/>,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
	fmg.vergrid.setInitWidths("40,100,150,250,120,80,80,80,80,80,80,80,100");
	fmg.vergrid.setColumnIds("ROW_NO,VERSIONID,VERSIONNAME,VERSIONDESC,UPDATETIME,CHANGEUSERID,CHANGEUSERNAME,CHECKOUTBY,CHECKOUTBYNAME,CREATOR,CREATORNAME,STATUS,OP");
	fmg.vergrid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,pairro,ro");
	fmg.vergrid.setColSorting("na,str,str,str,str,str,str,str,str,str,str,str,str");
	fmg.vergrid.setColumnsVisibility("false,true,false,false,false,true,false,true,false,true,false,false,true");
	fmg.vergrid.setColAlign("center,left,left,left,center,center,center,center,center,center,center,center,center");
	fmg.vergrid.setEditable(false);
	fmg.vergrid.setLang(fmg.lang);
	fmg.vergrid.init();
	
	//default order by
	fmg.formgrid._grid_ordercolumns = [{"CREATETIME":"DESC"}];
	
	//paging
	fmg.vergrid.setPagingWTMode(true,true,true,[10,20,50,100]);
	fmg.vergrid.enablePaging(true,10,5,'id_paging_stb2');
	fmg.vergrid.setPagingSkin("toolbar", dhx_skin);
	
	fmg.vergrid.attachEvent("onPageChanged", function(ind,fInd,lInd){
		fmg_toPagev(fInd+1, lInd);
	});
	
	//header click event
	fmg.vergrid.attachEvent("onHeaderClick", grid_onHeaderClick);
	
	fmg.vergrid.attachEvent("onRowDblClicked", function(rId, cInd){
		var formid = fmg.formgrid.cells(fmg.formgrid.getSelectedRowId(), fmg.formgrid.getColIndexById("FORMID")).getValue();
		var versionid = this.cells(rId, fmg.vergrid.getColIndexById("VERSIONID")).getValue();
		openWindowByUrl(fmg.cc++, ctxpath+"/fmddesign.action?formid="+formid+"&versionid="+versionid);
	});
	
	fmg.vergrid.attachEvent("onSelectStateChanged", function(rId){
		var checkoutby = fmg.vergrid.cells(rId, fmg.vergrid.getColIndexById("CHECKOUTBY")).getValue();
		if (!checkoutby) {
			fmg.vertb.disableItem('vertb_checkin');
			fmg.vertb.enableItem('vertb_checkout');
			fmg.vertb.disableItem('vertb_delete');
		} else if (fmg.loginName==checkoutby) {
			fmg.vertb.enableItem('vertb_checkin');
			fmg.vertb.disableItem('vertb_checkout');
			this.cells(rId, fmg.vergrid.getColIndexById("VERSIONID")).getValue()!='0' && fmg.vertb.enableItem('vertb_delete');
		} else {
			fmg.vertb.disableItem('vertb_checkin');
			fmg.vertb.disableItem('vertb_checkout');
			fmg.vertb.disableItem('vertb_delete');
		}
	});
	
	//bind searcher event
	//disable onclick order by function for this header
	var trsr_versionname = $("#sr_versionname").parents('tr:first');
	trsr_versionname.find('td').bind('click',fmg_stopEvent);
	trsr_versionname.find('td').bind('mouseover',fmg_stopEvent);
	$("#sr_versionname").bind('keypress', fmg_enterQueryv);
	$("#sr_versiondesc").bind('keypress', fmg_enterQueryv);
}

//query form
function fmg_toPagef(fromRow, toRow){
	fmg.body_layout.cells('a').progressOn();
	var p = {"form":{}, "fromRow":fromRow, "toRow":toRow, "timezoneOffset":new Date().getTimezoneOffset(),
			"ordercolumns":JSON.stringify(fmg.formgrid._grid_ordercolumns)};
	if (fmg.fquery_formname) {
		p.form.formname = fmg.fquery_formname;
	}
	if (fmg.fquery_formdesc) {
		p.form.formdesc = fmg.fquery_formdesc;
	}
	p.form = JSON.stringify(p.form);
	var ret = doPostSyncJson(fmg.rest_queryf, p);
	if (!ret) {
		fmg.body_layout.cells('a').progressOff();
		msgErr(i18n_fmg.msg_readfail);
		return;
	}
	fmg.formgrid.clearAllInPaging();
	var tidx = fmg.formgrid.getColIndexById("FORMTYPE");
	var obj1 = {};
	obj1[tidx] = i18n_fmg.process_type;
	grid_setI18nInfoToGridJson(ret, obj1, 0);
	fmg.formgrid.parse(ret, "json");
	fmg.vergrid.clearAllInPaging();
	fmg.body_layout.cells('a').progressOff();
}

//call query form
function fmg_enterQueryf(e) {
	if (e.keyCode==13) {
		fmg.fquery_formname = $.trim($("#sr_formname").val());
		fmg.fquery_formdesc = $.trim($("#sr_formdesc").val());
		fmg_toPagef(1, 10);
	}
}

//query version
function fmg_toPagev(fromRow, toRow){
	fmg.body_layout.cells('b').progressOn();
	var p = {"args":{}, "fromRow":fromRow, "toRow":toRow, "timezoneOffset":new Date().getTimezoneOffset(),
			"ordercolumns":JSON.stringify(fmg.vergrid._grid_ordercolumns)};
	p.args.formid = fmg.formgrid.cells(fmg.formgrid.getSelectedRowId(), fmg.formgrid.getColIndexById("FORMID")).getValue();
	if (fmg.vquery_versionname) {
		p.args.versionname = fmg.vquery_versionname;
	}
	if (fmg.vquery_versiondesc) {
		p.args.versiondesc = fmg.vquery_versiondesc;
	}
	p.args = JSON.stringify(p.args);
	var ret = doPostSyncJson(fmg.rest_queryv, p);
	if (!ret) {
		fmg.body_layout.cells('b').progressOff();
		msgErr(i18n_fmg.msg_readfail);
		return;
	}
	fmg.vergrid.clearAllInPaging();
	var idx1 = fmg.vergrid.getColIndexById("STATUS");
	var obj1 = {};
	obj1[idx1] = i18n_fmg.version_status;
	grid_setI18nInfoToGridJson(ret, obj1, 0);
	fmg.vergrid.parse(ret, "json");
	//change current version display
	var sr = fmg.vergrid.findCell("0",fmg.vergrid.getColIndexById("VERSIONID"),true);
	//alert(JSON.stringify(sr));
	if (sr && sr.length && sr[0].length) {
		fmg.vergrid.setRowTextStyle(sr[0][0], "color:blue;font-weight:bold;");
		fmg.vergrid.cells(sr[0][0], fmg.vergrid.getColIndexById("VERSIONNAME")).setValue(i18n_fmg.current);
	}
	fmg.vertb.disableItem('vertb_checkin');
	fmg.vertb.disableItem('vertb_checkout');
	fmg.vertb.disableItem('vertb_delete');
	fmg.body_layout.cells('b').progressOff();
}

//call query version
function fmg_enterQueryv(e) {
	if (e.keyCode==13) {
		fmg.vquery_versionname = $.trim($("#sr_versionname").val());
		fmg.vquery_versiondesc = $.trim($("#sr_versiondesc").val());
		fmg_toPagev(1, 10);
	}
}

//stop event propagation
function fmg_stopEvent(e){
	if (e && e.stopPropagation!=undefined) {
		e.stopPropagation();
	} else if (window.event){
		window.event.cancelBubble = true;
	}
	return false;
}

//delete form
function fmg_deleteForm() {
	var srow = fmg.formgrid.getSelectedRowId();
	if (srow==null) {
		dhtmlx.message(i18n_fmg.msg_plsselect + " " +i18n_fmg.form);
		return;
	}
	dhtmlx.confirm({
		title: "",
        type:"confirm-warning",
		text: i18n_fmg.msg_delconfirm,
		ok : i18n_fmg.ok,
		cancel : i18n_fmg.cancel,
		callback: function(y) {
			if (y) {
				fmg.body_layout.cells('a').progressOn();
				var formid = fmg.formgrid.cells(srow, fmg.formgrid.getColIndexById("FORMID")).getValue();
				var ret = doPostSyncJson(fmg.rest_delf, {"formid":formid});
				if (ret && ret.result==-1) {
					msg(i18n_fmg.msg_forminuse);
				} else if (ret && ret.result==1) {
					msg(i18n_fmg.msg_succ);
					fmg.formgrid.refreshPaging();
				} else {
					msgErr(i18n_fmg.msg_commitfail);
				}
				fmg.body_layout.cells('a').progressOff();
			}
		}
	});
}

//delete version
function fmg_deleteVersion() {
	var v = fmg_versionSelected();
	if (!v) return;
	var versionid = v.versionid;
	if (versionid=='0') {
		dhtmlx.message(i18n_fmg.msg_cannotdelcur);
		return;
	}
	dhtmlx.confirm({
		title: "",
        type:"confirm-warning",
		text: i18n_fmg.msg_delconfirm,
		ok : i18n_fmg.ok,
		cancel : i18n_fmg.cancel,
		callback: function(y) {
			if (y) {
				fmg.body_layout.cells('b').progressOn();
				var formid = v.formid;
				var ret = doPostSyncJson(fmg.rest_delv, {"formid":formid, "versionid":versionid});
				if (ret && ret.result==-1) {
					msg(i18n_fmg.msg_forminuse);
				} else if (ret && ret.result==1) {
					msg(i18n_fmg.msg_succ);
					fmg.vergrid.refreshPaging();
				} else {
					msgErr(i18n_fmg.msg_commitfail);
				}
				fmg.body_layout.cells('b').progressOff();
			}
		}
	});
}

//check-in version
function fmg_checkInVersion() {
	var v = fmg_versionSelected();
	if (!v) return;
	fmg.body_layout.cells('b').progressOn();
	var version = {"formid":v.formid, "versionid":v.versionid, "checkoutby":"", "checkoutbyname":""};
	var ret = doPostSyncJson(fmg.rest_updv, {"version":JSON.stringify(version)});
	if (ret && ret.result==1) {
		msg(i18n_fmg.msg_succ);
		fmg.vergrid.refreshPaging();
		fmg.vergrid.selectRowById(v.vrid);
	} else {
		msgErr(i18n_fmg.msg_commitfail);
	}
	fmg.body_layout.cells('b').progressOff();
}

//check-out version
function fmg_checkOutVersion() {
	var v = fmg_versionSelected();
	if (!v) return;
	fmg.body_layout.cells('b').progressOn();
	var version = {"formid":v.formid, "versionid":v.versionid, "checkoutby":fmg.loginName, "checkoutbyname":fmg.displayName};
	var ret = doPostSyncJson(fmg.rest_updv, {"version":JSON.stringify(version)});
	if (ret && ret.result==1) {
		msg(i18n_fmg.msg_succ);
		fmg.vergrid.refreshPaging();
		fmg.vergrid.selectRowById(v.vrid);
	} else {
		msgErr(i18n_fmg.msg_commitfail);
	}
	fmg.body_layout.cells('b').progressOff();
}

//save to new form
function fmg_toNewForm() {
	var v = fmg_versionSelected();
	if (!v) return;
	//input new name and desc
	var win1 = fm_createCenterWindow('win_id_newf', i18n_fmg.new1 + i18n_fmg.form, 400, 200, 'new1.gif');
	var form1 = win1.attachForm(newstr);
	var namei = form1.getInput('name');
	namei.maxLength = 20;
	form1.getInput('desc').maxLength = 100;
	form1.setItemValue('desc', i18n_fmg.copyof+'['+
			fmg.formgrid.cells(v.frid, fmg.formgrid.getColIndexById("FORMNAME")).getValue() + '][' +
			fmg.vergrid.cells(v.vrid, fmg.vergrid.getColIndexById("VERSIONNAME")).getValue()+'].\n');
	$(namei).focus();
	form1.attachEvent('onButtonClick', function(btid){
		if (btid=='fbok') {
			if (!form1.validate()) {
				return;
			}
			var name = form1.getItemValue('name');
			var desc = form1.getItemValue('desc');
			//create
			win1.close();
			fmg.body_layout.cells('b').progressOn();
			var ret = doPostSyncJson(fmg.rest_tonewf, {"formid":v.formid, "versionid":v.versionid, "name":name, "desc":desc});
			if (!ret || !ret.result) {
				msgErr(i18n_fmg.msg_commitfail);
			} else {
				msg(i18n_fmg.msg_succ);
				fmg_toPagef(1, 10);
			}
			fmg.body_layout.cells('b').progressOff();
		} else if (btid='fbcancel') {
			win1.close();
		}
	});
}

//save to new version
function fmg_toNewVersion() {
	var v = fmg_versionSelected();
	if (!v) return;
	//input new name and desc
	var win1 = fm_createCenterWindow('win_id_newf', i18n_fmg.new1 + i18n_fmg.version, 400, 200, 'new1.gif');
	var form1 = win1.attachForm(newstr);
	var namei = form1.getInput('name');
	namei.maxLength = 20;
	form1.getInput('desc').maxLength = 100;
	form1.setItemValue('desc', i18n_fmg.copyof+'['+fmg.vergrid.cells(v.vrid, fmg.vergrid.getColIndexById("VERSIONNAME")).getValue()+'].\n');
	$(namei).focus();
	form1.attachEvent('onButtonClick', function(btid){
		if (btid=='fbok') {
			if (!form1.validate()) {
				return;
			}
			var name = form1.getItemValue('name');
			var desc = form1.getItemValue('desc');
			//TODO check length
			//create
			win1.close();
			fmg.body_layout.cells('b').progressOn();
			var ret = doPostSyncJson(fmg.rest_tonewv, {"formid":v.formid, "versionid":v.versionid, "name":name, "desc":desc});
			if (!ret || !ret.result) {
				msgErr(i18n_fmg.msg_commitfail);
			} else {
				msg(i18n_fmg.msg_succ);
				fmg_toPagev(1, 10);
			}
			fmg.body_layout.cells('b').progressOff();
		} else if (btid='fbcancel') {
			win1.close();
		}
	});
}

//check if a version is selected
function fmg_versionSelected() {
	var srowf = fmg.formgrid.getSelectedRowId();
	if (srowf==null) {
		dhtmlx.message(i18n_fmg.msg_plsselect + " " +i18n_fmg.form);
		return null;
	}
	var srowv = fmg.vergrid.getSelectedRowId();
	if (srowv==null) {
		dhtmlx.message(i18n_fmg.msg_plsselect + " " +i18n_fmg.version);
		return null;
	}
	var formid = fmg.formgrid.cells(srowf, fmg.formgrid.getColIndexById("FORMID")).getValue();
	var versionid = fmg.vergrid.cells(srowv, fmg.vergrid.getColIndexById("VERSIONID")).getValue();
	return {"formid":formid, "versionid":versionid, "frid":srowf, "vrid":srowv};
}

