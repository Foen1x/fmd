//dhtmlxwindow
var ecs_dhxWins;

//create a window and return the reference
function ecs_createWindow(_wid, _title, _width, _height) {
	if(!ecs_dhxWins) ecs_dhxWins = new dhtmlXWindows();
	if (ecs_dhxWins.isWindow(_wid)) {
		return;
	}
	var _newwin = ecs_dhxWins.createWindow(_wid, 10, 10, _width, _height);
	_newwin.setText(_title);
	_newwin.setModal(true);
	_newwin.button('park').hide();
	_newwin.button('minmax1').hide();
	return _newwin;
}

//create a centered window and return the reference
function ecs_createCenterWindow(_wid, _title, _width, _height) {
	var _newwin = ecs_createWindow(_wid, _title, _width, _height);
	_newwin.center();
	return _newwin;
}

//create a centered window and return the reference
function ecs_createCenterWindowLayout(_wid, _title, _width, _height, _layoutPattern, dhxSkin) {
	var _newwin = ecs_createCenterWindow(_wid, _title, _width, _height);
	if (typeof(_layoutPattern)==undefined) {
		_layoutPattern = "1C";
	}
	var _lo = _newwin.attachLayout(_layoutPattern, dhxSkin);
	return _lo;
}

//close a window by id, window must be alive
function ecs_getWindow(_wid) {
	return ecs_dhxWins.window(_wid);
}

//close a window by id, window must be alive
function ecs_closeWindow(_wid) {
	ecs_dhxWins.window(_wid).close();
}
