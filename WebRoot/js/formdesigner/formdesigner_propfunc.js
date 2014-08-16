//show properties
function fmdpf_showprop(compType, type, $obj) {
	console.debug("fmdpf_showprop compType="+compType+" type="+type);
	fmdc.grid_prop || fmdpf_initPropGridLayout();
	fmdc.proptemp = {"compType" : compType, "type" : type};
	fmdpf_parse_prop_bytype(compType, type);
	fmdc.grid_prop.enableValidation(true, true);
	fmd.isEditor && fmdf_enableApply(fmdmeta_prop[compType][type].onApply);
	//bind grid events
	fmdpf_bindGridEvents(fmdmeta_prop[compType][type].gridEvents);
	fmdc.cell_prop.expand();
	fmdc.cell_prop.setWidth(fmdc.cell_prop_width);
	//set existing data
	fmdpf_loadExisting($obj);
	//fmdc.grid_prop.expandAll();
}

//hide element properties
function fmdpf_hide_elemprop() {
	fmdc.autohideprop && fmdpf_clear_elemprop() && fmdc.cell_prop.collapse();
}

//init properties grid
function fmdpf_initPropGridLayout() {
	//fmdc.grid_prop && fmdc.grid_prop.destructor();
	fmdc.grid_prop = fmdc.cell_prop.attachGrid();
	fmdc.grid_prop.isEditor = fmd.isEditor;
	fmdmeta_prop.gridconf.treeIconPath && fmdc.grid_prop.setIconPath(ctxpath + fmdmeta_prop.gridconf.treeIconPath);
	fmdmeta_prop.gridconf.treeImagePath && fmdc.grid_prop.setImagePath(ctxpath + fmdmeta_prop.gridconf.treeImagePath);
	fmdmeta_prop.gridconf.extIconPath && (fmdc.grid_prop.extIconPath = ctxpath + fmdmeta_prop.gridconf.extIconPath);
	fmdmeta_prop.gridconf.header && fmdc.grid_prop.setHeader(fmdmeta_prop.gridconf.header);
	fmdmeta_prop.gridconf.subHeader && fmdc.grid_prop.attachHeader(fmdmeta_prop.gridconf.subHeader);
	fmdmeta_prop.gridconf.colType && fmdc.grid_prop.setColTypes(fmdmeta_prop.gridconf.colType);
	fmdmeta_prop.gridconf.colIds && fmdc.grid_prop.setColumnIds(fmdmeta_prop.gridconf.colIds);
	fmdmeta_prop.gridconf.colAlign && fmdc.grid_prop.setColAlign(fmdmeta_prop.gridconf.colAlign);
	fmdmeta_prop.gridconf.colVAlign && fmdc.grid_prop.setColVAlign(fmdmeta_prop.gridconf.colVAlign);
	fmdmeta_prop.gridconf.colSorting && fmdc.grid_prop.setColSorting(fmdmeta_prop.gridconf.colSorting);
	fmdmeta_prop.gridconf.colMinWidth && fmdc.grid_prop.setColumnMinWidth(fmdmeta_prop.gridconf.colMinWidth);
	fmdmeta_prop.gridconf.colInitWidth && fmdc.grid_prop.setInitWidths(fmdmeta_prop.gridconf.colInitWidth);
	fmdmeta_prop.gridconf.resize && fmdc.grid_prop.enableResizing(fmdmeta_prop.gridconf.resize);
	fmdmeta_prop.gridconf.visibile && fmdc.grid_prop.setColumnsVisibility(fmdmeta_prop.gridconf.visibile);
	fmdmeta_prop.gridconf.isTreeGrid && fmdc.grid_prop.enableTreeCellEdit(false);
	fmdmeta_prop.gridconf.colColor && fmdc.grid_prop.setColumnColor(fmdmeta_prop.gridconf.colColor);
	fmdmeta_prop.gridconf.enableTooltips && fmdc.grid_prop.enableTooltips(fmdmeta_prop.gridconf.enableTooltips);
	fmdc.grid_prop.enableMultiselect(false);//单选
	fmdc.grid_prop.enableMarkedCells(true);
	fmdc.grid_prop.enableAlterCss("grid_even_row","grid_odd_row");
	fmdc.grid_prop.enableEditEvents(fmdc.grid_prop.isEditor,false,false);
	fmdc.grid_prop.setEditable(fmdc.grid_prop.isEditor);
	fmdc.grid_prop.init();
}

