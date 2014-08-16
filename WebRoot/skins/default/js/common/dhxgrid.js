//constant for split keyvalue pairs
var pairro_spliter = '_@!@_';
var bilingualro_spliter = '@';
var splitlangro_spliter = '_@!@_';

//set i18n info into data
function grid_setI18nInfoToGridJson(_gridjson, _columni18n, _delta) {
	if (undefined==typeof(_delta)) {
		_delta = 0;
	}
	for (var j in _columni18n) {
		for (var i in _gridjson.rows) {
			_gridjson.rows[i]["data"][parseInt(j)+_delta] += pairro_spliter + _columni18n[j][_gridjson.rows[i]["data"][parseInt(j)+_delta]];
		}
	}
}

//set i18n info into data
function grid_setI18nInfoToGridJsonByCId(_gridObj, _gridjson, _columni18n, _delta) {
	var delta = 0;
	if (!isNaN(_delta)) {
		delta = _delta;
	}
	for (var j in _columni18n) {
		var ind = _gridObj.getColIndexById(j) - delta;
		for (var i in _gridjson.rows) {
			_gridjson.rows[i]["data"][ind] += pairro_spliter + _columni18n[j][_gridjson.rows[i]["data"][ind]];
		}
	}
}

/**get order columns
*/
dhtmlXGridObject.prototype.grid_getOrderColumns = function() {
	return this['_grid_ordercolumns'];
};

/**set order columns
*/
dhtmlXGridObject.prototype.grid_setOrderColumns = function(ordercolumns) {
	this['_grid_ordercolumns'] = ordercolumns;
};

/**add order column
*/
dhtmlXGridObject.prototype.grid_setColumnOrder = function(_cId) {
	if (!_cId) return;
	if (this['_grid_ordercolumns']==undefined) {
		this['_grid_ordercolumns'] = [];
	}
	var _orcs = this['_grid_ordercolumns'];
	var _orcsnew = [];
	var _dr = "ASC";
	for (var i in _orcs) {
		//alert(_orcs[i][0]+'    '+_cId);
		var f = false;
		for (var key in _orcs[i]) {
			if(key==_cId) {
				//change direction
				if ('ASC'==_orcs[i][_cId]) {
					_dr = 'DESC';
				}
				f = true;
			}
		}
		if (!f) {
			_orcsnew.push(_orcs[i]);
		}
	}
	//add new to first
	var oc = new Object();
	oc[_cId] = _dr;
	_orcsnew.unshift(oc);
	this['_grid_ordercolumns'] = _orcsnew;
	return _dr;
};

//set sort image
dhtmlXGridObject.prototype.grid_setOrderImg = function(ind, _direct) {
	if (!ind || !_direct || !this.hdr.rows) {
		return;
	}
	/*var _imgid = gridName+'_sortimg_'+ind;
	var _newimg = dhtmlx.image_path + 'sort_'+_direct.toLowerCase()+'.gif';
	if ($('#'+_imgid).length) {
		$('#'+_imgid).attr('src',_newimg);
	} else {
		this.hdr.rows[1].childNodes[ind].childNodes[0].innerHTML += '<img id="'+_imgid+'" src="'+_newimg+'"></img>';
		var _sortImg = $('#'+_imgid);
		_sortImg.css('left',"13px");
		_sortImg.css('defLeft',parseInt(_sortImg.css('left')));
		_sortImg.css('top',"5px");
		_sortImg.css('display',"inline");
		_sortImg.css('float',"right");
	}*/
	var _newimg = '<img align="absmiddle" src="'+dhtmlx.image_path + 'sort_'+_direct.toLowerCase()+'.gif" style="float:right"></img>';
	//alert(this.hdr.rows[1].childNodes[ind].childNodes[0].childNodes[0]);
	//alert(this.hdr.rows[1].childNodes[ind].childNodes[0].childNodes[1]);
	if (undefined != this.hdr.rows[1].childNodes[ind].childNodes[0].childNodes[1]) {
		this.hdr.rows[1].childNodes[ind].childNodes[0].childNodes[1].src=dhtmlx.image_path + 'sort_'+_direct.toLowerCase()+'.gif';
	} else {
		//alert(this.hdr.rows[1].childNodes[ind].childNodes[0].innerHTML);
		this.hdr.rows[1].childNodes[ind].childNodes[0].innerHTML += _newimg;
	}
};

