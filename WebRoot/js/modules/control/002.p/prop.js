//properties settings for text output
fmdmeta_prop.control.p = {
		//group for element list - basic/composite/custom/extended
		"group" : "basic",
		//control category
		"controlcategory" : "datacontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_el_p,
		//icon
		"icon" : "elem_p.png",
		//html code for dragging
		innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><p>Output Text</p>',
		//html code after dropped
		innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><p>Output Text</p>',
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties,
			"controlcommon" : fmdmeta_prop.common.datacontrol.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_el_p},
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
		    },
		    "maxlength" : {
		    	"name" : fmd_i18n_prop_maxlength,
		    	"cellType" : "ed",
		    	"value" : {"default":"10"},
		    	"validator" : "ValidInteger",
		    	"tooltip" : fmd_i18n_modules.input.tip_maxlength
		    }
		},
		"abandon-properties" : ["valueValidation"],
		"includes-events" : {
			"common" : fmdmeta_prop.common.all.events,
			"controlcommon" : fmdmeta_prop.common.datacontrol.events
		},
		"events" : {
			
		},
		"abandon-events" : ["onchange"],
		"onApply" : function() {
			var obj = fmdf_getSelected();
			var vals = fmd.version.formdata.propconf[obj.attr("id")];
			obj.find('label').html(vals["i18nname-"+fmd.lang])
				.css("display", (vals["hideLabel"]=='1')?"none":"block");
		},
		"gridEvents" : {
			"onEditCell" : function(stage,rId,cId,nv,ov) {
				return true;
			},
			"onCellChanged" : function(rId,cId,nv) {
				
			}
		}
	};