//hide element properties
function fmdpf_clear_elemprop() {
	//fmdc.cell_prop.attachHTMLString('');
	fmdc.grid_prop.clearAll();
	fmdpf_unbindGridEvents();
	fmdc.proptemp = null;
}

//parse element properties config
function fmdpf_parse_prop_bytype(compType, type) {
	/*if ("layout"==compType) {
		//splitter row
		fmdpf_addTipRow("tiprow_common", fmd_i18n_prop_tip_common);
		//common
		fmdpf_parse_prop(fmdmeta_prop.common.all);
		if (fmdmeta_prop.common.layout.properties) {
			//splitter row
			fmdpf_addTipRow("tiprow_layoutcommon", fmd_i18n_prop_tip_layoutcommon);
			//layout common
			fmdpf_parse_prop(fmdmeta_prop.common.layout);
		}
		if (fmdmeta_prop.layout[type].properties) {
			//splitter row
			fmdpf_addTipRow("tiprow_specific", fmd_i18n_prop_tip_specific);
			//specific
			fmdpf_parse_prop(fmdmeta_prop.layout[type]);
		}
	} else {
		//splitter row
		fmdpf_addTipRow("tiprow_common", fmd_i18n_prop_tip_common);
		//common
		fmdpf_parse_prop(fmdmeta_prop.common.all);
		//control common
		if ("datacontrol"==fmdmeta_prop.control[type]["controlcategory"] && fmdmeta_prop.common.datacontrol.properties) {
			//splitter row
			fmdpf_addTipRow("tiprow_controlcommon", fmd_i18n_prop_tip_controlcommon);
			fmdpf_parse_prop(fmdmeta_prop.common.datacontrol);
		} else if ("usercontrol"==fmdmeta_prop.control[type]["controlcategory"] && fmdmeta_prop.common.usercontrol.properties) {
			//splitter row
			fmdpf_addTipRow("tiprow_controlcommon", fmd_i18n_prop_tip_controlcommon);
			fmdpf_parse_prop(fmdmeta_prop.common.usercontrol);
		}
		if (fmdmeta_prop.control[type].properties) {
			//splitter row
			fmdpf_addTipRow("tiprow_specific", fmd_i18n_prop_tip_specific);
			//specific
			fmdpf_parse_prop(fmdmeta_prop.control[type]);
		}
	}*/
	
	//====properties
	
	//parse include properties
	console.debug("compType="+compType+" type="+type);
	if (fmdmeta_prop[compType][type]["includes-properties"]) {
		for (var i in fmdmeta_prop[compType][type]["includes-properties"]) {
			//splitter row
			fmdpf_addTipRow("tiprow_"+i, eval("fmd_i18n_prop_tip_"+i));
			if (fmdmeta_prop[compType][type]["includes-properties"][i]) {
				for (var id in fmdmeta_prop[compType][type]["includes-properties"][i]) {
					fmdpf_parsePropByCellType(0, id, fmdmeta_prop[compType][type]["includes-properties"][i][id]);
				}
			}
		}
	}
	//parse specific properties
	if (fmdmeta_prop[compType][type].properties) {
		//splitter row
		fmdpf_addTipRow("tiprow_specific", fmd_i18n_prop_tip_specific);
		for (var id in fmdmeta_prop[compType][type].properties) {
			fmdpf_parsePropByCellType(0, id, fmdmeta_prop[compType][type].properties[id]);
		}
	}
	
	//abandon properties
	if (fmdmeta_prop[compType][type]["abandon-properties"] && fmdmeta_prop[compType][type]["abandon-properties"].length) {
		for (var i in fmdmeta_prop[compType][type]["abandon-properties"]) {
			fmdc.grid_prop.deleteRow(fmdmeta_prop[compType][type]["abandon-properties"][i]);
		}
	}
	
	//====events
	
	//splitter row
	fmdpf_addTipRow("tiprow_events", fmd_i18n_prop_tip_events);
	
	//parse includes events
	if (fmdmeta_prop[compType][type]["includes-events"]) {
		for (var i in fmdmeta_prop[compType][type]["includes-events"]) {
			if (fmdmeta_prop[compType][type]["includes-events"][i]) {
				for (var id in fmdmeta_prop[compType][type]["includes-events"][i]) {
					fmdpf_parseEventByCellType(0, id, fmdmeta_prop[compType][type]["includes-events"][i][id]);
				}
			}
		}
	}
	//parse specific events
	if (fmdmeta_prop[compType][type].events) {
		for (var id in fmdmeta_prop[compType][type].events) {
			fmdpf_parseEventByCellType(0, id, fmdmeta_prop[compType][type].events[id]);
		}
	}
	
	//abandon events
	if (fmdmeta_prop[compType][type]["abandon-events"] && fmdmeta_prop[compType][type]["abandon-events"].length) {
		for (var i in fmdmeta_prop[compType][type]["abandon-events"]) {
			fmdc.grid_prop.deleteRow(fmdmeta_prop[compType][type]["abandon-events"][i]);
		}
	}
}

