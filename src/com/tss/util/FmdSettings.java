package com.tss.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * utility for getting properties
 * @author fuzheng
 *
 */
public class FmdSettings {
	
	public static final String FMDSETTINGS = "fmdsettings";
	public static final String FORMVARS = "formvars";
	
	public static final String MODULE_PATH_BASE = "modules.path.base";
	public static final String MODULE_PATH_CONTROL = "modules.path.control";
	public static final String MODULE_PATH_LAYOUT = "modules.path.layout";
	public static final String PARSER_IMPL = "parser.impl";
	
	private static Map<String, Properties> config = null;

	static {
		config = new HashMap<String, Properties>();
	}

	//
	public static String getValue(String key) {
		return getValue(FMDSETTINGS, key);
	}
	
	//
	public static String getValue(String propName, String key) {
		try {
			Properties p = config.get(propName);
			if (p==null) {
				load(propName);
				p = config.get(propName);
			}
			return p.getProperty(key);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("com.tss.util.FmdSettings :" + e.toString());
			return null;
		}
	}
	
	private static void load(String propName) {
		InputStream in = FmdSettings.class.getClassLoader()
				.getResourceAsStream(propName+".properties");
		Properties p = new Properties();
		try {
			p.load(in);
			in.close();
			config.put(propName, p);
		} catch (IOException e) {
			System.out.println("No "+propName+".properties defined error");
		}
	}

}
