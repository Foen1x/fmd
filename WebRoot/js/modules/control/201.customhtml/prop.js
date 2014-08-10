//properties settings for custom html
fmdmeta_prop.control.customhtml = {
		//group for element list - basic/composite/custom/extended
		"group" : "extended",
		//control category
		"controlcategory" : "datacontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_el_customhtml,
		//icon in element list, located in images/designer/modules/
		"icon" : "elem_customhtml.png",
		//html code for dragging
		innerhtml_dragging : '&lt;div&gt;'+fmd_i18n_el_customhtml+'&lt;/div&gt;',
		//html code after dropped
		innerhtml_dropped : '&lt;div&gt;'+fmd_i18n_el_customhtml+'&lt;/div&gt;',
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_el_customhtml},
		    	"displayOnly" : true,
		    	"afterProperty" : "id"
		    },
		    "htmlcode" : {
		    	"name" : fmd_i18n_prop_htmlcode,
		    	"img" : "html5.png",
		    	"cellType" : "ace_html"
		    }
		},
		"abandon-properties" : ["i18nname", "style"], //format is array
		"includes-events" : {
			"common" : fmdmeta_prop.common.all.events
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