//parse element properties config
/*function fmdpf_parse_prop(propconf, abp) {
	if (!propconf) return;
	//properties
	if (propconf.properties && propconf.properties.length) {
		for (var id in propconf.properties) {
			fmdpf_parsePropByCellType(0, id, propconf.properties[id]);
		}
	}
	//events
	if (propconf.events && propconf.events.length) {
		for (var id in propconf.events) {
			//fmdpf_parseEventByCellType(0, id, propconf.events[id]);
		}
	}
	//abandon properties and events
	if (propconf["abandon-properties"] && propconf["abandon-properties"].length) {
		for (var i in propconf["abandon-properties"]) {
			fmdc.grid_prop.deleteRow(propconf["abandon-properties"][i]);
		}
	}
}*/

//parse cellType
function fmdpf_parsePropByCellType(pid, id, propconf, hide) {
	console.debug("pid="+pid+" id:"+id+" propconf="+JSON.stringify(propconf));
	var defaultVal = null;
	var imgName = propconf.img ? propconf.img : "property.png";
	if (propconf.value) {
		if (propconf.value["fromattr"]) {//from attribute
			defaultVal = fmdf_getSelected().attr(propconf.value["fromattr"]) || propconf.value["default"];
		} else if (propconf.value["default"]) {//default value
			defaultVal = propconf.value["default"];
		}
	}
	//propconf.value?(propconf.value["default"]!=undefined)?propconf.value["default"]:"":"";
	console.debug(propconf.name+" default value:"+defaultVal+"  afterProperty="+propconf.afterProperty);
	if (propconf.afterProperty) {
		fmdc.grid_prop.addRowAfter(id, 
				[propconf.name, defaultVal],
				propconf.afterProperty);
	} else {
		fmdc.grid_prop.addRow(id, 
				[propconf.name, defaultVal],
				null,
				pid);
	}
	//add row attribute displayOnly
	propconf.displayOnly && fmdc.grid_prop.setRowAttribute(id, "displayOnly", propconf.displayOnly);
	//set image
	fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.prop).setImage(ctxpath+fmdmeta_prop.iconpath+imgName);
	console.debug(id+"="+fmdmeta_prop.gridconf.idx.value+"="+(propconf.cellType || "ed"));
	if (propconf.cellType) {
		if (typeof(propconf.cellType)=="string") {
			fmdc.grid_prop.setCellExcellType(id, fmdmeta_prop.gridconf.idx.value, propconf.cellType || "ed");
			"ro"==propconf.cellType && fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.value).setBgColor("#F8F8F8");
		} else if (typeof(propconf.cellType)=="object") {
			if ("coro"==propconf.cellType.type) {
				dhx_bindCombo(null, fmdc.grid_prop, id, fmdmeta_prop.gridconf.idx.value, propconf.cellType.options, defaultVal);
			}
		}
	}
	//set validate
	propconf.validator && fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.value).setAttribute("validate", propconf.validator);
	//add sub
	if (propconf.sub) {
		for (var sid in propconf.sub) {
			fmdpf_parsePropByCellType(id, sid, propconf.sub[sid]);
		}
		fmdc.grid_prop.openItem(id);
	}
	//add conditional-sub and hide
	if (propconf["conditional-sub"]) {
		for (var sid in propconf["conditional-sub"]) {
			for (var ssid in propconf["conditional-sub"][sid]) {
				fmdpf_parsePropByCellType(id, ssid, propconf["conditional-sub"][sid][ssid], true);
			}
		}
		fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.prop).cell.firstChild.firstChild.style.visibility="hidden";
	}
	//set tooltip
	propconf.tooltip && $(fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.prop).cell).find("div:nth-child(1)").attr("original-title", propconf.tooltip).tipsy({gravity: 'e'});
	//set row hidden
	fmdc.grid_prop.setRowHidden(id, hide);
}

