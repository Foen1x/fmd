//valid class names splited by space
dhtmlxValidation.isValidClassNames=function(a){
	if (!a) return true;
	var b = a.split(' ');
	for (var i in b) {
		if (!b[i].toString().match(/^[_\-a-zA-Z][a-zA-Z0-9_-]*$/gi)) return false;
	}
    return true;
};


