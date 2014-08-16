//properties settings for radio
fmdmeta_prop.control.radio = {
		//group for element list - basic/composite/custom/extended
		"group" : "basic",
		//control category
		"controlcategory" : "datacontrol",
		//i18n type name
		"i18ntype" : fmd_i18n_modules.radio.elem,
		//icon in element list, located in images/designer/modules/
		"icon" : "elem_radio.png",
		//html code for dragging
		innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><div class="column column1"><input type="radio" name="radio" value="options 1" /><span>options 1</span><br/><input type="radio" name="radio" value="options 2" /><span>options 2</span><br/><input type="radio" name="radio" value="options 3" /><span>options 3</span><br/></div><span class="clearfix"></span>',
		//html code after dropped
		innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><div class="column column1"><input type="radio" name="radio" value="options 1" /><span>options 1</span><br/><input type="radio" name="radio" value="options 2" /><span>options 2</span><br/><input type="radio" name="radio" value="options 3" /><span>options 3</span><br/></div><span class="clearfix"></span>',
		"includes-properties" : {
			"common" : fmdmeta_prop.common.all.properties,
			"controlcommon" : fmdmeta_prop.common.datacontrol.properties
		},
		"properties" : {
			"i18ntype" : {
		    	"name" : fmd_i18n_prop_selectiontype,
		    	"img" : "selection.png",
		    	"cellType" : "ro",
		    	"value" : {"default":fmd_i18n_modules.radio.elem},
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
		    	"cellType" : "databinding",
		    	"validator" : "NotEmpty"
		    },
		    "processbinding" : {
		    	"name" : fmd_i18n_prop_pbinding,
		    	"img" : "processbinding.png",
		    	"cellType" : "processbinding"
		    },
		    "horizontal" : {
		    	"name" : fmd_i18n_modules.radio.horizontal,
			    "cellType" : "ch",
			    "value" : {"default":"0"}
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
						fmdpf_showConditionalSub(rId, nv, fmdmeta_prop.control.radio.properties[rId]);
					}
				}
			}
		}
	};
