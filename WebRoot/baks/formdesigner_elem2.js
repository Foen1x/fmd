/*
 * Properties meta data of form components
 */

/*
 * ***********************************************************
 * DEFINE CONTAINERS HERE
 * ***********************************************************
*/

//all containers wrapper
var fmdmeta_container = {};
/**
 * fmcontainer_tab container
 */
fmdmeta_container.tab = {
		useApply : true,//apply button enabled
		"formstr":[
			        { type:"settings" , position:"label-top"  },
			        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_fmcontainer_tab},
			        { type:"input" , name:"id", label:"id", readonly:true},
			   		{ type:"input" , name:"label_zh", label:fmd_i18n_prop_label_zh},
			   		{ type:"input" , name:"label_en", label:fmd_i18n_prop_label_en}
			   	],
		onInit : function(form1) {//init properties form data
			var id1 = fmdc.selection.selectedobj.attr("id");
			form1.setFormData(fmdc.dataprop[id1]);
			form1.setItemValue("id", id1);
		},
		onChange : function(fiid) {//onchange event of properties form
			var id1 = this.getItemValue("id");
			var fiv = this.getItemValue(fiid);
			fmdc.dataprop[id1][fiid] = fiv;
			if('label_zh'==fiid) {//default lang
				fiv = (fiv==null || $.trim(fiv)=='') ? fmd_i18n_tab_title : fiv;
				if (fmd.lang!='en') {
					fmdf_fmcontainer_tab_title(fiv);
				}
			} else if ('label_en'==fiid && fmd.lang=='en') {
				fiv = (fiv==null || $.trim(fiv)=='') ? fmd_i18n_tab_title : fiv;
				fmdf_fmcontainer_tab_title(fiv);
			}
			//alert(JSON.stringify(fmdc.dataprop));
		}
	};

/**
 * fmcontainer_block container
 */
fmdmeta_container.block = {
		useApply : true,
		"formstr":[
			        { type:"settings" , position:"label-top"  },
			        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_fmcontainer_block},
			        { type:"input" , name:"id", label:"id", readonly:true},
			   		{ type:"input" , name:"label_zh", label:fmd_i18n_prop_label_zh},
			   		{ type:"input" , name:"label_en", label:fmd_i18n_prop_label_en},
			   		{ type:"input" , name:"margintop", label:fmd_i18n_prop_container_margintop},
			   		{ type:"checkbox" , name:"noheader", label:fmd_i18n_prop_container_noheader},
			   		{ type:"checkbox" , name:"fold", label:fmd_i18n_prop_container_fold}
			   	],
		onInit : function(form1) {//init properties form data
			var id1 = fmdc.selection.selectedobj.attr("id");
			form1.setFormData(fmdc.dataprop[id1]);
			form1.setItemValue("id", id1);
			if (fmdc.dataprop[id1]["noheader"]){//disable fold option if noheader == true
				form1.hideItem('fold');
			} else {
				form1.showItem('fold');
			}
		},
		onChange : function(fiid) {//onchange event of properties form
			var id1 = this.getItemValue("id");
			var fiv = this.getItemValue(fiid);
			fmdc.dataprop[id1][fiid] = fiv;
			if('label_zh'==fiid) {//default lang
				if (fmd.lang!='en') {
					fiv = (fiv==null || $.trim(fiv)=='') ? fmd_i18n_container_title : fiv;
					fmdf_fmcontainer_block_title(fiv);
				}
			} else if ('label_en'==fiid && fmd.lang=='en') {
				fiv = (fiv==null || $.trim(fiv)=='') ? fmd_i18n_container_title : fiv;
				fmdf_fmcontainer_block_title(fiv);
			} else if ('noheader'==fiid) {
				fmdf_fmcontainer_block_headerdisplay(fiv);
				if (fiv){//disable fold option if noheader == true
					this.hideItem('fold');
				} else {
					this.showItem('fold');
				}
			} else if ('margintop'==fiid) {
				if (fiv==null || $.trim(fiv)=='') fiv = '0.7';
				fmdc.selection.selectedobj.css('margin-top', fiv+'em');
			}
			//alert(JSON.stringify(fmdc.dataprop));
		}
	};

