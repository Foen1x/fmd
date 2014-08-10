/*
 *Function used only in design time of form designer
 *
 *1. Class name conventions
 *
 *   fmdraggable : draggable
 *   element-tag-* : available components in left panel with type
 *   fmddragging : available components in dragging state
 *   fmdelement_* : dropped form element with type
 *   fmddropped : dropped form element
 *   fmcontainer_tab : first level tab container
 *   fmcontainer_block : container element
 *   fmcontainer_block_titlebar : container title bar div
 *   fmcontainer_block_content : container content div
 *   ui-* : jQuery ui classes with default jQuery ui behaviours
 *   
 *2. ID conventions
 *   ui-id-* : unique id in this form
 *
 */

//===== Constants

//dhx windows
dhxWins = new dhtmlXWindows();

//dhx skin, should be re-initialized in JSP
dhx_skin = "dhx_skyblue";

//dhx images path, should be re-initialized in JSP
//dhtmlx.image_path;

//global context
fmd = {};

//======== designer vars
fmdc = {};

//design theme name, not the theme in runtime
fmdc.theme = 'formoid-default-skyblue';

//image path
//fmdc.imagepath;

//column limit
fmdc.collimit = 6;

//properties cell default width
fmdc.cell_prop_width = 300;

//tip p html string
fmdc.tipp = '<p class="fmdtipp">'+fmd_i18n_tdp+'</p>';

//td html string
fmdc.tdcell = '<td class="fmdtd fmdselectable" onclick="fmdf_onselect(event,this)">'+fmdc.tipp+'</td>';
fmdc.tdcell0 = '<td class="fmdtd fmdselectable" onclick="fmdf_onselect(event,this)"></td>';

//tr html string
fmdc.trrow = '<tr class="fmdtr">'+fmdc.tdcell+'</tr>';
fmdc.trrow0 = '<tr class="fmdtr"></tr>';

//enumeration meta
fmdc.enu = {};

//====== set Variables
fmdf_resetVars();


//====== JQuery UI Variables

//draggable arguments
fmdc.draggable_args = {
		revert: true,
		cursor: "move", 
		cursorAt: { top: 30, left: 50 },
		zIndex: 1,
		helper: fmdf_helper
	};

//draggable without helper, used to move dropped elements
fmdc.draggable_args_nohelper = {
		revert: true,
		cursor: "move", 
		cursorAt: { top: 30, left: 50 },
		zIndex: 1
	};

//droppable arguments
fmdc.droppable_args = {
		accept: fmdf_isAccept,
		activeClass: "ui-state-hover",
		hoverClass: "ui-state-active",
		drop: fmdf_onDrop
	};


//====== Functions

//init
function fmdf_init(formid, versionid) {
	
	waitstart();

	//image path
	fmdc.imagepath = ctxpath + '/images/';
	//canvas vars
	fmdc.theme = 'formoid-default-skyblue';

	//disable context menu
	document.oncontextmenu = function(){return false;};

	//onkeyup
	$(document).bind('keyup', function(e){
		e = window.event || e;
		//alert(e.keyCode);
		if (e.keyCode==116 || e.keyCode==8) {
			e.keyCode = 0;
			return false;
		}
		//delete key
		if (e.keyCode==46) {
			if (!fmd.isEditor) return false;
			if (e.ctrlKey) {
				fmdf_removeselectedtab();
			} else {
				fmdf_removeselected();
			}
		}
		return true;
	});

	//onkeydown
	$(document).bind('keydown', 'Ctrl+Alt+s', function (e) {
		e.ctrlKey && e.altKey && e.which==83 && fmdf_save();
		/* if(e){
            //因此它支持W3C的stopPropagation()方法 
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.returnvalue = false;
        }else{
            //否则我们使用ie的方法来取消事件冒泡
            window.event.cancelBubble = true;
        }
		e.keyCode = 0;
		return false; */
	});
	
	if (!formid || !versionid) {//new form
		fmdf_resetVars();
	}
	
	waitend();

	//init layout
	fmdf_initLayout();

	//jQuery ui init tab function
	fmdf_initTabs();

	//data
	if (formid && versionid) {
		var ret = doPostSyncJson(ctxpath + "/rest/fmd/getVersion", {"formid" : formid, "versionid" : versionid});
		if (ret) {
			fmd.form = ret.form;
			fmd.version = ret.version;
			fmdf_loadSavedData();
		}
	}
	
	fmd.body_layout.progressOff();
}

//reset form designer vars
function fmdf_resetVars() {
	
	fmd.form = {};
	fmd.form.formtype = fmd.inputformtype;
	fmd.version = {};
	//form designer data
	fmd.version.formdata = {};
	fmd.version.formdata.tableNames = "TEST01,TEST02";
	//form designer properties config data
	fmd.version.formdata.propconf = {};

	//default font size in px, the same as that in body css
	fmdc.fontsize = 16;
	//default canvas width in em, the same as width in class fmdcanvas
	fmdc.canvas_size_widthem  = 60;
	//auto hide elements prop
	fmdc.autohideprop = true;
	//properties cell
	//fmdc.cell_prop = null;
	//tab ui object
	fmdf_initTabs();
	//canvas status bar
	//fmdc.statusbar = null;
	//selection holder
	fmdc.selection = {selectedobj:null};
	fmdf_unselect();
	//tab page index for adding tab id
	fmdc.tabpageidx = 1;
	//fmcontainer index for adding container id
	fmdc.contidx = 1;
	//control index for adding new control
	fmdc.uiidx = 1;
	//tempdata for properties window of the designer
	fmdc.proptemp = null;
	//unsaved change flag
	fmdc.unsavedchange = false;
}

//reset form designer canvas
function fmdf_cleanCanvas() {
	fmdf_unselect();
	$('.fmdcanvas').children("ul").empty();
	$('.fmdcanvas').children("div").remove();
}

//reset ui behaviours
/*function fmdf_resetUiBehaviour() {
	fmdf_setsortable();
	fmdf_initTabs();
	fmdc.tabs.tabs( "refresh" ).tabs({ active: 0 });
	$('.fmcontainer_block td').droppable(fmdc.droppable_args);
	$('.fmddropped').draggable(fmdc.draggable_args_nohelper);
}*/

//helper function on dragging start
function fmdf_helper(event) {
	//check type
	var classes = event.target.className.split(' ');
	var type = null;
	for (var i in classes) {
		if (classes[i].indexOf('element-tag-')!=-1) {	//class start with element-tag- is draggable(available elements)
			type = classes[i].substr(12);
			break;
		} else if (classes[i].indexOf('fmdelement_')!=-1) {	//class start with fmdelement is draggable(dropped elements)
			type = classes[i].substr(11);
			break;
		}
	}
	console.debug("dragging type:"+type);
	if (fmdmeta_prop.control[type] && fmdmeta_prop.control[type].innerhtml_dragging) {
		return $( '<div class="fmddragging fmdelement_'+type+'" >'+
				eval("fmdmeta_prop.control[type].innerhtml_dragging" + (typeof(fmdmeta_prop.control[type].innerhtml_dragging)=="function" ? "()":""))+
				'</div>' );
	}
	return $( '<div class="fmddragging fmdelement_none" >'+fmd_i18n_notavailable+'</div>' );
}

//on drop event handler
function fmdf_onDrop( event, ui ) {
	//$( this ).addClass( "ui-state-highlight" );
	if (ui.draggable.parent().attr("id")==$(this).attr("id")) {
		//console.debug("fmdf_onDrop element moved but moved to original cell. donothing...");
		return;
	}
	//check existing
	console.debug("$(this).find('.fmddropped').length="+$(this).find('.fmddropped').length);
	if ($(this).find('.fmddropped').length==1){
		dhtmlx.message(fmd_i18n_msg_delexistingfirst);
		return;
	}
	//check type
	var classes = ui.draggable.attr('class').split(' ');
	console.debug('fmdf_onDrop existing classes='+classes);
	var type = null;
	var oldid = null;
	if (fmdf_hasClass(ui.draggable, 'fmddropped')) {	// move existing element
		oldid = ui.draggable.attr('id');
		console.debug("ui.draggable.html()=="+ui.draggable.html());
		var movingInnerHtml = ui.draggable.html();
		console.debug('fmdf_onDrop existing ui id='+oldid);
		for (var i in classes) {
			if (classes[i].indexOf('fmdelement_')!=-1) {	//class start with fmdelement is acceptable(dropped elements)
				type = classes[i].substr(11);
				break;
			}
		}
		//set orginal td html code
		ui.draggable.parent().append(fmdc.tipp);
		//remove existing element
		console.debug('fmdf_onDrop removing existing ui:'+ui.draggable.html());
		ui.draggable.remove();
		$(this).html( '<div class="fmddropped fmdelement_'+type+'" onclick="fmdf_onselect(event,this);">'+movingInnerHtml+'</div>' );
	} else {	//creating new element
		for (var i in classes) {
			if (classes[i].indexOf('element-tag-')!=-1) {	//class start with element-tag- is acceptable(available elements)
				type = classes[i].substr(12);
				break;
			}
		}
		//create new element
		console.debug("fmdf_onDrop accepting type:"+type);
		if (fmdmeta_prop.control[type] && fmdmeta_prop.control[type].innerhtml_dropped){
			$(this).html( '<div class="fmddropped fmdelement_'+type+'" onclick="fmdf_onselect(event,this);">'+
					eval("fmdmeta_prop.control[type].innerhtml_dropped" + (typeof(fmdmeta_prop.control[type].innerhtml_dropped)=="function" ? "()":""))+
					'</div>' );
		}
	}
	//set id
	var dropped = $(this).find('.fmddropped');
	if (oldid) {
		dropped.attr("id", oldid);
	} else {
		dropped.attr("id", fmdf_uiid());
	}
	//set draggable
	fmd.isEditor && dropped.draggable(fmdc.draggable_args_nohelper);
	
	//select the new component
	fmdf_select(dropped);
}

