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
		innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><span><input class="large" type="text" style="padding-right:20px;background:url(\''+ctxpath+'/images/designer/prop/finder.png\') no-repeat scroll right center transparent;" /></span>',
		//html code after dropped
		innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><span><input class="large" type="text" style="padding-right:20px;background:url(\''+ctxpath+'/images/designer/prop/finder.png\') no-repeat scroll right center transparent;" /></span>',
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
		    "dataprovider" : {
		    	"name" : fmd_i18n_prop_dataprovider,
		    	"img" : "dataprovider.png",
			    "cellType" : {
					"type" : "coro",
					"options":[["",""],
	        					["dataprovider-predefinedpopup", fmd_i18n_modules.popupinput.predefinedpopup],
	        					["dataprovider-restsrv", fmd_i18n_prop_restsrv]
	        	                ]
			    },
			    "validator" : "NotEmpty",
				"conditional-sub" : {
					"dataprovider-predefinedpopup" : {
						"dataprovider-predefinedpopup" : {
							"name" : fmd_i18n_modules.popupinput.predefinedpopup,
							"cellType" : "ed",
							"validator" : "NotEmpty"
						}
				    },
				    "dataprovider-restsrv" : {
						"dataprovider-restsrv" : {
							"name" : fmd_i18n_prop_restsrv,
							"cellType" : "ed",
							"validator" : "NotEmpty"
						}
				    }
				},
			    "value" : {"default":""}
		    },
		    "databinding" : {
		    	"name" : fmd_i18n_prop_binding,
		    	"img" : "databinding.png",
		    	"cellType" : "ro",
		    	"displayOnly" : true,
		    	"sub" : {
		    		"databinding-realvalue" : {
		    			"name" : fmd_i18n_prop_binding +"("+ fmd_i18n_prop_realvalue +")",
		    			"cellType" : "databinding",
				    	"validator" : "NotEmpty",
				    	"img" : "databinding.png"
		    		},
		    		"databinding-displayvalue" : {
		    			"name" : fmd_i18n_prop_binding +"("+ fmd_i18n_prop_displayvalue +")",
		    			"cellType" : "databinding",
				    	"validator" : "NotEmpty",
				    	"img" : "databinding.png"
		    		}
		    	}
		    },
		    "processbinding" : {
		    	"name" : fmd_i18n_prop_pbinding,
		    	"img" : "processbinding.png",
		    	"cellType" : "ro",
		    	"displayOnly" : true,
		    	"sub" : {
		    		"processbinding-realvalue" : {
		    			"name" : fmd_i18n_prop_pbinding +"("+ fmd_i18n_prop_realvalue +")",
		    			"cellType" : "processbinding",
				    	//"validator" : "NotEmpty",
				    	"img" : "processbinding.png"
		    		},
		    		"processbinding-displayvalue" : {
		    			"name" : fmd_i18n_prop_pbinding +"("+ fmd_i18n_prop_displayvalue +")",
		    			"cellType" : "processbinding",
				    	//"validator" : "NotEmpty",
				    	"img" : "processbinding.png"
		    		}
		    	}
		    },
		    "multiple" : {
		    	"name" : fmd_i18n_modules.popupinput.multiple,
		    	"cellType" : "ch",
		    	"value" : {"default":"0"}
		    },
		    "maxlength" : {
		    	"name" : fmd_i18n_prop_maxlength,
		    	"cellType" : "ed",
		    	"value" : {"default":"10"},
		    	"validator" : "ValidInteger",
		    	"tooltip" : fmd_i18n_modules.input.tip_maxlength
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
			obj.find('label').html(vals["i18nname-"+fmd.lang])
				.css("display", (vals["hideLabel"]=='1')?"none":"block");
		},
		"gridEvents" : {
			"onEditCell" : function(stage,rId,cId,nv,ov) {
				return true;
			},
			"onCellChanged" : function(rId,cId,nv) {
				if (nv && cId==fmdmeta_prop.gridconf.idx.value) {
					if (rId=='dataprovider') {
						fmdpf_showConditionalSub(rId, nv, fmdmeta_prop.control.popupinput.properties[rId]);
					}
				}
			}
		}
	};