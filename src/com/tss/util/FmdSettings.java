package com.tss.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * utility for getting properties
 * @author fuzheng
 *
 */
public class FmdSettings {
	
	public static final String MODULE_PATH_BASE = "modules.path.base";
	public static final String MODULE_PATH_CONTROL = "modules.path.control";
	public static final String MODULE_PATH_LAYOUT = "modules.path.layout";
	public static final String PARSER_IMPL = "parser.impl";
	
	private static Properties config = null;

	static {
		InputStream in = FmdSettings.class.getClassLoader()
				.getResourceAsStream("fmdsettings.properties");
		config = new Properties();
		try {
			config.load(in);
			in.close();
		} catch (IOException e) {
			System.out.println("No integration.properties defined error");
		}
	}

	// 鏍规嵁key璇诲彇value
	public static String getValue(String key) {
		// Properties props = new Properties();
		try {
			return config.getProperty(key);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("com.tss.util.FmdSettings :" + e.toString());
			return null;
		}
	}

}