//on fmcontainer_block title bar clicked and select fmcontainer
function fmdf_fmcontainer_block_tbclick(event, thisdiv) {
	//fmdf_select($(thisdiv).parent());
	fmdf_onselect(event, $(thisdiv).parent());
}

//change current selected container title
function fmdf_fmcontainer_block_title(label) {
	var c = fmdc.selection.selectedobj;
	c.find('.fmcontainer_block_titlebar a').html('<b>'+label+'</b>');
}

//change current selected container header display
function fmdf_fmcontainer_block_headerdisplay(hide) {
	var c = fmdc.selection.selectedobj;
	//alert(hide);
	if (hide=='1'){
		c.find('.fmcontainer_block_titlebar').height('.1em');
		c.find('.fmcontainer_block_titlebar img').hide();
		c.find('.fmcontainer_block_titlebar a').hide();
	} else {
		c.find('.fmcontainer_block_titlebar').height('2em');
		c.find('.fmcontainer_block_titlebar img').show();
		c.find('.fmcontainer_block_titlebar a').show();
	}
}

//accept
function fmdf_isAccept($obj) {
	if ($($obj).attr('class')!=undefined) {
		var classes = $($obj).attr('class').split(' ');
		for (var i in classes) {
			if (classes[i]=='fmdraggable' || classes[i]=='fmddropped') {
				return true;
			}
		}
	}
	return false;
}

//on dom object clicked and select dom object
function fmdf_onselect(event, obj) {
	if (fmdc.selection.selectedobj && fmdc.selection.selectedobj.attr('id')==$(obj).attr('id')){
		console.debug("selection not changed.");
		return;
	}
	fmdf_select($(obj));
	if(navigator.appName == 'Microsoft Internet Explorer') {
		event.cancelBubble=true; //ie s
	} else {
		event.stopPropagation(); //ff s
	}
}

//init tabs
function fmdf_initTabs() {
	
	//sortable tabs
	//$(".fmdcanvas").children("ul:first").find("li").removeClass("ui-state-default ui-corner-top ui-tabs-active ui-state-active fmdselected");
	//$(".fmdcanvas").children("div").removeClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
	fmdc.tabs = $( ".fmdcanvas" ).tabs();
	if (fmd.isEditor) {
		fmdc.tabs.find( ".ui-tabs-nav" ).sortable({
			axis: "x",
			stop: function() {
				fmdc.tabs.tabs( "refresh" );
			}
		});
	}
}

//set sortable
function fmdf_setsortable() {
	//sortable
	if (fmd.isEditor) {
		$( ".fmform" ).sortable({
			placeholder: "ui-state-highlight"
		});
	}
	$( ".fmform" ).disableSelection();
}

//Append a tab
function fmdf_addtab(title, type, id) {
	var tabpageidx = null;
	if (id) {
		tabpageidx = id.substr(16);
	} else {
		/*if (fmd.form.formtype=='PROCESS' && fmdc.tabpageidx>1) {
			msg(fmd_i18n_msg_processonetabonly);
			return;
		}*/
		tabpageidx = fmdc.tabpageidx;
		fmdc.tabpageidx ++;
	}
	$('.fmdcanvas .fmdcanvas_tabnav').append('<li id="fmcontainer_tab_'+tabpageidx+'" class="fmdcanvas_tabnavli fmdselectable" onclick="fmdf_select($(this))"><a href="#fmcontainer_tabbody_'+tabpageidx+'">'+title+'</a></li>');
	if (type=='business') {
		$('.fmdcanvas').append('<div class="fmcontainer_tab fmbusinesstab" id="fmcontainer_tabbody_'+tabpageidx+'"><form class="fmform"></form></div>');
		fmdf_setsortable();
	} else {
		$('.fmdcanvas').append('<div class="fmcontainer_tab fmsystemtab" id="fmcontainer_tabbody_'+tabpageidx+'"><div><p>'+fmd_i18n_t_systemtab+'</p></div></div>');
	}
	$('.fmdcanvas .fmdcanvas_tabnav .fmdcanvas_tabnavli:last').attr("tabtype", type);
	var tabsno = $('.fmdcanvas .fmdcanvas_tabnav').children().length - 1;
	console.debug('current tab number is '+tabsno);
	fmdc.tabs.tabs( "refresh" ).tabs({ active: tabsno });
	fmdf_select($('#fmcontainer_tab_'+tabpageidx));
	fmdpf_apply();
}

//change tab title
function fmdf_fmcontainer_tab_title(label) {
	var t = fmdc.selection.selectedobj;
	t.find('a').html(label);
}

//Append a container
function fmdf_fmcontainer_block_addcontainer(fmdpattern, id) {
	var activetab = fmdc.tabs.find(".ui-tabs-active");
	if (activetab) {
		var tabcontent = $('#'+activetab.attr('aria-controls'));
		if(fmdf_hasClass(tabcontent, 'fmbusinesstab')) {
			var id1 = id || "fmcontainer_block_"+ fmdc.contidx++;
			//append container
			var str1 = '<div id="'+ id1 +'" class="fmcontainer_block fmdselectable" fmdpattern="'+fmdpattern+'">'+
							'<div class="fmcontainer_block_titlebar" onclick="fmdf_fmcontainer_block_tbclick(event,this)">'+
							'<img align="absmiddle" src="'+fmdc.imagepath+'/collapse.png" onclick="fmf_fmcontainer_block_togglecontent(this)"/>'+
							'<a href="" onclick="return false;"><b>'+fmd_i18n_container_title+'</b></a>'+
							'</div>'+
							'<table class="fmcontainer_block_content">'+
								(id ? "" : fmdc.trrow) +
							'</table>'+
						'</div>';
			tabcontent.find('.fmform').append(str1);
			var block = tabcontent.find( ".fmcontainer_block:last" );
			if (!id) {
				block.hide().show("slide", {}, 300, null );
				block.find('.fmdtd').droppable(fmdc.droppable_args).attr("id", fmdf_uiid());
			}
			fmdf_select(block);
			return block;
		}
	}
}

//check if current tab is a business tab
/*function fmdf_isOnBiztab() {
	//get active tab in business type
	var activetab = fmdc.tabs.find(".ui-tabs-active");
	if (activetab) {
		//console.debug('active tab control====='+activetab.attr('aria-controls'));
		//console.debug('active tab control class====='+$('#'+activetab.attr('aria-controls')).attr('class'));
		if (fmdf_hasClass($('#'+activetab.attr('aria-controls')), 'fmbusinesstab')) {
			return true;
		}
	}
	return false;
}*/

//Append row to container
function fmdf_fmcontainer_block_appendtr() {
	if (!fmdc.selection.selectedobj) {
		return;
	}
	var $table = null;
	if ( fmdf_hasClass(fmdc.selection.selectedobj, 'fmcontainer_block') ) {
		$table = $(fmdc.selection.selectedobj).find('table');
	} else if ( fmdf_hasClass(fmdc.selection.selectedobj, 'ui-droppable') || fmdf_hasClass(fmdc.selection.selectedobj, 'fmddropped') ) {
		$table = $(fmdc.selection.selectedobj).parents('.fmcontainer_block_content');
	}
	console.debug('$table='+$table);
	if ($table && fmdf_hasClass($table, 'fmcontainer_block_content')) {
		console.debug('$table class='+$table.attr('class'));
		$table.append(fmdc.trrow0);
		return $table.find(".fmdtr:last");
	}
	return null;
}

//Append row to container
function fmdf_fmcontainer_block_appendrow(id) {
	if (!fmdc.selection.selectedobj) {
		return;
	}
	var $table = null;
	if ( fmdf_hasClass(fmdc.selection.selectedobj, 'fmcontainer_block') ) {
		$table = $(fmdc.selection.selectedobj).find('table');
	} else if ( fmdf_hasClass(fmdc.selection.selectedobj, 'ui-droppable') || fmdf_hasClass(fmdc.selection.selectedobj, 'fmddropped') ) {
		$table = $(fmdc.selection.selectedobj).parents('.fmcontainer_block_content');
	}
	console.debug('$table='+$table);
	if ($table && fmdf_hasClass($table, 'fmcontainer_block_content')) {
		console.debug('$table class='+$table.attr('class'));
		//$table.find("tr:last").after(fmdc.trrow);
		//if($table.find('tr').length==0) {
			$table.append(fmdc.trrow);
		//}
		var td = $table.find(".fmdtr:last .fmdtd").droppable(fmdc.droppable_args);
		id ? td.attr("id", id) : td.attr("id", fmdf_uiid());
		return td;
	}
	return null;
}

//add row before selected
function fmdf_fmcontainer_block_addrowbefore() {
	var $tr = fmdf_getselectedTR();
	if ($tr) {
		$tr.before(fmdc.trrow);
		$tr.prev().find('.fmdtd').droppable(fmdc.droppable_args).attr("id", fmdf_uiid());
	}
}

//add row after selected
function fmdf_fmcontainer_block_addrowafter() {
	var $tr = fmdf_getselectedTR();
	if ($tr) {
		$tr.after(fmdc.trrow);
		$tr.next().find('.fmdtd').droppable(fmdc.droppable_args).attr("id", fmdf_uiid());
	}
}