//parse event by cellType
function fmdpf_parseEventByCellType(pid, id, propconf) {
	console.debug("pid="+pid+" id:"+id+" propconf="+JSON.stringify(propconf));
	fmdc.grid_prop.addRow(id, 
			[propconf.name + "("+id+")", null],
			null,
			pid);
	//add row attribute isEvent=true
	fmdc.grid_prop.setRowAttribute(id, "isEvent", true);
	//set image
	var imgName = propconf.img ? propconf.img : "event.png";
	fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.prop).setImage(ctxpath+fmdmeta_prop.iconpath+imgName);
	//set excell type
	fmdc.grid_prop.setCellExcellType(id, fmdmeta_prop.gridconf.idx.value, "ace_javascript");
	fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.value).setArgs(propconf.arguments);
	
	//add sub
	if (propconf.sub) {
		for (var sid in propconf.sub) {
			fmdpf_parsePropByCellType(id, sid, propconf.sub[sid]);
		}
		fmdc.grid_prop.openItem(id);
	}
}

//add tip row
function fmdpf_addTipRow(rid, text) {
	var rn = fmdc.grid_prop.getRowsNum();
	var prid = fmdc.grid_prop.getRowId(rn-1);
	if (rn && fmdc.grid_prop.getRowAttribute(prid, "displayOnly")) {//avoid duplicate tip row together
		fmdc.grid_prop.cells(prid, fmdmeta_prop.gridconf.idx.prop).setValue(text);
	} else {
		fmdc.grid_prop.addRow(rid, [text, ""]);
		fmdc.grid_prop.setRowAttribute(rid, "displayOnly", true);
		fmdc.grid_prop.setRowColor(rid, fmdmeta_prop.gridconf.tiprowbgcolor);
		fmdc.grid_prop.setCellExcellType(rid, fmdmeta_prop.gridconf.idx.prop, "ro");
	}
}

//collect properties values
function fmdpf_collectValues() {
	var vals = {};
	fmdc.grid_prop.forEachRow(function(id){
		!fmdc.grid_prop.isRowHidden(id)
		 && !fmdc.grid_prop.getRowAttribute(id, "displayOnly")
		 && (vals[id]=fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.value).getValue());
	});
	console.debug("fmdpf_collectValues vals="+JSON.stringify(vals));
	fmd.version.formdata.propconf[fmdf_getSelected().attr("id")] = vals;
}

//load existing properties values
function fmdpf_loadExisting($obj) {
	var existingConf = fmd.version.formdata.propconf[$obj.attr("id")];
	console.debug("existingConf="+JSON.stringify(existingConf));
	if (existingConf) {
		for (var id in existingConf) {
			//console.log(id + "==" + existingConf[id]);
			//only set existing properties that are available at this time
			fmdc.grid_prop.doesRowExist(id) && fmdc.grid_prop.cells(id, fmdmeta_prop.gridconf.idx.value).setValue(existingConf[id]);
		}
	}
}

