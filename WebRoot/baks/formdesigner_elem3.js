/*
 * Properties meta data of form components
 */

/*
 * ***********************************************************
 * DEFINE CONTAINERS HERE
 * ***********************************************************
*/

/**
 * layout - component for managing layout, containers for other elements
 * datacontrol - components for holding user data, input, textarea etc.
 * usercontrol - interactive components such as buttons, images, links
 */

function fmdf_initComponentMeta() {
	
	//all containers wrapper
	fmdmeta_prop = {};

	//icon path
	fmdmeta_prop.iconpath = "/images/designer/prop/";

	//properties grid configuration
	fmdmeta_prop.gridconf = {};
	fmdmeta_prop.gridconf.isTreeGrid = true;
	//fmdmeta_prop.gridconf.treeIconPath = "/images/designer/prop/";
	fmdmeta_prop.gridconf.treeImagePath = "/js/dhtmlx3/imgs/";
	fmdmeta_prop.gridconf.extIconPath = "/images/designer/prop/";
	fmdmeta_prop.gridconf.header = [fmd_i18n_prop_prop,fmd_i18n_prop_value];
	//fmdmeta_prop.gridconf.subHeader;
	fmdmeta_prop.gridconf.colType="tree,ro";
	fmdmeta_prop.gridconf.colIds="prop,value";
	fmdmeta_prop.gridconf.colAlign="left,left";
	//fmdmeta_prop.gridconf.colVAlign;
	fmdmeta_prop.gridconf.colSorting="na,na";
	//fmdmeta_prop.gridconf.colMinWidth;
	fmdmeta_prop.gridconf.colInitWidth="160,120";
	fmdmeta_prop.gridconf.colColor="#F8F8F8,white";
	//fmdmeta_prop.gridconf.resize;
	fmdmeta_prop.gridconf.visibile="false,false";
	fmdmeta_prop.gridconf.idx={};
	fmdmeta_prop.gridconf.idx.prop=0;
	fmdmeta_prop.gridconf.idx.value=1;

	fmdmeta_prop.common = {};	//common properties settings for components
	//fmdmeta_prop.common.all = {};	//common properties settings for all components
	fmdmeta_prop.common.layout = {};	//common properties settings for all datacontrol components
	//fmdmeta_prop.common.datacontrol = {};	//common properties settings for all datacontrol components
	fmdmeta_prop.common.usercontrol = {};	//common properties settings for all usercontrol components
	fmdmeta_prop.layout = {};	//properties settings for layout components
	fmdmeta_prop.control = {};	//properties settings for all control components
	
	//predefined events
	fmdmeta_prop.gridPredefinedEvents = {
		"onCellChanged" : function(rId,cId,nv) {
			//alert((rId.indexOf('i18nname')!=-1)+"=="+rId+"=="+(!fmdc.grid_prop.cells(rId, fmdmeta_prop.gridconf.idx.value).getValue()));
			var newv = fmdc.grid_prop.cells(rId, fmdmeta_prop.gridconf.idx.value).getValue();
			if (newv && cId==fmdmeta_prop.gridconf.idx.value) {
				if (rId=='valueValidation') {
					fmdpf_showConditionalSub(rId, newv, fmdmeta_prop.common.datacontrol.properties[rId]);
				} else if (rId=='contentType') {
					fmdpf_showConditionalSub(rId, newv, fmdmeta_prop.control.input.properties[rId]);
				}
			} else if (!fmdc.grid_prop.cells(rId, fmdmeta_prop.gridconf.idx.value).getValue() && rId.indexOf('i18nname')!=-1) {
				if ('i18nname-zh'==rId) {
					fmdc.grid_prop.cells(rId, fmdmeta_prop.gridconf.idx.value).setValue(fmd_i18n_untitled);
				} else {
					fmdc.grid_prop.cells(rId, fmdmeta_prop.gridconf.idx.value).setValue("Untitled");
				}
			}
		}
	};

	//available validators
	fmdmeta_prop.runtime_validators = [["",""],
					["NotEmpty", fmd_i18n_vld_notempty],
					["ValidAplhaNumeric", fmd_i18n_vld_alphanumeric],
					["ValidCurrency", fmd_i18n_vld_currency],
					["ValidDate", fmd_i18n_vld_date],
					["ValidDatetime", fmd_i18n_vld_datetime],
					["ValidEmail", fmd_i18n_vld_email],
					["ValidInteger", fmd_i18n_vld_integer],
					["ValidIPv4", fmd_i18n_vld_ipv4],
					["ValidNumeric", fmd_i18n_vld_numeric],
					["ValidTime", fmd_i18n_vld_time],
					["RegExp", fmd_i18n_vld_regexp]
	                      ];

	/**
	 * list of available controls
	 */
	//all elements wrapper
	//fmdmeta_elem = {};
	//list all elements here with proper order
	//fmdmeta_elem.elemlist_basic = ["input","p","textarea","popupinput","radio","checkbox","select","multiselect","dhxgrid","customhtml"];


	//==================== common ====================

	/**
	 * common for all components
	 */
	fmdmeta_prop.common.all = {
			"properties" : {
				"id" : {
			    	"name" : "id",
			    	"img" : "id.png",
			    	"cellType" : "ro",
			    	"value" : {"fromattr" : "id"},
			    	"displayOnly" : true
			    },
			    "i18nname" : {
			    	"name" : fmd_i18n_prop_i18nname,
			    	"cellType" : "ro",
			    	"img" : "locale.png",
			    	"displayOnly" : true,
			    	"sub" : {
			    		"i18nname-zh" : {
			    			"name" : fmd_i18n_prop_i18nname_zh,
			    			"cellType" : "ed",
					    	"validator" : "NotEmpty",
					    	"img" : "zh.png",
					    	"value" : {"default": fmd_i18n_untitled}
			    		},
			    		"i18nname-en" : {
			    			"name" : fmd_i18n_prop_i18nname_en,
			    			"cellType" : "ed",
					    	"validator" : "NotEmpty",
					    	"img" : "en.png",
					    	"value" : {"default": "Untitled"}
			    		}
			    	}
			    },
			    "display" : {
			    	"name" : fmd_i18n_prop_display,
			    	"img" : "display.png",
			    	"cellType" : {"type":"coro",
							    	"options":[["displayblock",fmd_i18n_prop_displayblock],
										         ["displayblockinline",fmd_i18n_prop_displayblockinline],
										         ["displaynone",fmd_i18n_prop_displaynone],
										         ["visibilityhidden",fmd_i18n_prop_visibilityhidden]
											  	]
			    				},
					"value" : {"default" : "displayblock"}
			    },
			    "style" : {
			    	"name" : fmd_i18n_prop_style,
			    	"img" : "css.png",
			    	"cellType" : "ace_text"
			    }
			},
			"events" : {
				"onload" : {"name" : fmd_i18n_ev_onload,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj
					}
				},
				"onclick" : {"name" : fmd_i18n_ev_onclick,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj
					}
				},
				"onmouseover" : {"name" : fmd_i18n_ev_onmouseover,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj
					}
				},
				"onmouseout" : {"name" : fmd_i18n_ev_onmouseout,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj
					}
				}
			}
		};

	/**
	 * common for all datacontrol components
	 */
	fmdmeta_prop.common.datacontrol = {
			"properties" : {
				/*"label" : {
			    	"name" : fmd_i18n_prop_label,
			    	"cellType" : "ro",
			    	"validator" : "Required"
			    },*/
			    "hideLabel" : {
			    	"name" : fmd_i18n_prop_hidelabel,
			    	"cellType" : "ch",
			    	"value" : {"default":"0"}
			    },
			    "labelPosition" : {
			    	"name" : fmd_i18n_prop_labelposition,
			    	"cellType" : {"type":"coro", 
			    				"options":[["left",fmd_i18n_prop_left],
	                                     ["right",fmd_i18n_prop_right],
	                                     ["top",fmd_i18n_prop_top],
	                                     ["bottom",fmd_i18n_prop_bottom]
			    				]
			    	},
			    	"value" : {"default":"top"}
			    },
			    "valueValidation" : {
			    	"name" : fmd_i18n_prop_valuevalidation,
				    "cellType" : {
						"type" : "coro",
						"options":fmdmeta_prop.runtime_validators
				    },
					"conditional-sub" : {
						"RegExp" : {
							"valueValidation-RegExp" : {
								"name" : fmd_i18n_prop_regexp,
								"cellType" : "ed",
								"validator" : "NotEmpty"
							}
					    }
					},
				    "value" : {"default":""}
			    },
			    "disabled" : {
			    	"name" : fmd_i18n_prop_disabled,
			    	"cellType" : "ch",
			    	"value" : {"default":"0"}
			    },
			    "keepOnDisabled" : {
			    	"name" : fmd_i18n_prop_keepondisabled,
			    	"cellType" : "ch",
			    	"value" : {"default":"0"}
			    }
			},
			"events" : {
				"onchange" : {"name" : fmd_i18n_ev_onchange,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj
					}
				},
				"onfocus" : {"name" : fmd_i18n_ev_onfocus,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj
					}
				},
				"onblur" : {"name" : fmd_i18n_ev_onblur,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj
					}
				},
