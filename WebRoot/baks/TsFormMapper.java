package com.tss.formdesigner.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tss.formdesigner.model.TsForm;
import com.tss.util.MyBatisMySQLRepository;

@MyBatisRepository
public interface TsFormMapper {

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FMD.TS_FORM
     *
     * @mbggenerated Sat Feb 08 18:49:49 CST 2014
     */
    int deleteByPrimaryKey(String FORMID);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FMD.TS_FORM
     *
     * @mbggenerated Sat Feb 08 18:49:49 CST 2014
     */
    int insert(TsForm record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FMD.TS_FORM
     *
     * @mbggenerated Sat Feb 08 18:49:49 CST 2014
     */
    int insertSelective(TsForm record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FMD.TS_FORM
     *
     * @mbggenerated Sat Feb 08 18:49:49 CST 2014
     */
    TsForm selectByPrimaryKey(String FORMID);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FMD.TS_FORM
     *
     * @mbggenerated Sat Feb 08 18:49:49 CST 2014
     */
    int updateByPrimaryKeySelective(TsForm record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FMD.TS_FORM
     *
     * @mbggenerated Sat Feb 08 18:49:49 CST 2014
     */
    int updateByPrimaryKeyWithBLOBs(TsForm record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FMD.TS_FORM
     *
     * @mbggenerated Sat Feb 08 18:49:49 CST 2014
     */
    int updateByPrimaryKey(TsForm record);
    
    
    //============================= manual
    
    /**
     * Get max version id of a form
     * @param formid
     * @return
     */
    Map<String, ?> getMaxVersionid(@Param("formid") String formid);
    
}