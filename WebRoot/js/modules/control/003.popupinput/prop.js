//properties settings for text popupinput
fmdmeta_prop.control.popupinput = {
		//group for element list - basic/composite/custom/extended
		"group" : "basic",
		//control category
		"controlcategory" : "datacontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_el_popupinput,
		//icon in element list, located in images/designer/modules/
		"icon" : "elem_popupinput.png",
		//html code for dragging
		innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><input class="large" type="text" name="input" />',
		//html code after dropped
		innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><input class="large" type="text" name="input" />',
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties,
			"controlcommon" : fmdmeta_prop.common.datacontrol.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_el_popupinput},
		    	"displayOnly" : true,
		    	"afterProperty" : "id"
		    },
		    "bindings" : {
		    	"name" : fmd_i18n_prop_binding,
		    	"cellType" : "binding"
		    },
		    "maxLength" : {
		    	"name" : fmd_i18n_prop_maxlength,
		    	"cellType" : "ed",
		    	"value" : {"default":"10"}
		    }
		},
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