//add column after selected
function fmdf_fmcontainer_block_addcolbefore() {
	var $td = fmdf_getselectedTD();
	if ($td) {
		if ($td.parent().children().length==fmdc.collimit) {
			dhtmlx.message(fmd_i18n_msg_collimit+fmdc.collimit);
		} else {
			$td.before(fmdc.tdcell);
			$td.prev().droppable(fmdc.droppable_args).attr("id", fmdf_uiid());
			fmdf_refreshTdWidth($td.parent());
		}
	}
}

//add column after selected
function fmdf_fmcontainer_block_addcolafter() {
	var $td = fmdf_getselectedTD();
	if ($td) {
		if ($td.parent().children().length==fmdc.collimit) {
			dhtmlx.message(fmd_i18n_msg_collimit+fmdc.collimit);
		} else {
			$td.after(fmdc.tdcell);
			$td.next().droppable(fmdc.droppable_args).attr("id", fmdf_uiid());
			fmdf_refreshTdWidth($td.parent());
		}
	}
}

//add column to a tr
function fmdf_fmcontainer_block_appendtd($tr, id, rowspan, colspan) {
	if ($tr.children().length==fmdc.collimit) {
		dhtmlx.message(fmd_i18n_msg_collimit+fmdc.collimit);
	} else {
		//$tr.append('<td class="fmdtd fmdselectable" id="'+id+'" rowspan="'+rowspan+'" colspan="'+colspan+'"></td>');
		$tr.append(fmdc.tdcell0);
		var $td = $tr.find('.fmdtd:last').droppable(fmdc.droppable_args)
			.attr("rowspan", rowspan || '1').attr("colspan", colspan || '1').attr("id", id);
		//rowspan && $td.attr("rowspan", rowspan);
		//colspan && $td.attr("colspan", colspan);
		fmdf_refreshTdWidth($tr);
		return $td;
	}
}

//get the row contains the selected object
function fmdf_getselectedTR() {
	var $tr = null;
	if ( fmdf_hasClass($(fmdc.selection.selectedobj).parent(), 'ui-droppable') ) {//element selected
		$tr = $(fmdc.selection.selectedobj).parent().parent();
	} else if ( fmdf_hasClass(fmdc.selection.selectedobj, 'ui-droppable') ) {//td selected
		$tr = $(fmdc.selection.selectedobj).parent();
		console.debug('td selected');
	}/*  else if (fmdf_hasClass($(fmdc.selection.selectedobj), 'fmcontainer_block_row')) {//tr selected
		$tr = $(fmdc.selection.selectedobj);
	} */
	return $tr;
}

//get the row contains the selected object
function fmdf_getselectedTD() {
	if (!fmdc.selection.selectedobj) return null;
	var $td = null;
	if ( fmdf_hasClass($(fmdc.selection.selectedobj).parent(), 'ui-droppable') ) {//element selected
		$td = $(fmdc.selection.selectedobj).parent();
	} else if ( fmdf_hasClass(fmdc.selection.selectedobj, 'ui-droppable') ) {//td selected
		$td = $(fmdc.selection.selectedobj);
	}
	return $td;
}

//reset td width by setting class
function fmdf_refreshTdWidth($tr) {
	console.debug('$tr.children().length='+$tr.children().length);
	if ($tr.children().length>0) {
		//get max total spans for all rows
		var maxspans = fmdf_getMaxCols($tr.parent());
		//set class
		$tr.parent().find('td').each(function () {
			var span = $(this).attr('colSpan');
			var width = parseInt(100/maxspans*(span==undefined ? 1 : parseInt(span)))+'%';
			console.debug('set td width='+width);
			$(this).css('width', width);
		});
	}
}

//get max cols of a table block
function fmdf_getMaxCols($table) {
	var maxspans = 0;
	$table.children().each(function (i, tr1) {
		var spans = 0;
		$(tr1).children().each(function (j, td1) {
			var span = $(td1).attr('colSpan');
			console.debug('colspan='+span);
			spans += span==undefined ? 1 : parseInt(span);
		});
		if (spans>maxspans) maxspans = spans;
	});
	console.debug('maxspans='+maxspans);
	return maxspans;
}

//check if the className exists on dom object
function fmdf_hasClass($obj, className) {
	//return $obj.hasClass(className);
	return $obj && $obj.is("."+className);
}

//get droppped element type
function fmdf_getElemType($obj) {
	var cls = $obj.attr('class');
	var idx = cls.indexOf('fmdelement_');
	cls = cls.substr(idx+11);
	if (cls.indexOf(' ')!=-1) {
		cls = cls.substring(0, cls.indexOf(' '));
	}
	console.debug("element class==="+cls+"===");
	return cls;
}

//select an dom object
function fmdf_select($obj) {
	fmdf_unselect();
	$($obj).addClass('fmdselected');
	console.debug($($obj).attr('class'));
	fmdc.selection.selectedobj = $obj;
	//set status bar
	fmdf_setselectedstatus($obj);
}

//select an dom object by id
function fmdf_selectById(id) {
	var $obj = $("#"+id);
	$obj.length && fmdf_select($obj);
}

//get selected object
function fmdf_getSelected() {
	return fmdc.selection.selectedobj;
}

//deselect object
function fmdf_unselect($obj) {
	var obj = $obj;
	console.debug($obj);
	if (!obj) {
		console.debug('fmdc.selection.selectedobj='+fmdc.selection.selectedobj);
		obj = fmdc.selection.selectedobj;
	}
	if (obj) {
		console.debug('remove class');
		$(obj).removeClass('fmdselected');
		fmdc.selection.selectedobj = null;
		//set status bar
		fmdc.statusbar.setText('');
		//clean properties data
		fmdpf_clear_elemprop();
	}
}

//on removed
function fmdf_onremove() {
	$('.fmdselected').removeClass('fmdselected');
	fmdc.selection.selectedobj = null;
	//set status bar
	fmdc.statusbar.setText('');
	//clean properties data
	fmdpf_clear_elemprop();
}

//set selected status
function fmdf_setselectedstatus($obj) {
	//init properties data
	var id1 = $obj.attr('id');
	if (id1 && !fmd.version.formdata.propconf[id1]) fmd.version.formdata.propconf[id1] = {};
	//status
	var status = '';//fmd_i18n_msg_curselected + ': ';
	if (fmdf_hasClass($obj, 'fmdcanvas_tabnavli')){
		//status += fmd_i18n_l_fmcontainer_tab + '   ' + $obj.find('a').html();
		//fmdc.cell_prop_tb.enableItem('fmd_cb_apply');//enable apply button
		fmdpf_showprop('layout', 'tab', $obj);
	} else if (fmdf_hasClass($obj, 'fmcontainer_block')) {
		//status += fmd_i18n_l_fmcontainer_block + '   ' + $obj.find('.fmcontainer_block_titlebar a b').text();
		//fmdc.cell_prop_tb.enableItem('fmd_cb_apply');//enable apply button
		fmdpf_showprop('layout', 'block', $obj);
	} else if (fmdf_hasClass($obj, 'ui-droppable')) {
		/*var cspan = $obj.attr('colSpan');
		var rspan = $obj.attr('rowSpan');
		status += fmd_i18n_l_fmcontainer_cell + 
			'   '+fmd_i18n_t_colspan+'='+ 
			(cspan==undefined?1:cspan) + 
			'   '+fmd_i18n_t_rowspan+'='+
			(rspan==undefined?1:rspan);*/
		//fmdc.cell_prop_tb.disableItem('fmd_cb_apply');//disable apply button
		fmdpf_showprop('layout', 'cell', $obj);
	} else if (fmdf_hasClass($obj, 'fmddropped')) {
		//status += fmd_i18n_l_elem;
		//fmdc.cell_prop_tb.enableItem('fmd_cb_apply');//enable apply button
		//show prop
		fmdpf_showprop('control', fmdf_getElemType($obj), $obj);
	} else {
		//fmdc.cell_prop_tb.disableItem('fmd_cb_apply');//disable apply button
	}
	//update status bar
	fmdc.statusbar.setText(status);
}

//find object and focus
function fmdf_findto(id1) {
	fmdc.popup_finddom.hide();
	var $obj = $('.fmdcanvas #'+id1);
	//alert($obj);
	if ($obj.length) {
		$obj.focus();
		$obj.effect("highlight", {}, 1000, function(){fmdf_select($obj);});
	} else {
		dhtmlx.message(fmd_i18n_msg_notfound);
	}
}

//remove selected object
function fmdf_removeselected() {
	if (fmdc.selection.selectedobj) {
		//check if parent need to be removed
		var $also = null;
		var $selectobjafter = null;
		if ( fmdf_hasClass(fmdc.selection.selectedobj, 'ui-droppable') ) {//remove td
			console.debug('==='+$(fmdc.selection.selectedobj).parent().children().length);
			if($(fmdc.selection.selectedobj).parent().children().length==1) {
				$also = $(fmdc.selection.selectedobj).parent();
			} else {
				fmdf_refreshTdWidth($(fmdc.selection.selectedobj).parent());//refresh td width
			}
		} else if ( fmdf_hasClass($(fmdc.selection.selectedobj).parent(), 'ui-droppable') ) {//remove element
			//just replace with p tag
			$(fmdc.selection.selectedobj).parent().append(fmdc.tipp);
			//$(fmdc.selection.selectedobj).parent().removeClass('ui-state-highlight');
			//select parent
			$selectobjafter = $(fmdc.selection.selectedobj).parent();
		} else if (fmdf_hasClass(fmdc.selection.selectedobj, 'fmdcanvas_tabnavli')) {
			fmdf_removeselectedtab();
			return;
		} else if (fmdf_hasClass(fmdc.selection.selectedobj, 'fmcontainer_block')) {
			fmdf_removeselectedcontainer();
			return;
		}
		//删除
		delete fmd.version.formdata.propconf[$(fmdc.selection.selectedobj).attr("id")];
		$(fmdc.selection.selectedobj).hide("fade",300).remove();
		//unselect
		fmdf_onremove();
		//remove parent also
		if ($also) {
			console.debug('parent tr also removed.');
			$also.remove();
		}
		//select some obj after remove
		if ($selectobjafter) {
			fmdf_select($selectobjafter);
		} else {
			//set status bar
			fmdc.statusbar.setText('');
		}
	}
}

