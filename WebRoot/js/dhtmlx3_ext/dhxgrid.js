//constant for split keyvalue pairs
var pairro_spliter = '_@!@_';
var bilingualro_spliter = '@';
var splitlangro_spliter = '_@!@_';

//set json column data to string data
function grid_jsoncolumnToStrInGridJson(_gridJson, columnIndixes) {
	if (_gridJson==undefined || _gridJson.rows==undefined || _gridJson.length==0) {
		return;
	}
	for (var i in _gridJson.rows) {
		for (var j in columnIndixes) {
			var _jsoncoldata = _gridJson.rows[i]["data"][columnIndixes[j]];
			var _newcoldata = '';
			if (undefined!=_jsoncoldata) {
				_newcoldata = JSON.stringify(_jsoncoldata);
			}
			_gridJson.rows[i]["data"][columnIndixes[j]] = _newcoldata;
		}
	}
}

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
	var _newimg = '<img align="absmiddle" src="'+dhtmlx.image_path + 'sort_'+_direct.toLowerCase()+'.gif" style="align:absmiddle;float:right"></img>';
	if (undefined != this.hdr.rows[1].childNodes[ind].childNodes[0].childNodes[1]) {
		this.hdr.rows[1].childNodes[ind].childNodes[0].childNodes[1].src=dhtmlx.image_path + 'sort_'+_direct.toLowerCase()+'.gif';
	} else {
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


