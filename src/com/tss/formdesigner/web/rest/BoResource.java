package com.tss.formdesigner.web.rest;

import java.util.logging.Logger;

import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.tss.formdesigner.service.BoService;

@Path("/bo")
public class BoResource {
	
	private Logger logger = Logger.getLogger(BoResource.class.getName());
	
	@Autowired
	private BoService bos;

	@GET
    @Path("/{boid}")
    @Produces(MediaType.APPLICATION_JSON)
	public String get(@PathParam("boid") String boid) {
		logger.finer("get boid="+boid);
		return bos.get(boid);
	}
	
	@POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
	public String save(@FormParam("bostr") String bostr) {
		logger.finer("get bostr="+bostr);
		String lang = "zh";
		String loginName = "admin";
		String displayName = "超级管理员";
		String boid = bos.save(bostr, loginName, displayName, lang);
		return "{\"result\":\"true\", \"boid\":\""+boid+"\"}";
	}
	
	@DELETE
    @Path("/{boid}")
    @Produces(MediaType.APPLICATION_JSON)
	public String delete(@PathParam("boid") String boid) {
		logger.finer("delete boid="+boid);
		int rs = bos.delete(boid);
		return "{\"result\":"+rs+"}";
	}
	
	@POST
    @Path("/query")
    @Produces(MediaType.APPLICATION_JSON)
	public String query(@FormParam("queryParams")String queryParams,
			@FormParam("fromRow")int fromRow,
			@FormParam("toRow")int toRow,
			@FormParam("timezoneOffset")int timezoneOffset,
			@FormParam("ordercolumns")String ordercolumns) {
		logger.finer("query queryParams="+queryParams);
		String lang = "zh";
		return bos.query(queryParams, fromRow, toRow, timezoneOffset, lang, ordercolumns);
	}
}
