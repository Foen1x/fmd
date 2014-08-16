package com.tss.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.util.logging.Logger;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;


public class HtmlUtil {
	
	private static Logger logger = Logger.getLogger(HtmlUtil.class.getName());

	/*public static StringBuilder tidy(String content) throws IOException {
		
        Tidy tidy = new Tidy();  
        
        InputStream is  = new ByteArrayInputStream(content.getBytes("UTF-8"));
        OutputStream os2 = new ByteArrayOutputStream();  
        tidy.setXHTML(true); // 设定输出为xhtml(还可以输出为xml)  
        tidy.setCharEncoding(Configuration.UTF8); // 设定编码以正常转换中文  
        tidy.setTidyMark(false); // 不设置它会在输出的文件中给加条meta信息  
        tidy.setXmlPi(false); // 让它加上<?xml version="1.0"?>  
        tidy.setIndentContent(true); // 缩进，可以省略，只是让格式看起来漂亮一些  
        //tidy.setDocType("html");
        tidy.parse(is, os2);  

        is.close();  

        // 解决乱码 --将转换后的输出流重新读取改变编码  
        String temp;
        StringBuilder sb = new StringBuilder();
        BufferedReader in = new BufferedReader(new InputStreamReader(
                new ByteArrayInputStream(
                        ((ByteArrayOutputStream) os2).toByteArray()),
                "utf-8"));
        while ((temp = in.readLine()) != null) {
            sb.append(temp);
        }
        os2.flush();
        os2.close();
        
        return sb;
		
	}*/
	
	/**
	 * format html code using jsoup
	 * @param str
	 * @return
	 * @throws Exception
	 */
	public static String formatHtmlCode(String str) throws Exception {
		Document doc = Jsoup.parse(str);
		String html = doc.body().html();
		return html.replace("&lt;%", "<%").replace("%&gt;", "%>");
	}
	
	/**
	 * format full html document using jsoup
	 * @param str
	 * @return
	 * @throws Exception
	 */
	public static String formatHtmlDoc(String str) throws Exception {
		Document doc = Jsoup.parse(str);
		String html = doc.html();
		return html.replaceAll("&lt;%", "<%").replaceAll("%&gt;", "%>");
	}
	
	/**
	 * generate form file to preview folder
	 * @param htmlCode
	 * @throws IOException 
	 */
	public static void generatedPreviewFile(String path, String htmlCode) throws IOException {
		logger.finer("writing file:"+path);
		BufferedReader in = new BufferedReader(new StringReader(htmlCode));
		PrintWriter out = new PrintWriter(new FileWriter(path));
		String s;
		while ((s = in.readLine()) != null) {
			out.println(s);
		}
		in.close();
		out.flush();
		out.close();
	}
	
	/**
	 * get relative path of preview
	 * @param skin
	 * @param formid
	 * @param versionid
	 * @return
	 */
	public static String getPreviewRelativePath(String skin) {
		String path = FmdSettings.getValue("preview.folder") + "/"+skin;
		File pathf = new File(path+"/generated");
		if (!pathf.exists()) {
			pathf.mkdirs();
		}
		return path;
	}
	
	/**
	 * get relative path of preview
	 * @param skin
	 * @param formid
	 * @param versionid
	 * @return
	 */
	public static String getPreviewFileName(String formid, String versionid, String lang) {
		return formid+"-"+versionid+"-"+lang+".jsp";
	}
	
	public static void main(String[] args) throws Exception {
		System.out.println(formatHtmlCode("<div id='<%=path%>fmcontainer_tab_1'></div>"));
	}

}
