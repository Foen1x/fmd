package com.tss.formdesigner.model;

public class TsFormHistoryKey {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ts_form_history.FORMID
     *
     * @mbggenerated Thu Jul 24 01:15:48 CST 2014
     */
    private String formid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ts_form_history.CHANGENO
     *
     * @mbggenerated Thu Jul 24 01:15:48 CST 2014
     */
    private Long changeno;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ts_form_history.FORMID
     *
     * @return the value of ts_form_history.FORMID
     *
     * @mbggenerated Thu Jul 24 01:15:48 CST 2014
     */
    public String getFormid() {
        return formid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ts_form_history.FORMID
     *
     * @param formid the value for ts_form_history.FORMID
     *
     * @mbggenerated Thu Jul 24 01:15:48 CST 2014
     */
    public void setFormid(String formid) {
        this.formid = formid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ts_form_history.CHANGENO
     *
     * @return the value of ts_form_history.CHANGENO
     *
     * @mbggenerated Thu Jul 24 01:15:48 CST 2014
     */
    public Long getChangeno() {
        return changeno;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ts_form_history.CHANGENO
     *
     * @param changeno the value for ts_form_history.CHANGENO
     *
     * @mbggenerated Thu Jul 24 01:15:48 CST 2014
     */
    public void setChangeno(Long changeno) {
        this.changeno = changeno;
    }
}