//properties settings for text input
fmdmeta_prop.control.input = {
		//group for element list - basic/composite/custom/extended
		"group" : "basic",
		//control category
		"controlcategory" : "datacontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_el_input,
		//icon in element list, located in images/designer/modules/
		"icon" : "elem_input.png",
		//html code for dragging
		"innerhtml_dragging" : '<label class="title">'+fmd_i18n_untitled+'</label><input class="large" type="text" name="input" />',
		//html code after dropped
		"innerhtml_dropped" : '<label class="title">'+fmd_i18n_untitled+'</label><input class="large" type="text" name="input" />',
		//properties
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties,
			"controlcommon" : fmdmeta_prop.common.datacontrol.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_el_input},
		    	"displayOnly" : true,
		    	"afterProperty" : "id"
		    },
		    "bindings" : {
		    	"name" : fmd_i18n_prop_binding,
		    	"img" : "binding.png",
		    	"cellType" : "ed",
		    	"validator" : "NotEmpty"
		    },
		    "contentType" : {
		    	"name" : fmd_i18n_prop_contenttype,
		    	"cellType" : {
					"type" : "coro",
					"options":[["text",fmd_i18n_prop_normaltext],
					         ["integer",fmd_i18n_prop_integer],
					         ["money",fmd_i18n_prop_money],
					         ["email",fmd_i18n_prop_email],
                             ["phone",fmd_i18n_prop_phone],
                             ["mobile-cn",fmd_i18n_prop_mobilecn]
					]
			    },
			    "conditional-sub" : {
					"integer" : {
						"contentType-integer" : {
							"name" : fmd_i18n_prop_allownegtive,
							"cellType" : "ch",
							"value" : {"default":"0"}
						}
					},
					"money" : {
						"contentType-money" : {
							"name" : fmd_i18n_prop_allownegtive,
							"cellType" : "ch",
							"value" : {"default":"0"}
						}
					}
				},
		    	"value" : {"default":"text"}
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
			var obj = fmdf_getSelected();
			var vals = fmd.version.formdata.propconf[obj.attr("id")];
			if (vals["labelPosition"]=='left') {
				obj.html('<span style="width:100%;display:inline;"><label style="width:40%;float:left;" class="title">'+vals["i18nname-"+fmd.lang]+'</label><input style="width:60%" class="large" type="text" name="input" /></span>');
			} else if (vals["labelPosition"]=='right') {
				obj.html('<span style="width:100%;display:inline"><input style="width:60%" class="large" type="text" name="input" /><label style="width:40%;float:right;" class="title">'+vals["i18nname-"+fmd.lang]+'</label></span>');
			} else if (vals["labelPosition"]=='top') {
				obj.html('<label class="title">'+vals["i18nname-"+fmd.lang]+'</label><input class="large" type="text" name="input" />');
			} else if (vals["labelPosition"]=='bottom') {
				obj.html('<input class="large" type="text" name="input" /><label class="title">'+vals["i18nname-"+fmd.lang]+'</label>');
			}
			obj.find('label')//.html(vals["i18nname-"+fmd.lang])
				.css("display", (vals["hideLabel"]=='1')?"none":"block");
			obj.find('input').attr("disabled", vals["disabled"]=='1');
			// && obj.attr('maxLength', vals["maxLength"]).css("display", "inline-block");
		},
		"gridEvents" : {
			"onEditCell" : function(stage,rId,cId,nv,ov) {
				return true;
			},
			"onCellChanged" : function(rId,cId,nv) {
				//alert("onCellChanged rId="+rId+" cId="+cId+" nv="+nv);
				
			}
		}
	};