//delete current tab
function fmdf_removeselectedtab() {
	var activetab = fmdc.tabs.find(".ui-tabs-active");
	if (activetab) {
		var tabcontent = $('#'+activetab.attr('aria-controls'));
		if (tabcontent.find('.fmform').children().length>0) {
			dhtmlx.message({
				type:"confirm",
	            ok:fmd_i18n_b_ok,
	            cancel:fmd_i18n_b_cancel,
				text: fmd_i18n_msg_deltabconfirm,
				callback: function(yes) {
					if (yes) {
						delete fmd.version.formdata.propconf[$(fmdc.selection.selectedobj).attr("id")];
						activetab.remove();
						tabcontent.remove();
						fmdc.tabs.tabs( "refresh" );
						fmdf_onremove();
					}
				}
			});
		} else {
			delete fmd.version.formdata.propconf[$(fmdc.selection.selectedobj).attr("id")];
			activetab.remove();
			tabcontent.remove();
			fmdc.tabs.tabs( "refresh" );
			fmdf_onremove();
		}
	}
}

//remove container
function fmdf_removeselectedcontainer() {
	if (fmdc.selection.selectedobj.find('.fmddropped').children().length>0) {
		dhtmlx.message({
			type:"confirm",
            ok:fmd_i18n_b_ok,
            cancel:fmd_i18n_b_cancel,
			text: fmd_i18n_msg_delcontconfirm,
			callback: function(yes) {
				if (yes) {
					//删除
					delete fmd.version.formdata.propconf[$(fmdc.selection.selectedobj).attr("id")];
					$(fmdc.selection.selectedobj).remove();
					//unselect
					fmdf_onremove();
				}
			}
		});
	} else {
		//删除
		delete fmd.version.formdata.propconf[$(fmdc.selection.selectedobj).attr("id")];
		$(fmdc.selection.selectedobj).remove();
		//unselect
		fmdf_onremove();
	}
}

//function for init layout
function fmdf_initLayout() {
	fmd.body_layout = new dhtmlXLayoutObject('fmdmaindiv', '1C', dhx_skin);
	
	fmd.body_layout.progressOn();
	
	fmd.body_layout.attachEvent("onResizeFinish", function(){
		
	});
	
	//form designer layout
	fmdf_initDesignerLayout(fmd.body_layout);
	
}

