package com.tss.formdesigner.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tss.formdesigner.dao.mysql.TsBoMapper;
import com.tss.formdesigner.model.TsBo;
import com.tss.util.DateUtil;
import com.tss.util.DhxUtil;

@Service
public class BoService {
	
	private Logger logger = Logger.getLogger(BoService.class.getName());
	
	@Autowired
	private TsBoMapper boDao;

	public String get(String boid) {
		logger.finer("get boid="+boid);
		TsBo bo = boDao.selectByPrimaryKey(boid);
		logger.finer("get bo="+bo);
		return JSONObject.fromObject(bo).toString();
	}
	
	public String save(String boStr, String loginName, String displayName, String lang) {
		logger.finer("saving bostr="+boStr);
		TsBo bo = (TsBo) JSONObject.toBean(JSONObject.fromObject(boStr), TsBo.class);
		if (bo.getBoid()==null) {
			bo.setBoid("BO-"+UUID.randomUUID().toString());
			bo.setCreator(loginName);
			bo.setCreatorname(displayName);
			bo.setChangeuser(loginName);
			bo.setChangeusername(displayName);
			bo.setCreatetime(DateUtil.getGMTDate());
			bo.setUpdatetime(DateUtil.getGMTDate());
			boDao.insert(bo);
		} else {
			bo = boDao.selectByPrimaryKey(bo.getBoid());
			bo.setChangeuser(loginName);
			bo.setChangeusername(displayName);
			bo.setUpdatetime(DateUtil.getGMTDate());
			boDao.updateByPrimaryKeySelective(bo);
		}
		return bo.getBoid();
	}
	
	public int delete(String boid) {
		logger.finer("delete boid="+boid);
		return boDao.deleteByPrimaryKey(boid);
	}
	
	@SuppressWarnings("unchecked")
	public String query(String queryParams, int fInd, int lInd, int timezoneOffset, String lang, String ordercolumns) {
		logger.finer("query queryParams="+queryParams);
		Map<String, Object> params = new HashMap<String,Object>();
		Map<String, Object> args = new HashMap<String,Object>();
		if (queryParams!=null) {
			args.putAll(JSONObject.fromObject(queryParams));
		}
		params.put("bo", args);
		params.put("fromRow", fInd-1);
		params.put("toRow", lInd);
		params.put("rows", lInd - fInd + 1);
		params.put("timezoneOffset", timezoneOffset);
		params.put("orderby", DhxUtil.parseGridOrderBy(ordercolumns));
		logger.finer("query params="+params);
		List<Map<String,?>> list = boDao.pagingSelect(params);
		int total = Integer.parseInt(boDao.pagingSelectCount(params).get("COUNT").toString());
		String[] cols = new String[]{"BOID","BONAME","BODESC","UPDATETIME","CHANGEUSER","CHANGEUSERNAME",
				"CREATOR","CREATORNAME","CREATETIME"};
		return DhxUtil.toGridJsonStr(list, 
				cols, fInd, total, timezoneOffset, lang);
	}
}
