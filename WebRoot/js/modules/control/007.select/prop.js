//properties settings for select
fmdmeta_prop.control.select = {
		//group for element list - basic/composite/custom/extended
		"group" : "basic",
		//control category
		"controlcategory" : "datacontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_el_select,
		//icon in element list, located in images/designer/modules/
		"icon" : "elem_select.png",
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
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties,
			"controlcommon" : fmdmeta_prop.common.datacontrol.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_el_select},
		    	"displayOnly" : true,
		    	"afterProperty" : "id"
		    },
		    "dataprovider" : {
		    	"name" : fmd_i18n_prop_dataprovider,
		    	"img" : "dataprovider.png",
			    "cellType" : {
					"type" : "coro",
					"options":[["",""],
	        					["dataprovider-dict", fmd_i18n_prop_dict],
	        					["dataprovider-restsrv", fmd_i18n_prop_restsrv]
	        	                ]
			    },
			    "validator" : "NotEmpty",
				"conditional-sub" : {
					"dataprovider-dict" : {
						"dataprovider-dict" : {
							"name" : fmd_i18n_prop_dict,
							"cellType" : "ed",
							"validator" : "NotEmpty"
						}
				    },
				    "dataprovider-restsrv" : {
						"dataprovider-restsrv" : {
							"name" : fmd_i18n_prop_restsrv,
							"cellType" : "ed",
							"validator" : "NotEmpty",
							"tooltip" : fmd_i18n_prop_restsrv_tip
						},
						"dataprovider-restsrv-usr" : {
							"name" : fmd_i18n_prop_restsrvusr,
							"cellType" : "ed",
							"tooltip" : fmd_i18n_prop_restsrvusr_tip
						},
						"dataprovider-restsrv-pwd" : {
							"name" : fmd_i18n_prop_restsrvpwd,
							"cellType" : "ed"
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
		    	"name" : fmd_i18n_modules.select.multiple,
		    	"cellType" : "ch",
		    	"value" : {"default":"0"}
		    },
		    "size" : {
		    	"name" : fmd_i18n_modules.select.size,
		    	"cellType" : "ed",
		    	"value" : {"default":"1"},
		    	"validator" : "ValidInteger",
		    	"tooltip" : fmd_i18n_modules.select.tip_size
		    }
		},
		//"abandon-properties" : ["valueValidation"],
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
						fmdpf_showConditionalSub(rId, nv, fmdmeta_prop.control.select.properties[rId]);
					}
				}
			}
		}
	};