//do apply
function fmdpf_apply() {
	if (!fmdpf_validate()) {
		var msg = fmd_i18n_prop_msg_validatefail +'<br/>';
		if (fmdc.proptemp.vfailure) {
			for (var rid in fmdc.proptemp.vfailure) {
				msg += '<br/>' + fmdc.proptemp.vfailure[rid];
			}
		}
		dhtmlx.message(msg);
		return false;
	}
	fmdpf_collectValues();
	//alert("fmdpf_apply fmdc.proptemp="+JSON.stringify(fmdc.proptemp));
	fmdmeta_prop[fmdc.proptemp["compType"]][fmdc.proptemp["type"]].onApply && fmdmeta_prop[fmdc.proptemp["compType"]][fmdc.proptemp["type"]].onApply();
	fmdc.unsavedchange = true;
	return true;
}

//do validation
function fmdpf_validate() {
	var result = true;
	fmdc.grid_prop.forEachRow(function(rid) {
		if (!fmdc.grid_prop.isRowHidden(rid)
				 && !fmdc.grid_prop.getRowAttribute(rid, "displayOnly")
				 && false === fmdc.grid_prop.validateCell(rid, fmdmeta_prop.gridconf.idx.value)) {
			result = false;
			fmdc.proptemp.vfailure || (fmdc.proptemp.vfailure={});
			fmdc.proptemp.vfailure[rid] = this.cells(rid, fmdmeta_prop.gridconf.idx.prop).getValue();
		} else {
			fmdc.proptemp.vfailure && (delete fmdc.proptemp.vfailure[rid]);
		}
	});
	//result && (delete fmdc.proptemp.vfailure);
	return result;
}

//bind events for prop grid
function fmdpf_bindGridEvents(events) {
	//bind validation event at first
	//fmdc.grid_prop.attachEvent("onValidationError", fmdpf_onValidationError);
	//fmdc.grid_prop.attachEvent("onLiveValidationError", fmdpf_onValidationError);
	//fmdc.proptemp.gridEvents = [];
	if (fmdmeta_prop.gridPredefinedEvents) {
		for (var e in fmdmeta_prop.gridPredefinedEvents) {
			fmdc.grid_prop.attachEvent(e, fmdmeta_prop.gridPredefinedEvents[e]);
			//fmdc.proptemp.gridEvents.push(e);
		}
	}
	if (events) {
		for (var e in events) {
			fmdc.grid_prop.attachEvent(e, events[e]);
			//fmdc.proptemp.gridEvents.push(e);
		}
	}
}

//unbind events for prop grid
function fmdpf_unbindGridEvents() {
	/*console.debug("fmdc.proptemp.gridEvents="+JSON.stringify(fmdc.proptemp.gridEvents));
	if (!fmdc.proptemp.gridEvents) return;
	for (var e in fmdc.proptemp.gridEvents) {
		fmdc.grid_prop.detachEvent(fmdc.proptemp.gridEvents[e]);
	}*/
	fmdc.grid_prop.detachAllEvents();
}

//add conditional sub
function fmdpf_showConditionalSub(rId, nv, propconf) {
	console.debug("rId="+rId+" nv="+nv+" propconf="+JSON.stringify(propconf));
	if (propconf["conditional-sub"]) {
		/*for (var id in propconf["conditional-sub"][nv]) {
			fmdc.grid_prop.setRowHidden(id, false);
		}*/
		/*fmdc.grid_prop.forEachRow(function(id) {
			fmdc.grid_prop.setRowHidden(id, !propconf["conditional-sub"][nv][id]);
		});*/
		var hasSub = false;
		var sids = fmdc.grid_prop.getSubItems(rId);
		if (sids) {
			var sida = sids.split(",");
			for (var i in sida) {
				var show = propconf["conditional-sub"][nv] && propconf["conditional-sub"][nv][sida[i]];
				fmdc.grid_prop.setRowHidden(sida[i], !show);
				show && (hasSub = true);
			}
			fmdc.grid_prop.closeItem(rId);
		}
		hasSub && fmdc.grid_prop.openItem(rId);
	}/* else {
		var sids = fmdc.grid_prop.getSubItems(rId);
		if (sids) {
			var sida = sids.split(",");
			for (var i in sida) {
				fmdc.grid_prop.setRowHidden(sida[i], true);
			}
			fmdc.grid_prop.closeItem(rId);
		}
	}*/
}