/**
 * fmcontainercell container, td
 */
fmdmeta_container.cell = {
		"formstr":[
			        { type:"settings" , position:"label-top"  },
			        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_container_cell},
			   		{ type:"input" , name:"id", label:"id", readonly:true}
			   	],
	   	onInit : function(form1) {
	   		var id1 = fmdc.selection.selectedobj.attr("id");
			form1.setItemValue("id", id1);
		},
		onChange : function(fiid) {
			
		}
	};

/*
 * ***********************************************************
 * DEFINE ELEMENTS HERE
 * ***********************************************************
*/

//all elements wrapper
var fmdmeta_elem = {};
//list all elements here with proper order
fmdmeta_elem.elemlist_basic = ["input","p","textarea","popupinput","radio","checkbox","select","multiselect","dhxgrid","customhtml"];


/*
 * input element
 */
fmdmeta_elem.input = {
	//i18n name
	i18nname : fmd_i18n_el_input,
	//html code for dragging
	innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><input class="large" type="text" name="input" />',
	//html code after dropped
	innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><input class="large" type="text" name="input" />',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        //{ type:"hidden" , name:"label"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
   	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	},
	onChange : function(fiid) {
		var id1 = this.getItemValue("id");
		var fiv = this.getItemValue(fiid);
		fmdc.dataprop[id1][fiid] = fiv;
	},
	onButtonClick : function(btid) {
		var id1 = this.getItemValue("id");
		if (btid=='fb_binding_add') {
			var inp = this.getInput('binding');
			var x = getAbsoluteLeft(inp);
	        var y = getAbsoluteTop(inp);
	        var w = inp.offsetWidth;
	        var h = inp.offsetHeight;
	        //alert(x+' '+y+' '+w+' '+h);
	        //if (fmdc.popup_binding_elem.isVisible()) fmdc.popup_binding_elem.hide();
	        fmdc.popup_binding_elem.popup(x, y+600, w, h);
	        //set form and callback after the popup return
	        fmdc.popup_binding_elem.form = this;
	        fmdc.popup_binding_elem.callback = function(returndata) {
	        	if (returndata) {
	        		fmdc.popup_binding_elem.form.setItemValue('binding',returndata.binding);
	        		//fmdc.popup_binding_elem.form.setItemValue('label',returndata.bindingdesc);
	        		fmdc.dataprop[id1]["binding"] = returndata.binding;
	        		var s = fmdc.selection.selectedobj;
		        	s.find('label').html(returndata.bindingdesc);
	        	}
	        };
		} else if (btid=='fb_binding_del') {
			this.setItemValue('binding','');
			//this.setItemValue('label',fmd_i18n_untitled);
			fmdc.dataprop[id1]["binding"] = null;
			var s = fmdc.selection.selectedobj;
			s.find('label').html(fmd_i18n_untitled);
		}
	}
};

