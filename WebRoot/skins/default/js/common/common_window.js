//open a window by url
function ecs_openWindowByUrl(_id, _url) {
	var a1new = document.createElement("a");
	a1new.setAttribute("href", _url);
	a1new.setAttribute("target", "_blank");
	a1new.setAttribute("id", "openwin_"+_id);
	document.body.appendChild(a1new);
	a1new.click();
}


