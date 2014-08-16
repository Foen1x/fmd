package com.tss.formdesigner.runtime.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;


/**
 * custom Dao class for db operations
 * @author fuzheng
 *
 */
@RuntimeMyBatisRepository
public interface RuntimeCustomSQLDao {
	
	/**
	 * 通用查询方法，返回map list
	 * @param sql
	 * @return
	 */
	List<Map<String,?>> select(@Param("sql") String sql);
	
	/**
	 * 通用查询方法，返回map list
	 * @param sql
	 * @return
	 */
	List<Map<String,?>> selectCount(@Param("sql") String sql);
	
	/**
	 * 通用查询方法，返回map list
	 * @param sql
	 * @return
	 */
	List<Map<String,?>> pagingSelect(@Param("sql") String sql, @Param("fromRow") int fromRow, @Param("toRow") int toRow);
	
	/**
	 * 通用执行语句方法 insert
	 * @param sql
	 * @return
	 */
	int insert(@Param("sql") String sql);
	
	/**
	 * 通用执行语句方法 update
	 * @param sql
	 * @return
	 */
	int update(@Param("sql") String sql);
	
	/**
	 * 通用执行语句方法 delete
	 * @param sql
	 * @return
	 */
	int delete(@Param("sql") String sql);

}