fmdmeta_elem.p = {
	//i18n name
	i18nname : fmd_i18n_el_p,
	//html code for dragging
	innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><p>Output Text</p>',
	//html code after dropped
	innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><p>Output Text</p>',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

fmdmeta_elem.textarea = {
	//i18n name
	i18nname : fmd_i18n_el_textarea,
	//html code for dragging
	innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><textarea class="medium" name="textarea" cols="20" rows="5" ></textarea>',
	//html code after dropped
	innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><textarea class="medium" name="textarea" cols="20" rows="5" ></textarea>',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

fmdmeta_elem.popupinput = {
	//i18n name
	i18nname : fmd_i18n_el_popupinput,
	//html code for dragging
	innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><input class="large" type="text" name="input" />',
	//html code after dropped
	innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><input class="large" type="text" name="input" />',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

fmdmeta_elem.radio = {
	//i18n name
	i18nname : fmd_i18n_el_radio,
	//html code for dragging
	innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><div class="column column1"><input type="radio" name="radio" value="options 1" /><span>options 1</span><br/><input type="radio" name="radio" value="options 2" /><span>options 2</span><br/><input type="radio" name="radio" value="options 3" /><span>options 3</span><br/></div><span class="clearfix"></span>',
	//html code after dropped
	innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><div class="column column1"><input type="radio" name="radio" value="options 1" /><span>options 1</span><br/><input type="radio" name="radio" value="options 2" /><span>options 2</span><br/><input type="radio" name="radio" value="options 3" /><span>options 3</span><br/></div><span class="clearfix"></span>',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

fmdmeta_elem.checkbox = {
	//i18n name
	i18nname : fmd_i18n_el_checkbox,
	//html code for dragging
	innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><div class="column column1"><input type="checkbox" name="checkbox[]" value="options 1"/ ><span>options 1</span><br/><input type="checkbox" name="checkbox[]" value="options 2"/ ><span>options 2</span><br/><input type="checkbox" name="checkbox[]" value="options 3"/ ><span>options 3</span><br/></div><span class="clearfix"></span>',
	//html code after dropped
	innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><div class="column column1"><input type="checkbox" name="checkbox[]" value="options 1"/ ><span>options 1</span><br/><input type="checkbox" name="checkbox[]" value="options 2"/ ><span>options 2</span><br/><input type="checkbox" name="checkbox[]" value="options 3"/ ><span>options 3</span><br/></div><span class="clearfix"></span>',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

fmdmeta_elem.select = {
	//i18n name
	i18nname : fmd_i18n_el_select,
	//html code for dragging
	innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><div class="large"><span><select name="select" >'+
		'<option value="options 1">options 1</option><br/>'+
		'<option value="options 2">options 2</option><br/>'+
		'<option value="options 3">options 3</option><br/></select><i></i></span></div>',
	//html code after dropped
	innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><div class="large"><span><select name="select" >'+
		'<option value="options 1">options 1</option><br/>'+
		'<option value="options 2">options 2</option><br/>'+
		'<option value="options 3">options 3</option><br/></select><i></i></span></div>',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

fmdmeta_elem.multiselect = {
	//i18n name
	i18nname : fmd_i18n_el_multiselect,
	//html code for dragging
	innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><div class="large"><select name="multiple[]" multiple="multiple" >'+
		'<option value="options 1">options 1</option><br/>'+
		'<option value="options 2">options 2</option><br/>'+
		'<option value="options 3">options 3</option><br/></select></div>',
	//html code after dropped
	innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><div class="large"><select name="multiple[]" multiple="multiple" >'+
		'<option value="options 1">options 1</option><br/>'+
		'<option value="options 2">options 2</option><br/>'+
		'<option value="options 3">options 3</option><br/></select></div>',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

fmdmeta_elem.dhxgrid = {
	//i18n name
	i18nname : fmd_i18n_el_dhxgrid,
	//html code for dragging
	innerhtml_dragging : fmd_i18n_el_dhxgrid,
	//html code after dropped
	innerhtml_dropped : fmd_i18n_el_dhxgrid,
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

fmdmeta_elem.customhtml = {
	//i18n name
	i18nname : '日期选择',
	//html code for dragging
	innerhtml_dragging : '&lt;html&gt;'+fmd_i18n_el_customhtml+'&lt;/html&gt;',
	//html code after dropped
	innerhtml_dropped : '&lt;html&gt;'+fmd_i18n_el_customhtml+'&lt;/html&gt;',
	//properties form json
	"formstr" : [
		        { type:"settings" , position:"label-top"  },
		        { type:"input" , name:"selectiontype", label:fmd_i18n_prop_selectiontype, readonly:true, value:fmd_i18n_l_elem, offsetLeft:"20"},
		        { type:"input" , name:"id", label:"id", readonly:true, offsetLeft:"20"},
		        { type:"block" , name:"form_block_1",offsetLeft:"0", list:[
            		{ type:"input" , name:"binding", readonly:true, label:fmd_i18n_prop_binding, width:"200"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_add", value:"+", width:"22"},
            		{ type:"newcolumn"},
            		{ type:"button" , name:"fb_binding_del", value:"-", width:"22"}
            	]  }
		   	],
	//on init properties
	onInit : function(form1) {
   		var id1 = fmdc.selection.selectedobj.attr("id");
   		form1.setFormData(fmdc.dataprop[id1]);
		form1.setItemValue("id", id1);
	}
};

