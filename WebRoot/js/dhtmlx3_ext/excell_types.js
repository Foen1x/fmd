//v.3.6 build 130417

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
//function eXcell_link(a){this.cell=a;this.grid=this.cell.parentNode.grid;this.isDisabled=function(){return!0};this.edit=function(){};this.getValue=function(){if(this.cell.firstChild.getAttribute){var a=this.cell.firstChild.getAttribute("target");return this.cell.firstChild.innerHTML+"^"+this.cell.firstChild.getAttribute("href")+(a?"^"+a:"")}else return""};this.setValue=function(a){if(typeof a!="number"&&(!a||a.toString()._dhx_trim()==""))return this.setCValue("&nbsp;",b),this.cell._clearCell=!0;var b=
//a.split("^");b.length==1?b[1]="":b.length>1&&(b[1]="href='"+b[1]+"'",b[1]+=b.length==3?" target='"+b[2]+"'":" target='_blank'");this.setCValue("<a "+b[1]+" onclick='(_isIE?event:arguments[0]).cancelBubble = true;'>"+b[0]+"</a>",b)}}eXcell_link.prototype=new eXcell;eXcell_link.prototype.getTitle=function(){var a=this.cell.firstChild;return a&&a.tagName?a.getAttribute("href"):""};eXcell_link.prototype.getContent=function(){var a=this.cell.firstChild;return a&&a.tagName?a.innerHTML:""};


/**
 * show ace editor
 * @param rId
 * @param cId
 * @param mode
 */
function fmdexf_showAceEditor(rId, cId, title, mode, isEditor) {
	//alert(rId+"="+cId+"="+mode);
	var lo1 = fm_createCenterWindowLayout("win_prop_style", title, 800, 600, "1C", dhx_skin, "script.png");
	var obj = document.createElement("div");
	obj.id="prop_ace_editor";
	lo1.cells("a").hideHeader();
	lo1.cells("a").attachObject(obj);
	//editor
	var prop_ace_editor = ace.edit("prop_ace_editor");
	prop_ace_editor.setTheme("ace/theme/tomorrow");
	prop_ace_editor.getSession().setMode("ace/mode/"+mode);
	prop_ace_editor.setValue(fmdc.grid_prop.cells(rId, cId).getValue());
	if (!isEditor) {
		prop_ace_editor.setReadOnly(true);
	} else {
		//toolbar
		var tb = lo1.cells("a").attachToolbar();
		tb.setIconsPath(fmdc.imagepath);
		tb.addButton('ok', 0, fmd_i18n_b_ok, 'ok.png', null);
		tb.attachEvent("onClick", function(id){
			if ("ok"==id) {
				fmdc.grid_prop.cells(rId, cId).setValue(prop_ace_editor.getValue());
				fm_closeWindow("win_prop_style");
			}
		});
	}
}

/**
 * show ace javascript editor
 * @param rId
 * @param cId
 * @param mode
 */
function fmdexf_showAceEditorJs(rId, cId, title, mode, isEditor) {
	//alert(" rId="+rId+" cId="+cId+" mode="+mode);
	var lo1 = fm_createCenterWindowLayout("win_prop_style", title, 800, 600, "2E", dhx_skin, "script.png");
	var obj = document.createElement("div");
	obj.id="prop_ace_editor";
	lo1.cells("a").hideHeader();
	lo1.cells("b").hideHeader();
	lo1.cells("b").attachObject(obj);
	//signature
	var args = fmdc.grid_prop.cells(rId, cId).getArgs();
	if (args) {
		var str1 = "<p style='font-size:0.75em'>"+ fmd_i18n_funcsignature + " function(";
		var arg1 = "";
		var j=0;
		for (var i in args) {
			if (j) {
				str1 += ","; 
				arg1+="</br>";
			};
			str1 += i;
			arg1 += i + " : " + args[i];
			j++;
		}
		str1 += "){...}</br>"+arg1+"</p>";
		lo1.cells("a").setHeight(120);
		lo1.cells("a").attachHTMLString(str1);
	} else {
		lo1.cells("a").setHeight(120);
		lo1.cells("a").attachHTMLString("<p style='font-size:0.75em'>"+ fmd_i18n_funcsignature + " function(){...}</p>");
	}
	
	//editor
	var prop_ace_editor = ace.edit("prop_ace_editor");
	prop_ace_editor.setTheme("ace/theme/tomorrow");
	prop_ace_editor.getSession().setMode("ace/mode/"+mode);
	prop_ace_editor.setValue(fmdc.grid_prop.cells(rId, cId).getValue());
	if (!isEditor) {
		prop_ace_editor.setReadOnly(true);
	} else {
		//toolbar
		var tb = lo1.cells("a").attachToolbar();
		tb.setIconsPath(fmdc.imagepath);
		tb.addButton('ok', 0, fmd_i18n_b_ok, 'ok.png', null);
		tb.attachEvent("onClick", function(id){
			if ("ok"==id) {
				fmdc.grid_prop.cells(rId, cId).setValue(prop_ace_editor.getValue());
				fm_closeWindow("win_prop_style");
			}
		});
	}
}


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

