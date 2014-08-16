bom = {};
bom.cc=0;//create count

//new form json
newstr = [
     		{ type:"input" , name:"name", label:i18n_bom.hd_name, labelWidth:100, labelAlign:"right", inputWidth:260, required:true},
     		{ type:"input" , name:"desc", label:i18n_bom.hd_desc, labelWidth:100, labelAlign:"right", inputWidth:260, rows:"3"}
     	];

//init variables
function bom_initVariables() {
	bom.rest_bo = ctxpath + '/rest/bo/';
	bom.rest_query = ctxpath + '/rest/bo/query';
}

//main layout
function bom_initLayout() {
	
	window.onresize = function() {
		bom.body_layout && bom.body_layout.setSizes();
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
	bom.body_layout = new dhtmlXLayoutObject('maindiv', '1C', dhx_skin);
	
	bom.body_layout.progressOn();
	
	bom.body_layout.cells('a').setText(i18n_bom.bo);
	bom.body_layout.setAutoSize("a", "a");
	
	bom.listlo = bom.body_layout.cells('a').view('list').attachLayout('1C', dhx_skin);
	bom.listlo.cells('a').setText(i18n_bom.bo);
	
	bom.infolo = bom.body_layout.cells('a').view('info').attachLayout('1C', dhx_skin);
	bom.infolo.cells('a').setText(i18n_bom.bo);
	bom.infolo.cells('a').attachHTMLString('<div id="infoform"></div><div id="infogrid"></div>');
	
	bom.body_layout.cells('a').view('list').setActive();
	
	bom_initTb();
	bom_initListGrid();
	bom_initTbInfo();
	bom_initInfoForm();
	bom_initInfoGrid();
	
	bom.body_layout.progressOff();
}

//toolbar for bo layout
function bom_initTb() {
	bom.tb = bom.listlo.cells('a').attachToolbar();
	bom.tb.setIconsPath(bom.imagepath);
	
	bom.tb.addButton('botb_del',0,i18n_bom.del,"delete1.gif","delete1_dis.gif");
	bom.tb.addButton('botb_new',0,i18n_bom.new1,"new1.gif","new1_dis.gif");
	bom.tb.addSeparator('botb_sp1',0);
	bom.tb.addButton('botb_refresh',0,i18n_bom.refresh,"refresh.gif","refresh_dis.gif");
	
	bom.tb.attachEvent("onClick", function(tbid){
		if ("botb_new"==tbid) {
			bom.body_layout.cells('a').view('info').setActive();
		} else if ("tb_del"==tbid) {
			bom_deleteForm();
		} else if ("tb_refresh"==tbid) {
			bom_toPage(1, 10);
		}
	});
	
}

//toolbar for bo layout
function bom_initTbInfo() {
	bom.tbi = bom.infolo.cells('a').attachToolbar();
	bom.tbi.setIconsPath(bom.imagepath);
	
	bom.tbi.addButton('boitb_reset',0,i18n_bom.reset,"reset.png","reset_dis.png");
	bom.tbi.addButton('boitb_save',0,i18n_bom.save,"save.gif","save_dis.gif");
	bom.tbi.addSeparator('boitb_sp1',0);
	bom.tbi.addButton('boitb_back',0,i18n_bom.back,"back.png","back_dis.png");
	
	bom.tbi.attachEvent("onClick", function(tbid){
		if ("boitb_save"==tbid) {
			
		} else if ("boitb_reset"==tbid) {
			
		} else if ("boitb_back"==tbid) {
			bom.body_layout.cells('a').view('list').setActive();
		}
	});
	
}

//grid for bo layout
function bom_initListGrid() {
	bom.stb = bom.listlo.cells('a').attachStatusBar();
	bom.stb.setText("<div id='id_paging_stb1'></div>");
	
	bom.grid = bom.listlo.cells('a').attachGrid();
	bom.grid.setIconsPath(bom.imagepath);
	bom.grid.setHeader([i18n_bom.hd_no,
	                    "BOID",
	                    i18n_bom.hd_name,
	                    i18n_bom.hd_desc,
	                    i18n_bom.hd_updatetime,
	                    i18n_bom.hd_changeuser,
	                    i18n_bom.hd_changeusername,
	                    i18n_bom.hd_creator,
	                    i18n_bom.hd_creatorname,
	                    i18n_bom.hd_createtime],
	                    null,
	                    ["text-align:center;",
	                     "text-align:center;",
	                     "text-align:center;",
	                     "text-align:center;",
	                     "text-align:center;",
	                     "text-align:center;",
	                     "text-align:center;",
	                     "text-align:center;",
	                     "text-align:center;",
	                     "text-align:center;"]);
	bom.grid.attachHeader("#rspan,&nbsp;,"+
			"<input id='sr_boname' type='text' style='width:90%'/>,"+
			"<input id='sr_bodesc' type='text' style='width:90%'/>,"+
			"#rspan,#rspan,"+
			"<input id='sr_changeusername' type='text' style='width:90%'/>,"+
			"#rspan,"+
			"<input id='sr_creatorname' type='text' style='width:90%'/>,"+
			"#rspan");
	bom.grid.setInitWidths("40,100,150,250,115,80,100,100,100,115");
	bom.grid.setColumnIds("ROW_NO,BOID,BONAME,BODESC,UPDATETIME,CHANGEUSER,CHANGEUSERNAME,CREATOR,CREATORNAME,CREATETIME");
	bom.grid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
	bom.grid.setColSorting("na,str,str,str,str,str,str,str,str,str");
	bom.grid.setColumnsVisibility("false,true,false,false,false,true,false,true,false,false");
	bom.grid.setColAlign("center,left,left,left,center,center,left,left,left,center");
	bom.grid.setEditable(false);
	bom.grid.setLang(bom.lang);
	//default ordering
	bom.grid.grid_setOrderColumns([{"CREATETIME":"DESC"}]);
	
	//paging
	bom.grid.setPagingWTMode(true,true,true,[10,20,50,100]);
	bom.grid.enablePaging(true,10,5,'id_paging_stb1');
	bom.grid.setPagingSkin("toolbar", dhx_skin);
	
	bom.grid.init();
	
	bom.grid.attachEvent("onPageChanged", function(ind,fInd,lInd){
		bom_toPage(fInd+1, lInd);
	});
	
	//header click event
	bom.grid.attachEvent("onHeaderClick", grid_onHeaderClick);
	
	//bind searcher event
	//disable onclick order by function for this header
	var tdsr_boname = $("#sr_boname").parents('td:first');
	var tdsr_bodesc = $("#sr_bodesc").parents('td:first');
	var tdsr_bodescnext = $("#sr_bodesc").parents('td:first').next();
	tdsr_boname.bind('click',bom_stopEvent);
	tdsr_bodesc.bind('click',bom_stopEvent);
	tdsr_bodescnext.bind('click',bom_stopEvent);
	tdsr_boname.bind('mouseover',bom_stopEvent);
	tdsr_bodesc.bind('mouseover',bom_stopEvent);
	tdsr_bodescnext.bind('mouseover',bom_stopEvent);
	$("#sr_boname").bind('keypress', bom_enterQueryf);
	$("#sr_bodesc").bind('keypress', bom_enterQueryf);
}

//init info form
function bom_initInfoForm() {
	bom.infoform = new dhtmlXForm('infoform', newstr);
	bom.infoform.getInput('name').maxLength = 20;
	bom.infoform.getInput('desc').maxLength = 100;
}

//init info grid
function bom_initInfoGrid() {
	bom.infogrid = new dhtmlXGridObject('infogrid');
}

//call query bo
function bom_enterQueryf(e) {
	if (e.keyCode==13) {
		bom.fquery_boname = $.trim($("#sr_boname").val());
		bom.fquery_bodesc = $.trim($("#sr_bodesc").val());
		bom_toPagef(1, 10);
	}
}

//query bo
function bom_toPage(fromRow, toRow){
	bom.body_layout.cells('a').progressOn();
	var p = {"args":{}, "fromRow":fromRow, "toRow":toRow, "timezoneOffset":new Date().getTimezoneOffset(),
			"ordercolumns":JSON.stringify(bom.vergrid._grid_ordercolumns)};
	p.args.boid = bom.grid.cells(bom.grid.getSelectedRowId(), bom.grid.getColIndexById("FORMID")).getValue();
	if (bom.vquery_versionname) {
		p.args.versionname = bom.vquery_versionname;
	}
	if (bom.vquery_versiondesc) {
		p.args.versiondesc = bom.vquery_versiondesc;
	}
	p.args = JSON.stringify(p.args);
	var ret = doPostSyncJson(bom.rest_queryv, p);
	if (!ret) {
		bom.body_layout.cells('a').progressOff();
		msgErr(i18n_bom.msg_readfail);
		return;
	}
	bom.vergrid.clearAllInPaging();
	var idx1 = bom.vergrid.getColIndexById("STATUS");
	var obj1 = {};
	obj1[idx1] = i18n_bom.version_status;
	grid_setI18nInfoToGridJson(ret, obj1, 0);
	bom.vergrid.parse(ret, "json");
	//change current version display
	var sr = bom.vergrid.findCell("0",bom.vergrid.getColIndexById("VERSIONID"),true);
	//alert(JSON.stringify(sr));
	if (sr && sr.length && sr[0].length) {
		bom.vergrid.setRowTextStyle(sr[0][0], "color:blue;font-weight:bold;");
		bom.vergrid.cells(sr[0][0], bom.vergrid.getColIndexById("VERSIONNAME")).setValue(i18n_bom.current);
	}
	bom.vertb.disableItem('vertb_checkin');
	bom.vertb.disableItem('vertb_checkout');
	bom.vertb.disableItem('vertb_delete');
	bom.body_layout.cells('a').progressOff();
}

//stop event propagation
function bom_stopEvent(e){
	if (e && e.stopPropagation!=undefined) {
		e.stopPropagation();
	} else if (window.event){
		window.event.cancelBubble = true;
	}
	return false;
}

//delete bo
function bom_deleteBo() {
	var srow = bom.grid.getSelectedRowId();
	if (srow==null) {
		dhtmlx.message(i18n_bom.msg_plsselect + " " +i18n_bom.bo);
		return;
	}
	dhtmlx.confirm({
		title: "",
        type:"confirm-warning",
		text: i18n_bom.msg_delconfirm,
		ok : i18n_bom.ok,
		cancel : i18n_bom.cancel,
		callback: function(y) {
			if (y) {
				bom.body_layout.cells('a').progressOn();
				var boid = bom.grid.cells(srow, bom.grid.getColIndexById("FORMID")).getValue();
				var ret = doPostSyncJson(bom.rest_delf, {"boid":boid});
				if (ret && ret.result==-1) {
					msg(i18n_bom.msg_boinuse);
				} else if (ret && ret.result==1) {
					msg(i18n_bom.msg_succ);
					bom.grid.refreshPaging();
				} else {
					msgErr(i18n_bom.msg_commitfail);
				}
				bom.body_layout.cells('a').progressOff();
			}
		}
	});
}

//delete version
function bom_deleteVersion() {
	var v = bom_versionSelected();
	if (!v) return;
	var versionid = v.versionid;
	if (versionid=='0') {
		dhtmlx.message(i18n_bom.msg_cannotdelcur);
		return;
	}
	dhtmlx.confirm({
		title: "",
        type:"confirm-warning",
		text: i18n_bom.msg_delconfirm,
		ok : i18n_bom.ok,
		cancel : i18n_bom.cancel,
		callback: function(y) {
			if (y) {
				bom.body_layout.cells('a').progressOn();
				var boid = v.boid;
				var ret = doPostSyncJson(bom.rest_delv, {"boid":boid, "versionid":versionid});
				if (ret && ret.result==-1) {
					msg(i18n_bom.msg_boinuse);
				} else if (ret && ret.result==1) {
					msg(i18n_bom.msg_succ);
					bom.vergrid.refreshPaging();
				} else {
					msgErr(i18n_bom.msg_commitfail);
				}
				bom.body_layout.cells('a').progressOff();
			}
		}
	});
}

//check-in version
function bom_checkInVersion() {
	var v = bom_versionSelected();
	if (!v) return;
	bom.body_layout.cells('a').progressOn();
	var version = {"boid":v.boid, "versionid":v.versionid, "checkoutby":"", "checkoutbyname":""};
	var ret = doPostSyncJson(bom.rest_updv, {"version":JSON.stringify(version)});
	if (ret && ret.result==1) {
		msg(i18n_bom.msg_succ);
		bom.vergrid.refreshPaging();
		bom.vergrid.selectRowById(v.vrid);
	} else {
		msgErr(i18n_bom.msg_commitfail);
	}
	bom.body_layout.cells('a').progressOff();
}

//check-out version
function bom_checkOutVersion() {
	var v = bom_versionSelected();
	if (!v) return;
	bom.body_layout.cells('a').progressOn();
	var version = {"boid":v.boid, "versionid":v.versionid, "checkoutby":bom.loginName, "checkoutbyname":bom.displayName};
	var ret = doPostSyncJson(bom.rest_updv, {"version":JSON.stringify(version)});
	if (ret && ret.result==1) {
		msg(i18n_bom.msg_succ);
		bom.vergrid.refreshPaging();
		bom.vergrid.selectRowById(v.vrid);
	} else {
		msgErr(i18n_bom.msg_commitfail);
	}
	bom.body_layout.cells('a').progressOff();
}

//save to new bo
function bom_toNewForm() {
	var v = bom_versionSelected();
	if (!v) return;
	//input new name and desc
	var win1 = fm_createCenterWindow('win_id_newf', i18n_bom.new1 + i18n_bom.bo, 400, 200, 'new1.gif');
	var bo1 = win1.attachForm(newstr);
	var namei = bo1.getInput('name');
	namei.maxLength = 20;
	bo1.getInput('desc').maxLength = 100;
	bo1.setItemValue('desc', i18n_bom.copyof+'['+
			bom.grid.cells(v.frid, bom.grid.getColIndexById("FORMNAME")).getValue() + '][' +
			bom.vergrid.cells(v.vrid, bom.vergrid.getColIndexById("VERSIONNAME")).getValue()+'].\n');
	$(namei).focus();
	bo1.attachEvent('onButtonClick', function(btid){
		if (btid=='fbok') {
			if (!bo1.validate()) {
				return;
			}
			var name = bo1.getItemValue('name');
			var desc = bo1.getItemValue('desc');
			//create
			win1.close();
			bom.body_layout.cells('a').progressOn();
			var ret = doPostSyncJson(bom.rest_tonewf, {"boid":v.boid, "versionid":v.versionid, "name":name, "desc":desc});
			if (!ret || !ret.result) {
				msgErr(i18n_bom.msg_commitfail);
			} else {
				msg(i18n_bom.msg_succ);
				bom_toPagef(1, 10);
			}
			bom.body_layout.cells('a').progressOff();
		} else if (btid='fbcancel') {
			win1.close();
		}
	});
}

//save to new version
function bom_toNewVersion() {
	var v = bom_versionSelected();
	if (!v) return;
	//input new name and desc
	var win1 = fm_createCenterWindow('win_id_newf', i18n_bom.new1 + i18n_bom.version, 400, 200, 'new1.gif');
	var bo1 = win1.attachForm(newstr);
	var namei = bo1.getInput('name');
	namei.maxLength = 20;
	bo1.getInput('desc').maxLength = 100;
	bo1.setItemValue('desc', i18n_bom.copyof+'['+bom.vergrid.cells(v.vrid, bom.vergrid.getColIndexById("VERSIONNAME")).getValue()+'].\n');
	$(namei).focus();
	bo1.attachEvent('onButtonClick', function(btid){
		if (btid=='fbok') {
			if (!bo1.validate()) {
				return;
			}
			var name = bo1.getItemValue('name');
			var desc = bo1.getItemValue('desc');
			//TODO check length
			//create
			win1.close();
			bom.body_layout.cells('a').progressOn();
			var ret = doPostSyncJson(bom.rest_tonewv, {"boid":v.boid, "versionid":v.versionid, "name":name, "desc":desc});
			if (!ret || !ret.result) {
				msgErr(i18n_bom.msg_commitfail);
			} else {
				msg(i18n_bom.msg_succ);
				bom_toPagev(1, 10);
			}
			bom.body_layout.cells('a').progressOff();
		} else if (btid='fbcancel') {
			win1.close();
		}
	});
}

//check if a version is selected
function bom_versionSelected() {
	var srowf = bom.grid.getSelectedRowId();
	if (srowf==null) {
		dhtmlx.message(i18n_bom.msg_plsselect + " " +i18n_bom.bo);
		return null;
	}
	var srowv = bom.vergrid.getSelectedRowId();
	if (srowv==null) {
		dhtmlx.message(i18n_bom.msg_plsselect + " " +i18n_bom.version);
		return null;
	}
	var boid = bom.grid.cells(srowf, bom.grid.getColIndexById("FORMID")).getValue();
	var versionid = bom.vergrid.cells(srowv, bom.vergrid.getColIndexById("VERSIONID")).getValue();
	return {"boid":boid, "versionid":versionid, "frid":srowf, "vrid":srowv};
}

