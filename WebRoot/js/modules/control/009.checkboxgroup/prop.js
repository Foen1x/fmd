//properties settings for radio
fmdmeta_prop.control.checkboxgroup = {
		//group for element list - basic/composite/custom/extended
		"group" : "basic",
		//control category
		"controlcategory" : "datacontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_el_checkboxgroup,
		//icon in element list, located in images/designer/modules/
		"icon" : "elem_checkboxgroup.png",
		//html code for dragging
		innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><div class="column column1"><input type="checkbox" name="checkbox[]" value="options 1"/ ><span>options 1</span><br/><input type="checkbox" name="checkbox[]" value="options 2"/ ><span>options 2</span><br/><input type="checkbox" name="checkbox[]" value="options 3"/ ><span>options 3</span><br/></div><span class="clearfix"></span>',
		//html code after dropped
		innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><div class="column column1"><input type="checkbox" name="checkbox[]" value="options 1"/ ><span>options 1</span><br/><input type="checkbox" name="checkbox[]" value="options 2"/ ><span>options 2</span><br/><input type="checkbox" name="checkbox[]" value="options 3"/ ><span>options 3</span><br/></div><span class="clearfix"></span>',
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties,
			"controlcommon" : fmdmeta_prop.common.datacontrol.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_el_checkboxgroup},
		    	"displayOnly" : true,
		    	"afterProperty" : "id"
		    },
		    "databinding" : {
		    	"name" : fmd_i18n_prop_binding,
		    	"img" : "databinding.png",
		    	"cellType" : "databinding",
		    	"validator" : "NotEmpty"
		    },
		    "processbinding" : {
		    	"name" : fmd_i18n_prop_pbinding,
		    	"img" : "processbinding.png",
		    	"cellType" : "processbinding"
		    }
		},
		"abandon-properties" : ["valueValidation"],
		"includes-events" : {
			"common" : fmdmeta_prop.common.all.events,
			"controlcommon" : fmdmeta_prop.common.datacontrol.events
		},
		"events" : {
			
		},
		"onApply" : function() {
			
		},
		"gridEvents" : {
			"onEditCell" : function(stage,rId,cId,nv,ov) {
				return true;
			},
			"onCellChanged" : function(rId,cId,nv) {
				
			}
		}
	};