package com.tss.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringWriter;
import java.util.logging.Logger;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.web.util.HtmlUtils;

import com.sun.org.apache.xml.internal.serialize.OutputFormat;


public class HtmlUtil {

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
	
	public static String formatHtml(String str) throws Exception {
		Document doc = Jsoup.parse(str);
		return doc.html();
	}
	
	public static void main(String[] args) throws Exception {
		System.out.println(formatHtml("<div id='fmcontainer_tab_1'><span><div id='fmcontainer_block_1'><span><div><span><div id='ui-id-2'><span><div id='ui-id-3'><span><span></div><span></div><span></div><span></div><span></div>"));
	}

}