//on vlidation fail
/*function fmdpf_onValidationError(rid,cid,v) {
	fmdc.proptemp.vfailure || (fmdc.proptemp.vfailure={});
	fmdc.proptemp.vfailure[rid] = this.cells(rid, fmdmeta_prop.gridconf.idx.prop).getValue();
}*/

//bo meta info selection popup, for data binding
function initBindingMeta(){
	
	//variable for holding BO meta info
	fmd.bometa={};

	//process object meta info
	fmd.bometa.po = {
			rows:[
			      { id:1, 
			   data:[
			        "TS_PROCESS_INSTANCE",
			        "PIID",
			        "流程实例ID",
			        "Number",
			        "",
			        "tsProcessInstance_piid"] },
			     { id:2, 
			   data:[
			        "TS_PROCESS_INSTANCE",
			        "CREATOR",
			        "发起人ID",
			        "String",
			        "",
			        "tsProcessInstance_creator"] },
			     { id:3, 
			   data:[
			        "TS_PROCESS_INSTANCE",
			        "CREATETIME",
			        "申请时间",
			        "Date",
			        "",
			        "tsProcessInstance_createtime"]
			      },
			      { id:4, 
			   data:[
			        "TS_PROCESS_INSTANCE",
			        "STATUS",
			        "状态",
			        "String",
			        "",
			        "tsProcessInstance_status"]
			      },
			      { id:5, 
					   data:[
					        "TS_PROCESS_INSTANCE",
					        "CREATOR",
					        "申请人",
					        "String",
					        "",
					        "tsProcessInstance_creator"] },
					        { id:6, 
								   data:[
								        "TS_PROCESS_INSTANCE",
								        "COMPANY",
								        "申请公司",
								        "String",
								        "",
								        "tsProcessInstance_creator"] },
								        { id:7, 
											   data:[
											        "TS_PROCESS_INSTANCE",
											        "DEPT",
											        "申请部门",
											        "String",
											        "",
											        "tsProcessInstance_creator"] },
											        { id:8, 
														   data:[
														        "TS_PROCESS_INSTANCE",
														        "CREATETIME",
														        "申请时间",
														        "String",
														        "",
														        "tsProcessInstance_creator"] },
			   ]
			  };

	//business object meta info
	fmd.bometa.bo = {
			rows:[
			      { id:1001, 
			   data:[
			        "BT_BO1",
			        "BTID",
			        "合同号",
			        "String",
			        "",
			        "btBo1_btid"] },
			     { id:1002, 
			   data:[
			        "BT_BO1",
			        "BT1",
			        "合同标题",
			        "String",
			        "",
			        "btBo1_bt1"] },
			     { id:1003, 
			   data:[
			        "BT_BO1",
			        "BT2",
			        "合同类型",
			        "Date",
			        "",
			        "btBo1_bt2"]
			      },
			      { id:1004, 
			   data:[
			        "BT_BO1",
			        "BT3",
			        "供应商名称",
			        "String",
			        "",
			        "btBo1_bt3"]
			      },
			      { id:1005, 
					   data:[
					        "BT_BO1",
					        "BT3",
					        "签订日期",
					        "String",
					        "",
					        "btBo1_bt3"]
					      }
			   ]
			  };
	
	if (!fmdc.popup_binding_elem){
		fmdc.popup_binding_elem = new dhtmlXPopup();
		fmdc.popup_binding_elem.ac1 = fmdc.popup_binding_elem.attachAccordion(500,500);
		//return;
		fmdc.popup_binding_elem.ac1.addItem("bometaacpo", fmd_i18n_l_metapo);
		fmdc.popup_binding_elem.ac1.addItem("bometaacbo", fmd_i18n_l_metabo);
		var cell1 = fmdc.popup_binding_elem.ac1.cells("bometaacpo");
		var cell2 = fmdc.popup_binding_elem.ac1.cells("bometaacbo");
		//list for process object attributes
		var gridpo = cell1.attachGrid();
		gridpo.setIconsPath(dhtmlx.image_path);
		gridpo.setHeader([fmd_i18n_l_table,fmd_i18n_l_column,fmd_i18n_l_column,"DATATYPE","DATAPROVIDER","BINDING_NAME"]);
		gridpo.setColumnIds("TABLE,COLUMN,COLUMNDESC,DATATYPE,DATAPROVIDER,BINDING_NAME");
		gridpo.setColTypes("ro,ro,ro,ro,ro,ro");
		gridpo.setInitWidths("150,150,100,40,40,40");
		gridpo.setColSorting("na,na,na,na,na,na");
		gridpo.setColAlign("left,left,left,center,center,center");
		gridpo.setColumnsVisibility("false,false,false,true,true,true");
		gridpo.init();
		gridpo.parse(fmd.bometa.po, 'json');
		//list for business object attributes
		var gridbo = cell2.attachGrid();
		gridbo.setIconsPath(dhtmlx.image_path);
		gridbo.setHeader([fmd_i18n_l_table,fmd_i18n_l_column,fmd_i18n_l_column,"DATATYPE","DATAPROVIDER","BINDING_NAME"]);
		gridbo.setColumnIds("TABLE,COLUMN,COLUMNDESC,DATATYPE,DATAPROVIDER,BINDING_NAME");
		gridbo.setColTypes("ro,ro,ro,ro,ro,ro");
		gridbo.setInitWidths("150,150,100,40,40,40");
		gridbo.setColSorting("na,na,na,na,na,na");
		gridbo.setColAlign("left,left,left,center,center,center");
		gridbo.setColumnsVisibility("false,false,false,true,true,true");
		gridbo.init();
		gridbo.parse(fmd.bometa.bo, 'json');
		//init 
		fmdc.popup_binding_elem.popup = function(x,y,w,h) {
			if (fmdc.popup_binding_elem.isVisible()) fmdc.popup_binding_elem.hide();
	        fmdc.popup_binding_elem.show(x, y, w, h);
			fmdc.popup_binding_elem.ac1.cells('bometaacpo').open();
			//set null for assign exception that may occurs in browser
			fmdc.popup_binding_elem.form = null;
	        fmdc.popup_binding_elem.callback = null;
		};
		//reset function
		fmdc.popup_binding_elem.resetForNextShow = function() {
			fmdc.popup_binding_elem.hide();
			//set null for assign exception that may occurs in browser
			fmdc.popup_binding_elem.form = null;
	        fmdc.popup_binding_elem.callback = null;
		};
		//set return action
		gridpo.attachEvent("onRowDblClicked", function(rId,cInd){
			var binding = this.cells(rId, this.getColIndexById('BINDING_NAME')).getValue();
			var bindingdesc = this.cells(rId, this.getColIndexById('COLUMNDESC')).getValue();
			if(fmdc.popup_binding_elem.callback) fmdc.popup_binding_elem.callback({"binding":binding,"bindingdesc":bindingdesc});
			fmdc.popup_binding_elem.resetForNextShow();
		});
		gridbo.attachEvent("onRowDblClicked", function(rId,cInd){
			var binding = this.cells(rId, this.getColIndexById('BINDING_NAME')).getValue();
			var bindingdesc = this.cells(rId, this.getColIndexById('COLUMNDESC')).getValue();
			if(fmdc.popup_binding_elem.callback) fmdc.popup_binding_elem.callback({"binding":binding,"bindingdesc":bindingdesc});
			fmdc.popup_binding_elem.resetForNextShow();
		});
	}
}




