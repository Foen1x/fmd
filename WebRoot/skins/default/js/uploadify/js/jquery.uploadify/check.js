function getFilePath(){ 

//判断浏览器类型
    var isIE = (document.all) ? true : false;
    var isIE7 = isIE && (navigator.userAgent.indexOf('MSIE 7.0') != -1); 
    var isIE8 = isIE && (navigator.userAgent.indexOf('MSIE 8.0') != -1); 

    var file=document.getElementById("uploadify");
    if(isIE7 || isIE8)
    { 
        file.select();
        var path=document.selection.createRange().text; 
        document.selection.empty(); 
        return path;
    }

      //但是在火狐下还是没办法获取文件路径，看到网上有人说用getAsDataURL()方法可以获取路径。我测试了一下，用这个方法确实是可以获得路径，但是些路径是被加密过的。于是继续寻找其他方法。。。
      //火狐下获取上传文件路径的方法，需要先修改设置。在地址栏输入about:config，然后修改signed.applets.codebase_principal_support的键值，将值修改为true。然后再使用如下代码，就可以获得文件路径。
      //复制内容到剪贴板 程序代码
    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    } 
    catch (e) {
        alert('请更改浏览器设置');
        return;
    }

    var fname = document.getElementById("uploadify").value;
    var file = Components.classes["@mozilla.org/file/local;1"]
        .createInstance(Components.interfaces.nsILocalFile);
    try {
        // Back slashes for windows
        file.initWithPath( fname.replace(/\//g, "\\\\") );
    }
    catch(e) {
        if (e.result!=Components.results.NS_ERROR_FILE_UNRECOGNIZED_PATH) throw e;
        alert('无法加载文件');
        return;
    }

    alert(file.path);  //取得文件路径
    return file.path;
}
