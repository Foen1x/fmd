//properties settings for select
fmdmeta_prop.control.button = {
		//group for element list - basic/composite/custom/extended
		"group" : "basic",
		//control category
		"controlcategory" : "usercontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_el_button,
		//icon in element list, located in images/designer/modules/
		"icon" : "elem_button.png",
		//html code for dragging
		innerhtml_dragging : '<div class="btn" style="padding:0.5em 1em;">'+fmd_i18n_untitled+'</div>',
		//html code after dropped
		innerhtml_dropped : '<div class="btn" style="padding:0.5em 1em;">'+fmd_i18n_untitled+'</div>',
		//if allow multi element in one cell, default false
		"multielement" : true,
		//when in multielement mode, how multiple element coexists, default=respective
		//compositive - in one parent div; respective - each has a parent div
		//"multielement-style" : "respective",
		//properties
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties,
			"controlcommon" : fmdmeta_prop.common.usercontrol.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_el_button},
		    	"displayOnly" : true,
		    	"afterProperty" : "id"
		    }
		},
		"includes-events" : {
			"common" : fmdmeta_prop.common.all.events,
			"controlcommon" : fmdmeta_prop.common.usercontrol.events
		},
		"events" : {
			
		},
		"onApply" : function() {
			var obj = fmdf_getSelected();
			var vals = fmd.version.formdata.propconf[obj.attr("id")];
			obj.find('.btn').html(vals["i18nname-"+fmd.lang]);
		},
		"gridEvents" : {
			"onEditCell" : function(stage,rId,cId,nv,ov) {
				return true;
			},
			"onCellChanged" : function(rId,cId,nv) {
				
			}
		}
	};