//set total number
dhtmlXGridObject.prototype.grid_setTotal = function(pagingareaId, _data) {
	var pagedivwrapper = $("#"+pagingareaId).find(".float_left");
	var totaldiv = pagedivwrapper.find('.gridtotaldiv');
	if (!totaldiv || totaldiv.length==0) {
		pagedivwrapper.append('<div class="gridtotaldiv dhx_toolbar_text"></div>');
		totaldiv = pagedivwrapper.find('.gridtotaldiv');
	}
	totaldiv.html('&nbsp;&nbsp;'+dhtmlXGridObject.prototype.i18n.paging.total+' : '+((_data && _data.total_count) ? _data.total_count : 0));
};

//rewrite event handler for onHeaderClick
function grid_onHeaderClick(ind,obj){
	if (this.getRowsNum()==undefined || this.getRowsNum()==0) {
		return;
	}
	if ('na'==this.fldSort[ind]) {
		return;
	}
	var _cId = this.getColumnId(ind);
	var _direct = this.grid_setColumnOrder(_cId);
	this.grid_setOrderImg(ind, _direct);
	this.refreshPaging();
}

//refresh
dhtmlXGridObject.prototype.refreshPaging = function() {
	var _curPage = this.getStateOfView()[0];//grid_getCurpage(varmtd);
	if (_curPage!=undefined) {
		this.changePage(_curPage);
	}
};

//set language
dhtmlXGridObject.prototype.setLang = function(lang) {
	this._lang = lang;
};

//set language, default is english
dhtmlXGridObject.prototype.getLang = function() {
	if (!this._lang) {
		this._lang = 'en';
	}
	return this._lang;
};

//set custom excell types after init
dhtmlXGridObject.prototype.setCustomColumnExcellTypes = function(_ct) {
	for (var i in _ct) {
		this.setColumnExcellType(this.getColIndexById(i), _ct[i]);
	}
};

//get excell type of cell
dhtmlXGridObject.prototype.getCellExcellType = function (_rowid, ind) {
	var d = this.cells3(this.getRowById(_rowid), ind);
	var ct = d.cell._cellType;
	if (!ct) {
		return this.cellType[ind];
	} else {
		return ct;
	}
};

//get result columns from metadata
function grid_getResultColumnsInfoFromGridInfo(_metadata) {
	var _cols = _metadata.column;
	var _dtypes = _metadata.displaytype.split(',');
	var _rscols = [];
	for (var i=0; i<_cols.length; i++) {
		var _alias = _cols[i];
		var _indx = _alias.indexOf('_');
		var _column = _alias.substr(0, _indx) + '.' + _alias.substr(_indx+1);
		_rscols.push({"column":_column,"alias":_alias,"type":_dtypes[i]});
	}
	return _rscols;
}

//set current page, return if the page is changed
/*function grid_setCurpage(pageGlobalVar, pageInd) {
	if (pageGlobalVar.currentPage==undefined || pageGlobalVar.currentPage!=pageInd) {
		pageGlobalVar.currentPage = pageInd;
		return true;
	}
	return false;
}*/

//reverse boolean string like 'true,true,false' to 'false,false,true'
function grid_reverseBoolstr(bstr) {
	if (bstr==null || bstr=='') {
		return '';
	}
	var bstrl = bstr.split(",");
	var rtn = '';
	for (var i=0; i<bstrl.length; i++) {
		if (i>0) {
			rtn += ',';
		}
		if ('true'==bstrl[i]) {
			rtn += 'false';
		} else {
			rtn += 'true';
		}
	}
	return rtn;
}


//get current page
/*function grid_getCurpage(pageGlobalVar) {
	return pageGlobalVar.currentPage;
}*/

//create pairro excel type, data type like "KEY_@!@_VALUE"
function eXcell_pairro(cell){//excell name is defined here
    if (cell){
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}; //read-only cell doesn't have edit method
    this.isDisabled = function(){ return true; }; // the cell is read-only, that's why it is always in the disabled state
    this.setValue=function(val) {
    	if (undefined!=val) {
    		var keyvalue = (val.toString()).split(pairro_spliter, 2);
    		//alert(this.cell.parentNode.idd+'  '+this.cell._cellIndex+'     '+keyvalue.length+'    '+keyvalue[0]+'='+keyvalue[1]);
    		this.setCValue("<span style='display:none'>"+keyvalue[0]+"</span>"+(keyvalue.length==1?keyvalue[0]:(keyvalue[1]=='undefined'?'':keyvalue[1])),val);
    	} else {
    		this.setCValue("<span style='display:none'></span>",val);
    	}
    	//this.setCValue("<span style='display:none'>"+val+"</span>"+val);
    };
    this.getValue=function(){
    	return this.cell.childNodes[0].innerHTML; // get value
    	//return this.cell.innerHTML;
    };
}
eXcell_pairro.prototype = new eXcell;

