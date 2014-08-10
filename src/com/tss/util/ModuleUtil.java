package com.tss.util;

import java.io.File;
import java.io.FilenameFilter;
import java.util.Arrays;
import java.util.logging.Logger;


public class ModuleUtil {
	
	//logger
	private static Logger logger = Logger.getLogger(ModuleUtil.class.getName());
	
	/**
	 * get module names in ["module1", "module2"]
	 * @param realPath
	 * @param mPath
	 * @return
	 */
	public static String getModuleNames(String realPath, String mPath) {
		File mFolder = new File(realPath + mPath);
		if (mFolder.exists() && mFolder.isDirectory()) {
			String[] mList = mFolder.list(new FilenameFilter(){
				@Override
				public boolean accept(File arg0, String arg1) {
					return arg0.isDirectory();
				}});
			if (mList!=null && mList.length>0) {
				Arrays.sort(mList);
				for (int i=0; i<mList.length; i++) {
					mList[i] = "\"" + mList[i] + "\"";
				}
				return Arrays.toString(mList);
			}
		} else {
			logger.warning("fmdmanage module path is not folder: "+mPath);
		}
		return null;
	}
	
	/**
	 * get module folder
	 * @param realPath
	 * @return
	 */
	public static String getModuleFolder(String realPath, String moudleCategory, String moduleName) {
		File cFolder = new File(realPath + FmdSettings.getValue(FmdSettings.MODULE_PATH_BASE) + moudleCategory);
		String[] mList = cFolder.list(new FilenameFilter(){
			@Override
			public boolean accept(File arg0, String arg1) {
				return arg0.isDirectory();
			}});
		for (String d : mList) {
			if (d.endsWith("."+moduleName)) {
				logger.finer("getModuleFolder returns "+d);
				return d;
			}
		}
		return null;
	}

}