//i18n excell type
function eXcell_i18n(cell) { //excell name is defined here
	if (cell) { //default pattern, just copy it
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
	};
	this.setValue = function(val) {
		this.setCValue(val);
	};
	this.getValue = function() {
		return this.cell.innerHTML; // get value
	};
	this.edit = function() {
		this.val = this.getValue(); //save current value
		this.cell.innerHTML = "<input type='text' style='width:50px;'><select style='width:50px;'><option value='AM'>AM<option value='PM'>PM</select>"; // editor's html
		this.cell.firstChild.value = parseInt(this.val); //set the first part of data

		this.cell.childNodes[0].onclick = function(e) {
			(e || event).cancelBubble = true;
		}; //block onclick event
		this.cell.childNodes[1].onclick = function(e) {
			(e || event).cancelBubble = true;
		}; //block onclick event
	};
	this.detach = function() {
		this.setValue(this.cell.childNodes[0].value + " "
				+ this.cell.childNodes[1].value); //set the new value
		return this.val != this.getValue(); // compare the new and the old values
	};
}
eXcell_i18n.prototype = new eXcell; // nest all other methods from base class


//ace_css excell type
function eXcell_ace_text(cell) { //excell name is defined here
	if (cell) { //default pattern, just copy it
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
		//this.cell.innerHTML = "<input type='hidden'/><img src='"+this.grid.extIconPath+"display.png"+"'/>";
	};
	this.edit = function(){}; //read-only cell doesn't have edit method
    this.isDisabled = function(){ return true; };
	this.setValue = function(val) {
		var rId=this.cell.parentNode.idd;	//rowId
    	var cId=this.cell._cellIndex;	//column index
		var imgName = val ? "update.gif" : "new.gif";
		var alt = this.grid.isEditor ? (val ? fmd_i18n_b_edit : fmd_i18n_b_add) : fmd_i18n_b_view;
		this.setCValue("<input type='hidden' value='"+val+"'/><img src='"+this.grid.extIconPath+imgName+
				"' style='cursor:pointer;' align='absmiddle' onclick='fmdexf_showAceEditor(\""+
				rId+"\", "+cId+", \""+fmd_i18n_style+"\", \"text\", "+this.grid.isEditor+")' " +
				"onmouseover='changeicosize(this,true)' onmouseout='changeicosize(this,false)'/>"+alt, 
				val);
	};
	this.getValue = function() {
		return this.cell.firstChild.value; // get value
	};
}
eXcell_ace_text.prototype = new eXcell; // nest all other methods from base class

//ace_script excell type
function eXcell_ace_javascript(cell) { //excell name is defined here
	if (cell) {
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
	};
	this.edit = function(){}; //read-only cell doesn't have edit method
    this.isDisabled = function(){ return true; };
    this.setArgs = function(args) {
    	console.debug("setArgs="+JSON.stringify(args));
    	this.cell.childNodes[1].value = args ? JSON.stringify(args) : "";
	};
	this.setValue = function(val) {
		var rId=this.cell.parentNode.idd;	//rowId
    	var cId=this.cell._cellIndex;	//column index
    	this.cell.firstChild.value = val;
		var imgName = val ? "update.gif" : "new.gif";
		var alt = this.grid.isEditor ? (val ? fmd_i18n_b_edit : fmd_i18n_b_add) : fmd_i18n_b_view;
		var args = (this.cell.childNodes && this.cell.childNodes.length>1 && this.cell.childNodes[1] && this.cell.childNodes[1].value) 
				? this.cell.childNodes[1].value : "";
		this.setCValue("<input type='hidden' value='"+val+"'/><input type='hidden' value='"+args+"'/><img src='"+this.grid.extIconPath+imgName+
				"' style='cursor:pointer;' align='absmiddle' onclick='fmdexf_showAceEditorJs(\""+
				rId+"\", "+cId+", \""+fmd_i18n_javascript+"\", \"javascript\", "+this.grid.isEditor+")' " +
				"onmouseover='changeicosize(this,true)' onmouseout='changeicosize(this,false)'/><span>"+alt+"</span>", 
				val);
		return true;
	};
	this.getArgs = function() {
		console.debug("this.cell.childNodes[1].value="+this.cell.childNodes[1].value);
		return this.cell.childNodes[1].value ? JSON.parse(this.cell.childNodes[1].value) : null; // get value
	};
	this.getValue = function() {
		return this.cell.firstChild.value; // get value
	};
}
eXcell_ace_javascript.prototype = new eXcell; // nest all other methods from base class