//create bilingual excel type, data type like "VALUE_zh@VALUE_en"
function eXcell_bilingualro(cell){//excell name is defined here
    if (cell){
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}; //read-only cell doesn't have edit method
    this.isDisabled = function(){ return true; }; // the cell is read-only, that's why it is always in the disabled state
    this.setValue=function(val) {
    	if (undefined!=val) {
    		var keyvalue = (val.toString()).split(bilingualro_spliter, 2);
    		var dval = null;
    		if (keyvalue.length==1) {
    			dval = keyvalue[0];
    		} else {
    			if ('zh'==this.grid.getLang()) {
    				dval = keyvalue[0];
    			} else {
    				dval = keyvalue[1];
    			}
    		}
    		this.setCValue("<span style='display:none'>"+val+"</span>"+dval,val);
    	} else {
    		this.setCValue("<span style='display:none'></span>",val);
    	}
    	//this.setCValue("<span style='display:none'>"+val+"</span>"+val);
    };
    this.getValue=function(){
    	return this.getValueByLang();
    };
    this.getValueByLang=function(_lang){
    	if (undefined==_lang) {
    		return this.cell.childNodes[0].innerHTML; // get value
    	} else if ('zh'==_lang) {
    		var val = this.cell.childNodes[0].innerHTML;
    		return val.split(bilingualro_spliter, 2)[0];
    	} else {
    		var val = this.cell.childNodes[0].innerHTML;
    		var keyvalue = val.split(bilingualro_spliter, 2);
    		if (keyvalue.length==1) {
    			return keyvalue[0];
    		} else {
    			return keyvalue[1];
    		}
    	}
    };
}
eXcell_bilingualro.prototype = new eXcell;

//split mode language excel type, data type like "EN@!VALUE_en_@!@_HU@!VALUE_hu_@!@_ZH@!VALUE_zh"
function eXcell_splitlangro(cell){//excell name is defined here
    if (cell){
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}; //read-only cell doesn't have edit method
    this.isDisabled = function(){ return true; }; // the cell is read-only, that's why it is always in the disabled state
    this.setValue=function(val) {
    	if (undefined!=val) {
    		var keyvalue = (val.toString()).split(splitlangro_spliter);
    		var dval = '';
    		if (keyvalue.length==1) {
    			dval = keyvalue[0];
    		} else {
    			try {
    				for (var i=0;i<keyvalue.length;i++) {
        				var langtag = keyvalue[i].substr(0,2);
        				if(langtag=='CN' && this.grid.getLang()=='zh') {
        					dval = keyvalue[i].substr(4);
        				} else if(langtag=='EN' && this.grid.getLang()=='en') {
        					dval = keyvalue[i].substr(4);
        				} else if(langtag=='HU' && this.grid.getLang()=='hu') {
        					dval = keyvalue[i].substr(4);
        				}
        			}
    			}catch(e){}
    		}
    		this.setCValue(dval,dval);
    	} else {
    		this.setCValue('','');
    	}
    	//this.setCValue("<span style='display:none'>"+val+"</span>"+val);
    };
}
eXcell_splitlangro.prototype = new eXcell;