//				"onDisabled" : {},
//				"onEnabled" : {}
			}
		};

	//==================== layout ====================

	//properties settings for tab
	fmdmeta_prop.layout.tab = {
			"includes-properties" : {
				"common" : fmdmeta_prop.common.all.properties
			},
			"properties" : {
				"i18ntype" : {
			    	"name" : fmd_i18n_prop_selectiontype,
			    	"img" : "selection.png",
			    	"cellType" : "ro",
			    	"value" : {"default":fmd_i18n_l_fmcontainer_tab},
			    	"displayOnly" : true,
			    	"afterProperty" : "id"
			    }
			},
			"abandon-properties" : ["tiprow_specific"],//format is array
			"includes-events" : {
				"common" : fmdmeta_prop.common.all.events
			},
			"events" : {
				"onactive" : {"name" : fmd_i18n_ev_onactive,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj,
						"obj" : fmd_i18n_ev_eventthis
					}
				}
			},
			"onApply" : function() {
				var vals = fmdc.data.propconf[fmdf_getSelected().attr("id")];
				fmdf_fmcontainer_tab_title(vals["i18nname-"+fmd.lang]);
			}
		};

	//properties settings for block
	fmdmeta_prop.layout.block = {
			"includes-properties" : {
				"common" : fmdmeta_prop.common.all.properties
			},
			"properties" : {
				"i18ntype" : {
			    	"name" : fmd_i18n_prop_selectiontype,
			    	"img" : "selection.png",
			    	"cellType" : "ro",
			    	"value" : {"default":fmd_i18n_l_fmcontainer_block},
			    	"displayOnly" : true,
			    	"afterProperty" : "id"
			    },
			    "pattern" : {
			    	"name" : fmd_i18n_prop_container_pattern,
			    	"img" : "pattern.png",
			    	"cellType" : "ro",
			    	"value" : {"fromattr":"fmdpattern"},
			    	"afterProperty" : "i18ntype"
			    },
				"margintop" : {
			    	"name" : fmd_i18n_prop_container_margintop,
			    	"cellType" : "ed",
			    	"value" : {"default" : "0.7"},
			    	"validator" : "ValidNumeric"
			    },
			    "noheader" : {
			    	"name" : fmd_i18n_prop_container_noheader,
			    	"cellType" : "ch",
			    	"value" : {"default":"0"}
			    },
			    "fold" : {
			    	"name" : fmd_i18n_prop_container_fold,
			    	"cellType" : "ch",
			    	"value" : {"default":"0"}
			    }
			},
			"includes-events" : {
				"common" : fmdmeta_prop.common.all.events
			},
			"events" : {
				"onCollapse" : {"name" : fmd_i18n_ev_oncollapse,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj,
						"obj" : fmd_i18n_ev_eventthis
					}
				},
				"onExpand" : {"name" : fmd_i18n_ev_onexpand,
					"arguments" : {
						"e" : fmd_i18n_ev_eventobj,
						"obj" : fmd_i18n_ev_eventthis
					}
				}
			},
			"onApply" : function() {
				var vals = fmdc.data.propconf[fmdf_getSelected().attr("id")];
				fmdf_fmcontainer_block_title(vals["i18nname-"+fmd.lang]);
				fmdc.selection.selectedobj.css('margin-top', vals["margintop"]?vals["margintop"]+'em':'0.7em');
				fmdf_fmcontainer_block_headerdisplay(vals["noheader"]);
			}
		};

	//properties settings for cell
	fmdmeta_prop.layout.cell = {
			"includes-properties" : {
				"common" : fmdmeta_prop.common.all.properties
			},
			"properties" : {
				"i18ntype" : {
			    	"name" : fmd_i18n_prop_selectiontype,
			    	"img" : "selection.png",
			    	"cellType" : "ro",
			    	"value" : {"default":fmd_i18n_l_fmcontainer_cell+"(table td)"},
			    	"displayOnly" : true,
			    	"afterProperty" : "id"
			    }/*,
			    "rowspan" : {
			    	"name" : fmd_i18n_t_rowspan,
			    	"img" : "rowspan.png",
			    	"cellType" : "ro",
			    	"value" : {"fromattr":"rowspan", "default":"1"}
			    },
			    "colspan" : {
			    	"name" : fmd_i18n_t_colspan,
			    	"img" : "colspan.png",
			    	"cellType" : "ro",
			    	"value" : {"fromattr":"colspan", "default":"1"}
			    }*/
			},
			"abandon-properties" : ["i18nname"],	//format is array
			"includes-events" : {
				"common" : fmdmeta_prop.common.all.events
			},
			"onApply" : function() {}
		};

	//==================== control ====================

	
	
	//properties settings for text output
	fmdmeta_prop.control.p = {
			//group for element list - basic/composite/custom/extended
			"group" : "basic",
			//control category
			"controlcategory" : "datacontrol",
			//i18n type name
			"i18ntype" : fmd_i18n_el_p,
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
			"abandon-events" : ["onchange"],
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
	
	//properties settings for text textarea
	fmdmeta_prop.control.textarea = {
			//group for element list - basic/composite/custom/extended
			"group" : "basic",
			//control category
			"controlcategory" : "datacontrol",
			//i18n type name
			"i18ntype" : fmd_i18n_el_textarea,
			//html code for dragging
			innerhtml_dragging : '<label class="title">'+fmd_i18n_untitled+'</label><textarea class="medium" name="textarea" cols="20" rows="5" ></textarea>',
			//html code after dropped
			innerhtml_dropped : '<label class="title">'+fmd_i18n_untitled+'</label><textarea class="medium" name="textarea" cols="20" rows="5" ></textarea>',
			"includes-properties" : {
				"common" : fmdmeta_prop.common.all.properties,
				"controlcommon" : fmdmeta_prop.common.datacontrol.properties
			},
			"properties" : {
				"i18ntype" : {
			    	"name" : fmd_i18n_prop_selectiontype,
			    	"img" : "selection.png",
			    	"cellType" : "ro",
			    	"value" : {"default":fmd_i18n_el_textarea},
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
	
	//properties settings for text popupinput
	fmdmeta_prop.control.popupinput = {
			//group for element list - basic/composite/custom/extended
			"group" : "basic",
			//control category
			"controlcategory" : "datacontrol",
			//i18n type name
			"i18ntype" : fmd_i18n_el_popupinput,
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
	
	//properties settings for dhxgrid
	fmdmeta_prop.control.dhxgrid = {
			//group for element list - basic/composite/custom/extended
			"group" : "composite",
			//control category
			"controlcategory" : "datacontrol",
			//i18n type name
			"i18ntype" : fmd_i18n_el_dhxgrid,
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
	
	//properties settings for radio
	fmdmeta_prop.control.radio = {
			//group for element list - basic/composite/custom/extended
			"group" : "basic",
			//control category
			"controlcategory" : "datacontrol",
			//i18n type name
			"i18ntype" : fmd_i18n_el_radio,
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
			    	"value" : {"default":fmd_i18n_el_radio},
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
	
	//properties settings for radio
	fmdmeta_prop.control.checkbox = {
			//group for element list - basic/composite/custom/extended
			"group" : "basic",
			//control category
			"controlcategory" : "datacontrol",
			//i18n type name
			"i18ntype" : fmd_i18n_el_checkbox,
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
			    	"value" : {"default":fmd_i18n_el_checkbox},
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
	
	//properties settings for select
	fmdmeta_prop.control.select = {
			//group for element list - basic/composite/custom/extended
			"group" : "basic",
			//control category
			"controlcategory" : "datacontrol",
			//i18n type name
			"i18ntype" : fmd_i18n_el_select,
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
	
	//properties settings for custom html
	fmdmeta_prop.control.customhtml = {
			//group for element list - basic/composite/custom/extended
			"group" : "extended",
			//control category
			"controlcategory" : "datacontrol",
			//i18n type name
			"i18ntype" : fmd_i18n_el_customhtml,
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
}




