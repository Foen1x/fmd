//dhtmlxwindow
var fm_dhxWins;

//create a window and return the reference
function fm_createWindow(_wid, _title, _width, _height, icon) {
	if(!fm_dhxWins) fm_dhxWins = new dhtmlXWindows();
	if (fm_dhxWins.isWindow(_wid)) {
		return;
	}
	var _newwin = fm_dhxWins.createWindow(_wid, 10, 10, _width, _height);
	_newwin.setText(_title);
	icon && _newwin.setIcon(icon);
	_newwin.setModal(true);
	_newwin.button('park').hide();
	_newwin.button('minmax1').hide();
	return _newwin;
}

//create a centered window and return the reference
function fm_createCenterWindow(_wid, _title, _width, _height, icon) {
	var _newwin = fm_createWindow(_wid, _title, _width, _height, icon);
	_newwin.center();
	return _newwin;
}

//create a centered window and return the reference
function fm_createCenterWindowLayout(_wid, _title, _width, _height, _layoutPattern, dhxSkin, icon) {
	var _newwin = fm_createCenterWindow(_wid, _title, _width, _height, icon);
	if (typeof(_layoutPattern)==undefined) {
		_layoutPattern = "1C";
	}
	var _lo = _newwin.attachLayout(_layoutPattern, dhxSkin);
	return _lo;
}

//close a window by id, window must be alive
function fm_getWindow(_wid) {
	return fm_dhxWins.window(_wid);
}

//close a window by id, window must be alive
function fm_closeWindow(_wid) {
	fm_dhxWins.window(_wid).close();
}