//new eXcell type - cblist, is a checkbox list represents key-value pairs data
function eXcell_cblist(cell){
	try{
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
	}catch(er){
	}
	//edit
	this.edit = function(){
		///alert("this.getValue()="+this.getValue());
		//alert("this.getValue(0)="+this.getValue(0));
		this.val = this.getValue();
		var _listval = this.getValue(0);
		if (_listval==undefined || _listval=='') {
			return;
		}
        var a = JSON.parse(_listval);
        if (!a) return;
		this.obj = document.createElement("DIV");
        var b=this.val.split(",");
        var text="";

        for (var i=0; i<a.length; i++){
            var fl=false;
            for (var j=0; j<b.length; j++) {
            	if (a[i][0]==b[j]) fl=true;
            }
            if (fl) {
            	text+="<div style='white-space:nowrap'><input type='checkbox' checked='true' value='"+a[i][0]+"'/><label for='dhx_clist_"+i+"'>"+a[i][1]+"</label></div>";
            } else {
            	text+="<div style='white-space:nowrap'><input type='checkbox' value='"+a[i][0]+"'/><label for='dhx_clist_"+i+"'>"+a[i][1]+"</label></div>";
            }
        }
        text+="<div><input type='hidden'></input><input type='button' value='OK' class='btn_picok' onclick='this.parentNode.childNodes[0].value=\"clicked\";this.parentNode.parentNode.editor.grid.editStop();'/><input type='button' value='X' class='btn_piccancel' onclick='this.parentNode.parentNode.editor.grid.editStop();'/></div>";

        this.obj.editor=this;
        this.obj.innerHTML=text;
        document.body.appendChild(this.obj);
        this.obj.style.position="absolute";
        this.obj.style.width="150px";
        this.obj.style.height="100px";
        this.obj.style.overflow="auto";
		this.obj.className="dhx_cblist";
		this.obj.onclick=function(e){  (e||event).cancelBubble=true; return true; };
		var arPos = this.grid.getPosition(this.cell);
        this.obj.style.left=arPos[0]+"px";
        this.obj.style.top=arPos[1]+this.cell.offsetHeight+"px";

        this.obj.getValue=function(){
            var text="";
            for (var i=0; i<this.childNodes.length-1; i++) {
                if (this.childNodes[i].childNodes[0].checked){
                    if (text) text+=",";
                    text+=this.childNodes[i].childNodes[0].value;
                }
            }
            return text.replace(/&amp;/g,"&");
        };
        this.obj.getDisplayValue=function(){
            var text="";
            for (var i=0; i<this.childNodes.length-1; i++) {
                if (this.childNodes[i].childNodes[0].checked){
                    if (text) text+=",";
                    text+=this.childNodes[i].childNodes[1].innerHTML;
                }
        	}
            return text.replace(/&amp;/g,"&");
        };
        this.obj.isOk=function(){
            return this.childNodes[this.childNodes.length-1].childNodes[0].value=='clicked';
        };
	};
	//get value
	this.getValue = function(i){
		//this.grid.editStop();
		if (this.cell._clearCell) return "";
		//return this.cell.innerHTML.toString()._dhx_trim().replace(/&amp;/g,"&");
		if (this.cell.innerHTML=='' || this.cell.childNodes[i!=undefined?i:1]==undefined) {
			return undefined;
		}
		return this.cell.childNodes[i!=undefined?i:1].innerHTML; // get value
	};
	//detach
	this.detach = function(val){
		//alert('detach, this.obj.isOk()='+this.obj.isOk());
        if (this.obj){
        	if (this.obj.isOk()) {
        		//alert('detach and setvalue this.obj.getValue()='+this.obj.getValue()+' this.obj.getDisplayValue()='+this.obj.getDisplayValue());
    			this.setValue(this.obj.getValue(), this.obj.getDisplayValue());
        	}
            this.obj.editor=null;
            this.obj.parentNode.removeChild(this.obj);
            this.obj=null;
        }
		return this.val!=this.getValue();
	};
	//set value
	this.setValue = function(val, dispval){
		//alert('setValue val='+val+"  dispval="+dispval);
		if (val==undefined || val==="" || val === this.undefined || this.getValue(0)==''){
			this.val = '';
			if (this.cell.childNodes[1]) {
				this.cell.childNodes[1].innerHTML = '';
				this.cell.childNodes[2].innerHTML = '';
			}
			//this.cell._clearCell=true;
			this.setCValue(this.cell.innerHTML, this.val);//must call to enable cellchanged event
			//this.cell._clearCell=false;
		} else{
			if (typeof(val)=="string"){
				this.val = val;
			} else if (typeof(val)=="object") {
				this.val = JSON.stringify(val);
			}
	    	//this.setCTxtValue(val);
			if (typeof(dispval)=="string"){
				this.dispval = dispval;
			} else if (typeof(dispval)=="object") {
				this.dispval = JSON.stringify(dispval);
			}
	    	
	    	//alert(_rId+"   "+_cId); 
	        //this.setCValue('<span style="display:none">'+this.val+'</span><span>1</span><span>2</span>', val);
			this.setCValue(this.cell.innerHTML, this.val);//must call to enable cellchanged event
			this.cell.childNodes[1].innerHTML = this.val;
			this.cell.childNodes[2].innerHTML = this.dispval;
			this.cell._clearCell=false;
	    }
	};
	//init list data before using
	this.setList = function(list, val, dispval){
		//alert('setList typeof(list)='+typeof(list)+"  val="+list);
		if (list==="" || list === this.undefined){
			this.setCTxtValue("",list);
			this.cell._clearCell=true;
		} else{
			//set list
			if (typeof(list)=="string"){
				this.list = list;
			} else if (typeof(list)=="object") {
				this.list = JSON.stringify(list);
			}
	    	//this.setCTxtValue(val);
			//set value
			if (val==undefined) {
				this.val = '';
			} else {
				this.val = val;
			}//
			if (dispval==undefined) {
				this.dispval = '';
			} else {
				this.dispval = dispval;
			}
	        this.setCValue('<span style="display:none">'+this.list+'</span><span style="display:none">'+this.val+'</span><span>'+this.dispval+'</span>', val);
	    	this.cell._clearCell=false;
	    }
	};
}
eXcell_cblist.prototype = new eXcell;//new eXcell type