//init designer layout
function fmdf_initDesignerLayout(body_layout) {
	
	var fmd_layout = body_layout.cells('a').attachLayout('1C', dhx_skin);

	//main tool bar
	var fmd_tb = fmd_layout.attachToolbar();
	fmd_tb.setIconSize(24);
	fmd_tb.setIconsPath(fmdc.imagepath);
	
	fmd_tb.addButton('fmd_mcb_close',0,fmd_i18n_b_close,"close.png","close_dis.png");
	!fmd.isEditor && fmd_tb.addText('fmd_mcb_t0',0,'<span class="fmdcanvastip"><img style="vertical-align:middle;" src="'+fmdc.imagepath+'/readonly1.png"/>'+fmd_i18n_msg_readonly+'</span>');
	fmd_tb.addText('fmd_mcb_t1',0,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	fmd_tb.addSeparator('fmd_mcb_sp1',0);
	fmd_tb.addButtonTwoState('fmd_mcb_showadvanced', 0, fmd_i18n_b_showadvanced_dis, "showadvanced_dis.png");
	fmd.isEditor && fmd_tb.addButton('fmd_mcb_console',0,fmd_i18n_b_console,"consoleinfo.png","consoleinfo_dis.png");
	fmd_tb.addText('fmd_mcb_t2',0,'&nbsp;&nbsp;');
	fmd_tb.addSeparator('fmd_mcb_sp2',0);
	fmd_tb.addButton('fmd_mcb_restore',0,fmd_i18n_b_restore,"restore.png","restore_dis.png");
	fmd_tb.addButton('fmd_mcb_reset',0,fmd_i18n_b_reset,"reset.png","reset_dis.png");
	fmd_tb.addButton('fmd_mcb_preview',0,fmd_i18n_b_preview,"preview.gif","preview_dis.gif");
	fmd_tb.addButton('fmd_mcb_save',0,fmd_i18n_b_save,"save.gif","save_dis.gif");
	fmd_tb.addSpacer(fmd.isEditor ? 'fmd_mcb_t1':'fmd_mcb_t0');
	
	if (!fmd.isEditor) {
		fmd_tb.hideItem('fmd_mcb_save');
		fmd_tb.hideItem('fmd_mcb_reset');
		fmd_tb.hideItem('fmd_mcb_restore');
	}
	
	//main tool bar events
	fmd_tb.attachEvent("onClick", function(tbid){
		if ("fmd_mcb_close"==tbid) {
			if (fmdc.unsavedchange) {
				dhtmlx.message({
					type:"confirm",
		            ok:fmd_i18n_b_ok,
		            cancel:fmd_i18n_b_cancel,
					text: fmd_i18n_msg_unsavedchange,
					callback: function(yes) {
						if (yes) {
							closeWin();
						}
					}
				});
			} else {
				closeWin();
			}
			
		} else if ("fmd_mcb_save"==tbid) {
			fmdf_save();
		} else if ("fmd_mcb_preview"==tbid) {
			fmd_preview();
		} else if ("fmd_mcb_reset"==tbid) {
			if (fmdc.unsavedchange) {
				dhtmlx.message({
					type:"confirm",
		            ok:fmd_i18n_b_ok,
		            cancel:fmd_i18n_b_cancel,
					text: fmd_i18n_msg_unsavedchange,
					callback: function(yes) {
						if (yes) {
							fmdf_cleanCanvas();
							if (fmd.form.formid && fmd.version.formdata) {
								fmdf_loadSavedData();
							} else {
								fmdf_resetVars();
							}
						}
					}
				});
			} else {
				fmdf_cleanCanvas();
				if (fmd.form.formid && fmd.version.formdata) {
					fmdf_loadSavedData();
				} else {
					fmdf_resetVars();
				}
			}
		} else if ("fmd_mcb_restore"==tbid) {
			fmdf_cleanCanvas();
			//load history
			fmdf_loadSavedData();
		}
	});
	
	//cells
	var a = fmd_layout.cells('a');
	a.setText(fmd_i18n_t_formconfig);
	a.hideHeader();
	
	//tabbar
	fmd.tabbar = a.attachTabbar();
	fmd.tabbar.setMargin(2);
	
	//
	fmd_tb.attachEvent("onStateChange", function(tbid, state){
		if ('fmd_mcb_showadvanced'==tbid) {
			if (state) {
				fmd.tabbar.showTab('fmdtab_permission');
				fmd.tabbar.showTab('fmdtab_ref');
				fmd.tabbar.showTab('fmdtab_script');
				fmd_tb.setItemImage('fmd_mcb_showadvanced', "showadvanced.png");
				fmd_tb.setItemText('fmd_mcb_showadvanced', fmd_i18n_b_showadvanced);
			} else {
				fmd.tabbar.hideTab('fmdtab_permission');
				fmd.tabbar.hideTab('fmdtab_ref');
				fmd.tabbar.hideTab('fmdtab_script');
				fmd_tb.setItemImage('fmd_mcb_showadvanced', "showadvanced_dis.png");
				fmd_tb.setItemText('fmd_mcb_showadvanced', fmd_i18n_b_showadvanced_dis);
			}
		}
	});
	
	//tab page -- basic info
	fmdf_initBasicLayout();
	
	
	//tab page canvas
	fmdf_initCanvasLayout();
	
	
	//tab page -- feature
	//fmdf_initFeatureLayout();

	
	//tab page -- permission
	fmdf_initPermissionLayout();
	
	
	//tab page -- reference
	fmdf_initReferenceLayout();


	//tab page -- script
	fmdf_initScriptLayout();
}

//init basic info tab page
function fmdf_initBasicLayout() {
	fmd.tabbar.addTab('fmdtab_basic', '<img src="'+ctxpath+'/images/info.png" align="absmiddle"/>&nbsp;'+fmd_i18n_t_formbaisc,'');
	var fmdtab_basic = fmd.tabbar.cells('fmdtab_basic');
	fmd.tabbar.setTabActive('fmdtab_basic');
	//alert('fmd.form='+JSON.stringify(fmd.form));
	var fmdtab_basic_str = [
	   		{ type:"fieldset" , name:"fieldset_formbasic", label:fmd_i18n_l_fm, list:[
	   		{ type:"input" , name:"fi_basic_type", label:fmd_i18n_l_fmtype, value:fmd_i18n.enu.fmtype[fmd.form.formtype], disabled:true, labelWidth:100, inputWidth:300},
	   		{ type:"input" , name:"fi_basic_name", label:fmd_i18n_l_fmname, labelWidth:100, inputWidth:300, required:true},
	   		{ type:"input" , name:"fi_basic_desc", label:fmd_i18n_l_fmdesc, rows:"3", labelWidth:100, inputWidth:300}
	   		]  },
	   		{ type:"fieldset" , name:"fieldset_versionbasic", hidden:true, label:fmd_i18n_l_vr, list:[
	   		{ type:"input" , name:"fi_basic_vname", label:fmd_i18n_l_vrname, labelWidth:100, inputWidth:300, required:true},
	   		{ type:"input" , name:"fi_basic_vdesc", label:fmd_i18n_l_vrdesc, rows:"3", labelWidth:100, inputWidth:300}
	   		]  }
	   	];
	fmdc.form_basic = fmdtab_basic.attachForm(fmdtab_basic_str);
}

//init canvas layout
function fmdf_initCanvasLayout() {
	//tab page -- designer canvas
	fmd.tabbar.addTab('fmdtab_canvas', '<img src="'+ctxpath+'/images/canvas.png" align="absmiddle"/>&nbsp;'+fmd_i18n_t_formdesign,'');
	var fmdtab_canvas = fmd.tabbar.cells('fmdtab_canvas');
	var layout_canvas = fmdtab_canvas.attachLayout('2U', dhx_skin);
	var cell_canvas = layout_canvas.cells('a');
	cell_canvas.setText(fmd_i18n_t_formcanvas);
	cell_canvas.hideHeader();
	fmdc.cell_prop = layout_canvas.cells('b');
	fmdc.cell_prop.setWidth(fmdc.cell_prop_width);
	fmdc.cell_prop.setText('<img src="'+fmdc.imagepath+'fmd_prop.gif"></img>'+fmd_i18n_t_prop);
	//add toolbar for propgrid
	if (fmd.isEditor) {
		fmdc.cell_prop_tb = fmdc.cell_prop.attachToolbar();
		fmdc.cell_prop_tb.setIconsPath(fmdc.imagepath);
		fmdc.cell_prop_tb.addButton('fmd_cb_apply',0,fmd_i18n_b_apply,"apply.gif","apply_dis.gif");
		fmdc.cell_prop_tb.attachEvent("onClick", function(tbid){//do nothing,only used for trigger onChange events of form
			if(tbid=='fmd_cb_apply'){
				fmdpf_apply();
			}
		});
	}
	fmdc.cell_prop.collapse();
	
	//canvas status bar
	fmdc.statusbar = cell_canvas.attachStatusBar();
	
	//canvas toolbar
	var fmd_canvas_tb = cell_canvas.attachToolbar();
	fmd_canvas_tb.setIconsPath(fmdc.imagepath);
	
	fmd_canvas_tb.addButtonSelect('fmd_cbl_settings',0,fmd_i18n_b_settings,[
   			 ['fmd_cb_fontsize','obj',fmd_i18n_b_fontsize,'fontsize.gif', 'fontsize_dis.gif'],
   			 ['fmd_cb_canvassize','obj',fmd_i18n_b_canvassize,'canvassize.gif', 'canvassize_dis.gif']
			],
	        "settings.gif",'settings_dis.gif',"disabled",true);
	fmd_canvas_tb.addSeparator('fmd_cb_sp2',0);
	fmd_canvas_tb.addButton('fmd_cb_span',0,fmd_i18n_b_span,"changespan.gif","changespan_dis.gif");
	fmd_canvas_tb.addSeparator('fmd_cb_sp1',0);
	fmd_canvas_tb.addButton('fmd_cb_parent',0,fmd_i18n_b_goparent,"goparent.png","goparent_dis.png");
	fmd_canvas_tb.addButton('fmd_cb_finddom',0,fmd_i18n_b_finddom,"find.gif","find_dis.gif");
	//fmd_canvas_tb.addButton('fmd_cb_deltab',0,fmd_i18n_b_deltab,"deltab.gif","deltab_dis.gif");
	fmd_canvas_tb.addButton('fmd_cb_del',0,fmd_i18n_b_del,"delete1.gif","delete1_dis.gif");
	fmd_canvas_tb.addButtonSelect('fmd_cbl_new',0,fmd_i18n_b_newl,
			[['fmd_cb_newtab','obj',fmd_i18n_b_newtab, 'newtab.gif', 'newtab_dis.gif'],
			 ['fmd_cb_newcont','obj',fmd_i18n_b_newcont, 'newcont.gif', 'newcont_dis.gif'],
			 ['fmd_cb_newrow','obj',fmd_i18n_b_newrow, 'newrow.gif', 'newrow_dis.gif'],
			 ['fmd_cb_newrowbefore','obj',fmd_i18n_b_newrowbefore, 'newrowbefore.gif', 'newrowbefore_dis.gif'],
			 ['fmd_cb_newrowafter','obj',fmd_i18n_b_newrowafter, 'newrowafter.gif', 'newrowafter_dis.gif'],
			 ['fmd_cb_newcolbefore','obj',fmd_i18n_b_newcolbefore, 'newcolbefore.gif', 'newcolbefore_dis.gif'],
			 ['fmd_cb_newcolafter','obj',fmd_i18n_b_newcolafter, 'newcolafter.gif', 'newcolafter_dis.gif']
			],
			'new1.gif','new1_dis.gif',"disabled",true);
	
	if (!fmd.isEditor) {
		fmd_canvas_tb.hideItem('fmd_cbl_new');
		fmd_canvas_tb.hideItem('fmd_cb_del');
		fmd_canvas_tb.hideItem('fmd_cb_span');
		fmd_canvas_tb.hideItem('fmd_cbl_settings');
		fmd_canvas_tb.hideItem('fmd_cb_sp2');
	}

	//canvas toobr events
	fmd_canvas_tb.attachEvent("onClick", function(tbid){
		if ('fmd_cb_newtab'==tbid) {
			
			fmdf_addtab(fmd_i18n_untitled, "business");
			
			/*var win_newtab = fm_createCenterWindow('win_newtab', fmd_i18n_t_newtab, 300, 200);
			var newtabfmjs = [
			          		{ type:"settings" , labelWidth:270, inputWidth:270, position:"absolute"  },
			        		{ type:"combo" , name:"fi_newtab_type", label:fmd_i18n_t_type, labelWidth:250, labelLeft:5, labelTop:5, inputLeft:5, inputTop:20, required:true, readonly:true, 
			        			options:[
                                         {text: fmd_i18n_sel_business, value: "business"},
                                         {text: fmd_i18n_sel_attachment, value: "attachment"},
                                         {text: fmd_i18n_sel_history, value: "history"},
                                         {text: fmd_i18n_sel_flowchart, value: "flowchart"}
                                ]},
                            //{ type:"input" , name:"fi_newtab_title", label:fmd_i18n_t_title, labelLeft:5, labelTop:50, inputLeft:5, inputTop:70},
			        		{ type:"button" , name:"fb_newtab_ok", value:fmd_i18n_b_ok, width:100, inputWidth:100, inputLeft:20, inputTop:120  },
			        		{ type:"button" , name:"fb_newtab_cancel", value:fmd_i18n_b_cancel, width:100, inputWidth:100, inputLeft:160, inputTop:120  }
			        	];
			var fmnewtab1 = win_newtab.attachForm(newtabfmjs);
			fmnewtab1.attachEvent("onButtonClick", function(btid){
				if (btid=='fb_newtab_ok') {
					if (!fmnewtab1.validate()) {
						return;
					}
					var tabtype = fmnewtab1.getItemValue('fi_newtab_type');
					//var tabtitle = 'business'==tabtype ? fmnewtab1.getItemValue('fi_newtab_title') : fmnewtab1.getCombo('fi_newtab_type').getSelectedText();
					var tabtitle = 'business'==tabtype ? fmd_i18n_tab_title : fmnewtab1.getCombo('fi_newtab_type').getSelectedText();
					fmdf_addtab(tabtitle, tabtype);
					fmnewtab1.unload();
					win_newtab.close();
				} else if (btid=='fb_newtab_cancel') {
					fmnewtab1.unload();
					win_newtab.close();
				}
			});
			fmnewtab1.attachEvent("onChange", function(iid, newvalue){
				if (iid=='fi_newtab_type') {
					if ('business'==newvalue) {
						fmnewtab1.showItem('fi_newtab_title');
						fmnewtab1.setRequired('fi_newtab_title', true);
						fmnewtab1.setItemFocus('fi_newtab_title');
					} else {
						fmnewtab1.hideItem('fi_newtab_title');
						fmnewtab1.setRequired('fi_newtab_title', false);
					}
				}
			});*/
			//fmnewtab1.setItemFocus('fi_newtab_title');
		} else if ('fmd_cb_newcont'==tbid) {
			fmdf_fmcontainer_block_addcontainer("table");
		} else if ('fmd_cb_newrow'==tbid) {
			fmdf_fmcontainer_block_appendrow();
		} else if ('fmd_cb_newrowbefore'==tbid) {
			fmdf_fmcontainer_block_addrowbefore();
		} else if ('fmd_cb_newrowafter'==tbid) {
			fmdf_fmcontainer_block_addrowafter();
		} else if ('fmd_cb_newcolbefore'==tbid) {
			fmdf_fmcontainer_block_addcolbefore();
		} else if ('fmd_cb_newcolafter'==tbid) {
			fmdf_fmcontainer_block_addcolafter();
		} else if ('fmd_cb_del'==tbid) {
			fmdf_removeselected();
		}/* else if ('fmd_cb_deltab'==tbid) {
			fmdf_removeselectedtab();
		}*/ else if ('fmd_cb_finddom'==tbid) {
			if (!fmdc.popup_finddom) {
				fmdc.popup_finddom = new dhtmlXPopup({
		            toolbar: fmd_canvas_tb,
		            id: "fmd_cb_finddom",
		            mode:"bottom"
		        });
				var form1 = fmdc.popup_finddom.attachForm([{type:"input",label:"id", name: "findid"}]);
				form1.attachEvent("onEnter", function(){
					var id1 = form1.getItemValue("findid");
					if (id1!=null && $.trim(id1)!='') {
						fmdf_findto(id1);
						form1.setItemValue("findid", '');
					}
				});
				fmdc.popup_finddom.attachEvent('onShow',function(){
					form1.setItemFocus("findid");
				});
				/*fmdc.popup_finddom.attachEvent('onBlur',function(){
					this.hide();
				});*/
				//fmdc.popup_finddom.attachHTML('aaa');
			}
			//fmdc.popup_finddom.show("fmd_cb_finddom");
		} else if(tbid=='fmd_cb_parent'){
			if (fmdf_getSelected()) {
				var p = $(fmdf_getSelected()).parents(".fmdselectable:first");
				if (p.length) {
					fmdf_select(p);
				} else {
					//go current tab
					if (!fmdf_hasClass($(fmdf_getSelected()), "ui-tabs-active")) {
						var activetab = fmdc.tabs.find(".ui-tabs-active");
						fmdf_select(activetab);
					}
				}
			}
		} else if ('fmd_cb_span'==tbid) {
			
			var $td = fmdf_getselectedTD();
			if ($td) {
				var win_changecell = fm_createCenterWindow('win_changecell', fmd_i18n_t_changecell, 300, 200);
				var cspan = $td.attr('colSpan');
				var rspan = $td.attr('rowSpan');
				var changecellfmjs = [
				          		{ type:"settings" , labelWidth:270, inputWidth:270, position:"absolute"  },
	                            { type:"input" , name:"fi_changecell_colspan", value:cspan==undefined?1:cspan, label:fmd_i18n_t_colspan, labelLeft:5, labelTop:5, inputLeft:5, inputTop:20, required:true, validate:"ValidInteger"},
	                            { type:"input" , name:"fi_changecell_rowspan", value:rspan==undefined?1:rspan, label:fmd_i18n_t_rowspan, labelLeft:5, labelTop:50, inputLeft:5, inputTop:70, required:true, validate:"ValidInteger"},
				        		{ type:"button" , name:"fb_changecell_ok", value:fmd_i18n_b_ok, width:100, inputWidth:100, inputLeft:20, inputTop:120  },
				        		{ type:"button" , name:"fb_changecell_cancel", value:fmd_i18n_b_cancel, width:100, inputWidth:100, inputLeft:160, inputTop:120  }
				        	];
				var fmchangecell1 = win_changecell.attachForm(changecellfmjs);
				fmchangecell1.attachEvent("onButtonClick", function(btid){
					if (btid=='fb_changecell_ok') {
						if (!fmchangecell1.validate()) {
							return;
						}
						var newcspan = fmchangecell1.getItemValue('fi_changecell_colspan');
						if (newcspan > fmdc.collimit) {
							dhtmlx.message(fmd_i18n_msg_colspanlimit + fmdc.collimit);
							return;
						}
						$td.attr('colSpan', newcspan);
						$td.attr('rowSpan', fmchangecell1.getItemValue('fi_changecell_rowspan'));
						//set status bar
						fmdf_select($td);
						fmchangecell1.unload();
						win_changecell.close();
					} else if (btid=='fb_changecell_cancel') {
						fmchangecell1.unload();
						win_changecell.close();
					}
				});
				fmchangecell1.setItemFocus('fi_changecell_colspan');
			}
			
		} else if ('fmd_cb_canvassize'==tbid) {
			var win_canvassize = fm_createCenterWindow('win_canvassize', fmd_i18n_t_canvassize, 300, 200);
			var canvassizefmjs = [
			          		{ type:"settings" , labelWidth:270, inputWidth:270, position:"absolute"  },
                            { type:"input" , name:"fi_canvassize_widthem", value:fmdc.canvas_size_widthem, label:fmd_i18n_t_widthem, labelLeft:5, labelTop:5, inputLeft:5, inputTop:20, required:true, validate:"ValidInteger"},
			        		{ type:"button" , name:"fb_canvassize_ok", value:fmd_i18n_b_ok, width:100, inputWidth:100, inputLeft:20, inputTop:120  },
			        		{ type:"button" , name:"fb_canvassize_cancel", value:fmd_i18n_b_cancel, width:100, inputWidth:100, inputLeft:160, inputTop:120  }
			        	];
			var fmcanvassize1 = win_canvassize.attachForm(canvassizefmjs);
			fmcanvassize1.attachEvent("onButtonClick", function(btid){
				if (btid=='fb_canvassize_ok') {
					if (!fmcanvassize1.validate()) {
						return;
					}
					//TODO
					console.debug('fmdcanvas before change width is '+$('.fmdcanvas').css('width'));
					fmdc.canvas_size_widthem = fmcanvassize1.getItemValue('fi_canvassize_widthem');
					$('.fmdcanvas').css('width', fmdc.canvas_size_widthem+'em');
					console.debug('fmdcanvas after change width is '+$('.fmdcanvas').css('width'));
					fmcanvassize1.unload();
					win_canvassize.close();
				} else if (btid=='fb_canvassize_cancel') {
					fmcanvassize1.unload();
					win_canvassize.close();
				}
			});
			fmcanvassize1.setItemFocus('fi_canvassize_widthem');
		} else if ('fmd_cb_fontsize'==tbid) {
			var win_fontsize = fm_createCenterWindow('win_fontsize', fmd_i18n_t_fontsize, 300, 200);
			var fontsizefmjs = [
			          		{ type:"settings" , labelWidth:270, inputWidth:270, position:"absolute"  },
                            { type:"input" , name:"fi_fontsize_px", value:fmdc.fontsize, label:fmd_i18n_t_fontsize, labelLeft:5, labelTop:5, inputLeft:5, inputTop:20, required:true, validate:"ValidInteger"},
			        		{ type:"button" , name:"fb_fontsize_ok", value:fmd_i18n_b_ok, width:100, inputWidth:100, inputLeft:20, inputTop:120  },
			        		{ type:"button" , name:"fb_fontsize_cancel", value:fmd_i18n_b_cancel, width:100, inputWidth:100, inputLeft:160, inputTop:120  }
			        	];
			var fmfontsize1 = win_fontsize.attachForm(fontsizefmjs);
			fmfontsize1.attachEvent("onButtonClick", function(btid){
				if (btid=='fb_fontsize_ok') {
					if (!fmfontsize1.validate()) {
						return;
					}
					//TODO
					fmdc.fontsize = fmfontsize1.getItemValue('fi_fontsize_px');
					$('body').css('font-size', fmdc.fontsize+'px');
					console.debug('font size changed to '+$('body').css('font-size'));
					fmfontsize1.unload();
					win_fontsize.close();
				} else if (btid=='fb_fontsize_cancel') {
					fmfontsize1.unload();
					win_fontsize.close();
				}
			});
			fmfontsize1.setItemFocus('fi_fontsize_px');
		}
	});
	
	//Availabel elements
	fmdf_initCanvas(layout_canvas);
}

//init elements
function fmdf_initCanvas(layout_canvas) {
	var cell_canvas = layout_canvas.cells('a');
	cell_canvas.attachHTMLString('<div class="fmdelementlistwrapper"><div class="fmdelementlist"></div></div><div class="fmdcanvaswrapper"><div id="fmdcanvas" class="fmdcanvas '+fmdc.theme+'"><ul class="fmdcanvas_tabnav"></ul></div></div>');
	//add all elements
	//construct element li list for dragging
	var elemliststr = '<div class="fmdelementlistacc">';
	//basic
	var ul_basic = '<ul>';
	//composite
	var ul_composite = '<ul>';
	//extended
	var ul_extended = '<ul>';
	for (var c in fmdmeta_prop.control) {
		//console.log(c+'==');
		var icon = fmdmeta_prop.control[c].icon || 'elem_default.png';
		fmdmeta_prop.control[c].group=="basic" && (ul_basic += '<li><a href="" class="fmdraggable element-tag-'+c+'" onclick="return false;"><img src="'+ctxpath+'/images/designer/modules/'+icon+'"/>'+fmdmeta_prop.control[c].i18ntype+'</a></li>');
		fmdmeta_prop.control[c].group=="composite" && (ul_composite += '<li><a href="" class="fmdraggable element-tag-'+c+'" onclick="return false;"><img src="'+ctxpath+'/images/designer/modules/'+icon+'"/>'+fmdmeta_prop.control[c].i18ntype+'</a></li>');
		fmdmeta_prop.control[c].group=="extended" && (ul_extended += '<li><a href="" class="fmdraggable element-tag-'+c+'" onclick="return false;"><img src="'+ctxpath+'/images/designer/modules/'+icon+'"/>'+fmdmeta_prop.control[c].i18ntype+'</a></li>');
	}
	ul_basic += '</ul>';
	ul_composite += '</ul>';
	ul_extended += '</ul>';
	elemliststr += '<h4>'+fmd_i18n_l_elembasic+'</h4><div>'+ul_basic+'</div>';
	elemliststr += '<h4>'+fmd_i18n_l_elemcomposite+'</h4><div>'+ul_composite+'</div>';
	elemliststr += '<h4>'+fmd_i18n_l_elemextended+'</h4><div>'+ul_extended+'</div>';
	elemliststr += '</div>';
	$('.fmdelementlist').append(elemliststr);
	$(function() {
		$( ".fmdelementlistacc" ).accordion({
			heightStyle: "fill"
		});
	});
	//draggable
	$( ".fmdelementlist ul li a" ).draggable(fmdc.draggable_args);
	
	//add resize event to layout_canvas
	layout_canvas.attachEvent("onResizeFinish", function(){
		$( ".fmdelementlistacc" ).accordion("refresh");
	});
	
	//bind change event
	$('.fmdcanvas').bind('DOMNodeInserted DOMNodeRemoved', function() { 
		fmdc.unsavedchange = true;
	});
	
	//hide for readonly
	!fmd.isEditor && $(".fmdelementlistwrapper").hide();
}

//init feature tab page
function fmdf_initFeatureLayout() {
	fmd.tabbar.addTab('fmdtab_feature',fmd_i18n_t_formfeature,'');
	var fmdtab_features = fmd.tabbar.cells('fmdtab_feature');
}

//init permission tab page
function fmdf_initPermissionLayout() {
	fmd.tabbar.addTab('fmdtab_permission', '<img src="'+ctxpath+'/images/permission.png" align="absmiddle"/>&nbsp;'+fmd_i18n_t_formpermission,'');
	var fmdtab_permission = fmd.tabbar.cells('fmdtab_permission');
	fmd.tabbar.hideTab('fmdtab_permission');
}

//init reference tab page
function fmdf_initReferenceLayout() {
	fmd.tabbar.addTab('fmdtab_ref', '<img src="'+ctxpath+'/images/ref.png" align="absmiddle"/>&nbsp;'+fmd_i18n_t_formref,'');
	var fmdtab_ref = fmd.tabbar.cells('fmdtab_ref');
	/*var str = [
		{ type:"input" , name:"fmd_fi_ref", label:fmd_i18n_l_headerref, rows:"30", inputWidth:600, offsetLeft:"20", position:"label-top"}
	];
	var form_ref = fmdtab_ref.attachForm(str);*/
	var div_refscript = document.createElement("div");
	div_refscript.id = "editor_refscript";
	fmdtab_ref.attachObject(div_refscript);
	
	if (!fmdc.editor_refscript) {
		fmdc.editor_refscript = ace.edit("editor_refscript");
		fmdc.editor_refscript.setTheme("ace/theme/tomorrow");
		fmdc.editor_refscript.getSession().setMode("ace/mode/html");
		fmdc.editor_refscript.setValue(fmd.version.formdata.refscript);
		!fmd.isEditor && fmdc.editor_refscript.setReadOnly(true);
	}
	
	fmd.tabbar.hideTab('fmdtab_ref');
}

//init script tab page
function fmdf_initScriptLayout() {
	fmd.tabbar.addTab('fmdtab_script', '<img src="'+ctxpath+'/images/script.png" align="absmiddle"/>&nbsp;'+fmd_i18n_t_formscript,'');
	var fmdtab_script = fmd.tabbar.cells('fmdtab_script');
	var accordion_script = fmdtab_script.attachAccordion();
	
	var panel_headerscript = accordion_script.addItem('panel_headerscript',fmd_i18n_l_headerscript);
	var div_headerscript = document.createElement("div");
	div_headerscript.id = "editor_headerscript";
	panel_headerscript.attachObject(div_headerscript);
	div_headerscript.className = "ace_editor";
	
	var panel_bodyscript = accordion_script.addItem('panel_bodyscript', fmd_i18n_l_bodyscript);
	var div_bodyscript = document.createElement("div");
	div_bodyscript.id = "editor_bodyscript";
	panel_bodyscript.attachObject(div_bodyscript);
	div_bodyscript.className = "ace_editor";
	
	//resize editor
	accordion_script.attachEvent("onActive", function(aid) {
		if (aid=='panel_headerscript') {
			fmdc.editor_headerscript.resize();
		} else if (aid=='panel_bodyscript') {
			fmdc.editor_bodyscript.resize();
		}
	});
	
	panel_bodyscript.open();
	fmdf_initBodyScript();
	panel_headerscript.open();
	fmdf_initHeaderScript();
	//fmdf_initHeaderScript();
	fmd.tabbar.hideTab('fmdtab_script');
}

//init header script editor
function fmdf_initHeaderScript() {
	if (!fmdc.editor_headerscript) {
		fmdc.editor_headerscript = ace.edit("editor_headerscript");
		fmdc.editor_headerscript.setTheme("ace/theme/tomorrow");
		fmdc.editor_headerscript.getSession().setMode("ace/mode/javascript");
		fmdc.editor_headerscript.setValue(fmd.version.formdata.headerscript);
		!fmd.isEditor && fmdc.editor_headerscript.setReadOnly(true);
	}
}

//init body script editor
function fmdf_initBodyScript() {
	if (!fmdc.editor_bodyscript) {
		fmdc.editor_bodyscript = ace.edit("editor_bodyscript");
		fmdc.editor_bodyscript.setTheme("ace/theme/tomorrow");
		fmdc.editor_bodyscript.getSession().setMode("ace/mode/javascript");
		fmdc.editor_bodyscript.setValue(fmd.version.formdata.bodyscript);
		!fmd.isEditor && fmdc.editor_bodyscript.setReadOnly(true);
	}
}

//enable/disable apply button in properties form
function fmdf_enableApply(enable) {
	enable ? fmdc.cell_prop_tb.enableItem('fmd_cb_apply'):
		fmdc.cell_prop_tb.disableItem('fmd_cb_apply');
}

//init for creating form
function fmdf_initCreate() {
	fmdf_resetVars();
	fmdf_cleanCanvas();
}

//init for updating form
function fmdf_initUpdate(formid) {
	//reset
	fmdf_resetVars();
	fmdf_cleanCanvas();
	//load form data
	
}

//get form configure
function fmdf_getFormConf() {
	var rtn = {"tabs":[]};
	//iterate tab
	$(".fmdcanvas .fmdcanvas_tabnav .fmdcanvas_tabnavli").each(function(idxtab, elemtab) {
		//validate
		fmdf_select($(elemtab));
		if (!fmdpf_apply()) {
			return null;
		}
		var tabid = $(elemtab).attr("id");
		var tabtitle = $(elemtab).find('a').html();
		var tabtype = $(elemtab).attr("tabtype");
		//alert("tabid="+tabid + " bodyid="+"#fmcontainer_tabbody_"+tabid.substr(16));
		var tabbody = $("#fmcontainer_tabbody_"+tabid.substr(16));
		//iterate block
		var itemsblock = [];
		tabbody.find(".fmcontainer_block").each(function(idxblock, elemblock) {
			//validate
			fmdf_select($(elemblock));
			if (!fmdpf_apply()) {
				return false;
			}
			//max spans
			var maxspans = fmdf_getMaxCols($(elemblock).find("table tbody"));
			//iterate row
			var itemsrow = [];
			if ($(elemblock).attr("fmdpattern")=='table') {//user html table pattern
				
				$(elemblock).find(".fmdtr").each(function(idxrow, elemrow) {
					//iterate cell
					var itemscell = [];
					$(elemrow).find(".fmdtd").each(function(idxcell, elemcell) {
						//validate
						fmdf_select($(elemcell));
						if (!fmdpf_apply()) {
							return false;
						}
						//iterate elements
						var itemselem = [];
						$(elemcell).children(".fmddropped").each(function(idxelem, elemelem) {
							//validate
							fmdf_select($(elemelem));
							if (!fmdpf_apply()) {
								return false;
							}
							var elemtype = fmdf_getElemType($(elemelem));
							itemselem.push({"id" : $(elemelem).attr("id"), "compType" : "control", "type" : elemtype});
						});
						//break cell each if validation failed
						if (!isEmpty(fmdc.proptemp.vfailure)) return false;
						itemscell.push({"id" : $(elemcell).attr("id"), "compType" : "layout", 
							"type" : "cell", "maxspans" : maxspans,
							"colspan" : ($(elemcell).attr("colspan") || "1" ),
							"rowspan" : ($(elemcell).attr("rowspan") || "1" ),
							"items" : itemselem});
					});
					//break row each if validation failed
					if (!isEmpty(fmdc.proptemp.vfailure)) return false;
					itemsrow.push({"id" : $(elemrow).attr("id"), "compType" : "layout", "type" : "tr", "items" : itemscell});
				});
				//break block each if validation failed
				if (!isEmpty(fmdc.proptemp.vfailure)) return false;
				
			} else if ($(elemblock).attr("fmdpattern")=='div12') {//use html div(12max in one row) pattern
				
			}
			//break tab each if validation failed
			if (!isEmpty(fmdc.proptemp.vfailure)) return false;
			itemsblock.push({"id" : $(elemblock).attr("id"), "compType" : "layout", "type" : "block", "pattern" : $(elemblock).attr("fmdpattern"), "items" : itemsrow});
		});
		//alert("pushing="+JSON.stringify({"id" : tabid, "compType" : "layout", "type" : "tab", "items" : itemsblock}));
		rtn.tabs.push({"id" : tabid, "compType" : "layout", "type" : "tab", 
			"tabtype" : tabtype, "title" : tabtitle, "items" : itemsblock});
	});
	if (isEmpty(fmdc.proptemp.vfailure)) {
		return rtn;
	} else {//return null if validation failed
		fmd.tabbar.setTabActive('fmdtab_canvas');
		return null;
	}
}

//load form config
function fmdf_loadFormConf() {
	//set form
	fmdc.form_basic.setItemValue('fi_basic_type', fmd_i18n.enu.fmtype[fmd.form.formtype]);
	fmdc.form_basic.setItemValue('fi_basic_name', fmd.form.formname);
	fmdc.form_basic.setItemValue('fi_basic_desc', fmd.form.formdesc);
	if (fmd.version) {
		if (fmd.version.versionid=='0') {//current version
			fmdc.form_basic.setItemValue('fi_basic_vname', fmd_i18n_curver);
			fmdc.form_basic.disableItem('fi_basic_vname');
		} else {
			fmdc.form_basic.setItemValue('fi_basic_vname', fmd.version.versionname);
		}
		fmdc.form_basic.setItemValue('fi_basic_vdesc', fmd.version.versiondesc);
		fmdc.form_basic.showItem('fieldset_versionbasic');
	}
	//set readonly if not editor
	//!fmd.isEditor && $(fmdc.form_basic.getInput('fi_basic_type')).parents('.dhxform_base:first').find('input').attr("disabled", "disabled");
	if (!fmd.isEditor) {
		fmdc.form_basic.forEachItem(function(id){
			fmdc.form_basic.disableItem(id);
		});
	}
	
	//set canvas
	//add tab
	if (!fmd.version.formdata.formconf.tabs || !fmd.version.formdata.formconf.tabs.length) return;
	for (var i in fmd.version.formdata.formconf.tabs) {
		fmdf_addtab(fmd.version.formdata.formconf.tabs[i].title, fmd.version.formdata.formconf.tabs[i].tabtype, fmd.version.formdata.formconf.tabs[i].id);
		fmdpf_apply();
		//add block
		if (!fmd.version.formdata.formconf.tabs[i].items || !fmd.version.formdata.formconf.tabs[i].items.length) continue;
		for (var j in fmd.version.formdata.formconf.tabs[i].items) {
			fmdf_fmcontainer_block_addcontainer(fmd.version.formdata.formconf.tabs[i].items[j].pattern, fmd.version.formdata.formconf.tabs[i].items[j].id);
			fmdpf_apply();
			//alert(fmd.version.formdata.formconf.tabs[i].items[j].pattern);
			if (fmd.version.formdata.formconf.tabs[i].items[j].pattern=='table') {//block in html table pattern
				//add tr
				if (!fmd.version.formdata.formconf.tabs[i].items[j].items || !fmd.version.formdata.formconf.tabs[i].items[j].items.length) continue;
				for (var k in fmd.version.formdata.formconf.tabs[i].items[j].items) {
					var tr = fmdf_fmcontainer_block_appendtr();
					//add td
					if (!fmd.version.formdata.formconf.tabs[i].items[j].items[k].items || !fmd.version.formdata.formconf.tabs[i].items[j].items[k].items.length) continue;
					for (var l in fmd.version.formdata.formconf.tabs[i].items[j].items[k].items) {
						var cell = fmdf_fmcontainer_block_appendtd(tr, fmd.version.formdata.formconf.tabs[i].items[j].items[k].items[l].id, 
								fmd.version.formdata.formconf.tabs[i].items[j].items[k].items[l].rowspan, fmd.version.formdata.formconf.tabs[i].items[j].items[k].items[l].colspan);
						fmdpf_apply();
						//add element
						if (!fmd.version.formdata.formconf.tabs[i].items[j].items[k].items[l].items || !fmd.version.formdata.formconf.tabs[i].items[j].items[k].items[l].items.length) {
							cell.html(fmdc.tipp);
						} else {
							var elemtype = fmd.version.formdata.formconf.tabs[i].items[j].items[k].items[l].items[0].type;
							cell.html( '<div class="fmddropped fmdelement_'+elemtype+'" onclick="fmdf_onselect(event,this);">'+
									eval("fmdmeta_prop.control[elemtype].innerhtml_dropped" + (typeof(fmdmeta_prop.control[elemtype].innerhtml_dropped)=="function" ? "()":""))+
									'</div>' );
							var dropped = cell.children('.fmddropped');
							fmd.isEditor && dropped.draggable(fmdc.draggable_args_nohelper);
							dropped.attr("id", fmd.version.formdata.formconf.tabs[i].items[j].items[k].items[l].items[0].id);
							//select the new component
							fmdf_select(dropped);
							fmdpf_apply();
						}
					}
				}
				
			} else if (fmd.version.formdata.formconf.tabs[i].items[j].pattern=='div12') {//block in html div pattern
				
			}
		}
	}
}

//get data for save
function fmdf_getDataForSave() {
	var formconf = fmdf_getFormConf();
	if (!formconf) {
		return null;
	}
	var data = {};
	data.formconf = formconf;
	data.propconf = fmd.version.formdata.propconf;
	//alert(JSON.stringify(fmd.version.formdata));
	//canvas settings
	data.settings = {};
	//default font size in px, the same as that in body css
	data.settings.fontsize = fmdc.fontsize;
	//default canvas width in em, the same as width in class fmdcanvas
	data.settings.canvas_size_widthem = fmdc.canvas_size_widthem;
	//auto hide elements prop
	data.settings.autohideprop = fmdc.autohideprop;
	//tab page index for adding tab id
	data.settings.tabpageidx = fmdc.tabpageidx;
	//fmcontainer index for adding container id
	data.settings.contidx = fmdc.contidx;
	//ui index for adding new ui
	data.settings.uiidx = fmdc.uiidx;
	
	//ref script
	data.refscript = fmdc.editor_refscript.getValue();
	//header script
	data.headerscript = fmdc.editor_headerscript.getValue();
	//body script editor
	data.bodyscript = fmdc.editor_bodyscript.getValue();
	
	//prop settings
	//data.propconf;
	
	//alert("fmdf_getDataForSave="+JSON.stringify(data));
	return data;
}

function fmdf_loadSavedData() {
	fmdf_wait(1);
	//default font size in px, the same as that in body css
	fmdc.fontsize = fmd.version.formdata.settings.fontsize;
	//default canvas width in em, the same as width in class fmdcanvas
	fmdc.canvas_size_widthem = fmd.version.formdata.settings.canvas_size_widthem;
	//auto hide elements prop
	fmdc.autohideprop = fmd.version.formdata.settings.autohideprop;
	//tab page index for adding tab id
	fmdc.tabpageidx = fmd.version.formdata.settings.tabpageidx;
	//fmcontainer index for adding container id
	fmdc.contidx = fmd.version.formdata.settings.contidx;
	//ui index for adding new ui
	fmdc.uiidx = fmd.version.formdata.settings.uiidx;
	
	//ref script
	fmdc.editor_refscript.setValue(fmd.version.formdata.refscript);
	//header script
	fmdc.editor_headerscript.setValue(fmd.version.formdata.headerscript);
	//body script editor
	fmdc.editor_bodyscript.setValue(fmd.version.formdata.bodyscript);
	
	//load existing form configure
	fmdf_loadFormConf();
	fmdc.unsavedchange = false;
	fmdf_wait(0);
}

//save
function fmdf_save() {
	//check basic form
	var formname = fmdc.form_basic.getItemValue("fi_basic_name");
	if (!formname || !$.trim(formname)) {
		dhtmlx.message(fmd_i18n_msg_inputformname);
		fmd.tabbar.setTabActive('fmdtab_basic');
		return;
	}
	//get version name and desc update
	if (!fmdc.form_basic.isItemHidden('fieldset_versionbasic')) {
		var vname = fmdc.form_basic.getItemValue('fi_basic_vname');
		if (!vname || !$.trim(vname)) {
			dhtmlx.message(fmd_i18n_msg_inputvname);
			fmd.tabbar.setTabActive('fmdtab_basic');
			return;
		}
		var vdesc = fmdc.form_basic.getItemValue('fi_basic_vdesc');
	}
	
	if (!$(".fmdcanvas .fmdcanvas_tabnav .fmdcanvas_tabnavli").length) {
		dhtmlx.message(fmd_i18n_msg_notdesigned);
		fmd.tabbar.setTabActive('fmdtab_canvas');
		return null;
	}
	
	var formdesc = fmdc.form_basic.getItemValue("fi_basic_desc");
	
	fmdf_wait(1);
	
	var data = fmdf_getDataForSave();
	if (data) {
		var version = {};
		version.formdata = data;
		var form = {"formtype":fmd.form.formtype, "formname":formname};
		if (fmd.form.formid) {
			form.formid = fmd.form.formid;
			version.formid = fmd.form.formid;
			version.versionid = fmd.version.versionid;
			if (fmd.version.versionid!='0' && vname) {//version name and desc can be updated for saved form
				version.versionname = vname;
				version.versiondesc = vdesc;
			}
		}
		formdesc && (form.formdesc = formdesc);
		var param = {"form" : form, "version":version};
		var ret = doPostSyncJson(ctxpath + "/rest/fmd/save", {"param" : JSON.stringify(param)});
		if (ret) {
			//success
			fmd.form.formid = ret.formid;
			fmd.version.versionid = ret.versionid;
			fmd.version.formdata = data;
			fmdc.unsavedchange = false;
			msg(fmd_i18n_msg_succ);
		}
	}
	
	fmdf_wait(0);
}

//preview
function fmd_preview() {
	//var data = fmdf_getDataForSave();
	var ret = doPostSyncJson(ctxpath + "/rest/fmd/generatePreview", 
			{"formid":fmd.form.formid, 
			"versionid":fmd.version.versionid,
			"skin":"bootstrap-blue"});
	if (ret) {
		//success
	}
}

//show progress layer
function fmdf_wait(show) {
	show ? fmd.body_layout.cells('a').progressOn() : fmd.body_layout.cells('a').progressOff();
}

//load modules
function fmdf_loadModules(modulepath, modules) {
	for (var i in modules) {
		loadModule(fmd.lang, modulepath, modules[i]);
	}
}

//new id
function fmdf_uiid() {
	var newid = "ui-id-"+fmdc.uiidx;
	fmdc.uiidx++;
	return newid;
}

//===== runtime functions

//on fmcontainer_block title bar clicked and select fmcontainer_block
function fmf_fmcontainer_block_togglecontent(thisimg) {
	var table1 = $(thisimg).parents('.fmcontainer_block').find('table');
	table1.toggle("blind", {}, 300, function() {
		if (table1.is(":visible")) {
			thisimg.src=fmdc.imagepath+'/collapse.png';
		} else {
			thisimg.src=fmdc.imagepath+'/expand.png';
		}
	});
}