//ace_html excell type
function eXcell_ace_html(cell) { //excell name is defined here
	if (cell) { //default pattern, just copy it
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
		//this.cell.innerHTML = "<input type='hidden'/><img src='"+this.grid.extIconPath+"display.png"+"'/>";
	};
	this.edit = function(){}; //read-only cell doesn't have edit method
    this.isDisabled = function(){ return true; };
	this.setValue = function(val) {
		var rId=this.cell.parentNode.idd;	//rowId
    	var cId=this.cell._cellIndex;	//column index
		var imgName = val ? "update.gif" : "new.gif";
		var alt = val ? fmd_i18n_b_edit : fmd_i18n_b_add;
		this.setCValue("<input type='hidden' value='"+val+"'/><img src='"+this.grid.extIconPath+imgName+
				"' style='cursor:pointer;' align='absmiddle' onclick='fmdexf_showAceEditor(\""+
				rId+"\", "+cId+", \""+fmd_i18n_style+"\", \"html_completions\", "+this.grid.isEditor+")' " +
				"onmouseover='changeicosize(this,true)' onmouseout='changeicosize(this,false)'/>"+alt, 
				val);
	};
	this.getValue = function() {
		return this.cell.firstChild.value; // get value
	};
}
eXcell_ace_html.prototype = new eXcell; // nest all other methods from base class

//data binding excell type
function eXcell_databinding(a) {
	if (a)
		this.cell = a, this.grid = this.cell.parentNode.grid;
	this.edit = function () {
		this.cell.atag = !this.grid.multiLine && (_isKHTML || _isMacOS || _isFF) ? "INPUT" : "TEXTAREA";
		this.val = this.getValue();
		this.obj = document.createElement(this.cell.atag);
		this.obj.setAttribute("autocomplete", "off");
		this.obj.style.height = this.cell.offsetHeight - (_isIE ? 4 : 4) + "px";
		this.obj.className = "dhx_combo_edit";
		this.obj.wrap = "soft";
		this.obj.style.textAlign = this.cell.style.textAlign;
		this.obj.onclick = function (a) {
			(a || event).cancelBubble =
				!0;
		};
		this.obj.onmousedown = function (a) {
			(a || event).cancelBubble = !0;
		};
		this.obj.value = this.val;
		this.cell.innerHTML = "";
		this.cell.appendChild(this.obj);
		this.obj.onselectstart = function (a) {
			a || (a = event);
			return a.cancelBubble = !0;
		};
		_isIE && this.obj.focus();
		this.obj.focus();
	};
	this.getValue = function () {
		return this.cell.firstChild && this.cell.atag && this.cell.firstChild.tagName == this.cell.atag ? this.cell.firstChild.value : this.cell._clearCell ? "" : this.cell.innerHTML.toString()._dhx_trim();
	};
	this.detach = function () {
		this.setValue(this.obj.value);
		return this.val != this.getValue();
	};
}
//data binding excell type
eXcell_databinding.prototype = new eXcell;

//process binding excell type
function eXcell_processbinding(a) {
	if (a)
		this.cell = a, this.grid = this.cell.parentNode.grid;
	this.edit = function () {
		this.cell.atag = !this.grid.multiLine && (_isKHTML || _isMacOS || _isFF) ? "INPUT" : "TEXTAREA";
		this.val = this.getValue();
		this.obj = document.createElement(this.cell.atag);
		this.obj.setAttribute("autocomplete", "off");
		this.obj.style.height = this.cell.offsetHeight - (_isIE ? 4 : 4) + "px";
		this.obj.className = "dhx_combo_edit";
		this.obj.wrap = "soft";
		this.obj.style.textAlign = this.cell.style.textAlign;
		this.obj.onclick = function (a) {
			(a || event).cancelBubble =
				!0;
		};
		this.obj.onmousedown = function (a) {
			(a || event).cancelBubble = !0;
		};
		this.obj.value = this.val;
		this.cell.innerHTML = "";
		this.cell.appendChild(this.obj);
		this.obj.onselectstart = function (a) {
			a || (a = event);
			return a.cancelBubble = !0;
		};
		_isIE && this.obj.focus();
		this.obj.focus();
	};
	this.getValue = function () {
		return this.cell.firstChild && this.cell.atag && this.cell.firstChild.tagName == this.cell.atag ? this.cell.firstChild.value : this.cell._clearCell ? "" : this.cell.innerHTML.toString()._dhx_trim();
	};
	this.detach = function () {
		this.setValue(this.obj.value);
		return this.val != this.getValue();
	};
}
//process binding excell type
eXcell_processbinding.prototype = new eXcell;





