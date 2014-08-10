//properties settings for dhxgrid
fmdmeta_prop.control.dhxgrid = {
		//group for element list - basic/composite/custom/extended
		"group" : "composite",
		//control category
		"controlcategory" : "datacontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_el_dhxgrid,
		//icon in element list, located in images/designer/modules/
		"icon" : "elem_dhxgrid.png",
		//html code for dragging
		innerhtml_dragging : function() {
			return '<table class="elem-grid" style="width:300px;"><tr><th>Column A</th><th>Column B</th></tr><tr><td>A</td><td>C</td></tr><tr><td>B</td><td>D</td></tr></table>';
		},
		//html code after dropped
		innerhtml_dropped : function() {
			return '<table class="elem-grid"><tr><th>Column A</th><th>Column B</th></tr><tr><td>A</td><td>C</td></tr><tr><td>B</td><td>D</td></tr></table>';
		},
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties,
			"controlcommon" : fmdmeta_prop.common.datacontrol.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_el_dhxgrid},
		    	"displayOnly" : true,
		    	"afterProperty" : "id"
		    },
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
