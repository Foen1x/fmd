
var Bpd = function() {
	var id;
	var bpdId;
	var bpdName;
	var snapshotId;
	var snapshotName;
	var appId;
	var appName;
	var appShortName;
	var status;
	var isActive;
	var isDefault;
	var createDate;
	var updateDate;
	
	this.setId = function(id) {
		this.id = id;
	}
	this.getId = function() {
		return this.id;
	}
	
	this.setBpdId = function(bpdId) {
		this.bpdId = bpdId;
	}
	this.getBpdId = function() {
		return this.bpdId;
	}
	
	this.setBpdName = function(bpdName) {
		this.bpdName = bpdName;
	}
	this.getBpdName = function(bpdName) {
		return this.bpdName;
	}
	
	this.setSnapshotId = function(snapshotId) {
		this.snapshotId = snapshotId;
	}
	this.getSnapshotId = function() {
		return this.snapshotId;
	}
	
	this.setSnapshotName = function(snapshotName) {
		this.snapshotName = snapshotName;
	}
	this.getSnapshotName = function() {
		return this.snapshotName;
	}
	
	this.setAppId = function(appId) {
		this.appId = appId;
	}
	this.getAppId = function() {
		return this.appId;
	}
	
	this.setAppName = function(appName) {
		this.appName = appName;
	}
	this.getAppName = function() {
		return this.appName;
	}
	
	this.setAppShortName = function(appShortName) {
		this.appShortName = appShortName;
	}
	this.getAppShortName = function() {
		return this.appShortName;
	}
	
	this.setStatus = function(status) {
		this.status = status;
	}
	this.getStatus = function() {
		return this.status;
	}
	
	this.setIsActive = function(isActive) {
		this.isActive = isActive;
	}
	this.getIsActive = function() {
		return this.isActive;
	}
	
	this.setIsDefault = function(isDefault) {
		this.isDefault = isDefault;
	}
	this.getIsDefault = function() {
		return this.isDefault;
	}
	
	this.setCreateDate = function(createDate) {
		this.createDate = createDate;
	}
	this.getCreateDate = function() {
		return this.createDate;
	}
	
	this.setUpdateDate = function(updateDate) {
		this.updateDate = updateDate;
	}
	this.getUpdateDate = function() {
		return this.updateDate;
	}
	
};

var Activity = function() {
	var id;
    var activityId;
    var tsBpdId;
    var activityName;
    var type;
    var component;
    var outLines;
    var enOpeartions;
    var enPermission;
    var approvalType;
    var executeSequence;
    var completePercent;
    var formFile;
    var pastDueTime;
    var pastDueAction;
    var createTime;
    var updateTime;
    var actors;
    var readers;
    var formItems;
    
    this.getId = function() { return this.id; }
    this.setId = function(id) { this.id = id; }
    
    this.getActivityId = function() { return this.activityId; }
    this.setActivityId = function(activityId) { this.activityId = activityId; }
    
    this.getTsBpdId = function() { return this.tsBpdId; }
    this.setTsBpdId = function(tsBpdId) { this.tsBpdId = tsBpdId; }
    
    this.getActivityName = function() { return this.activityName; }
    this.setActivityName = function(activityName) { this.activityName = activityName; }
    
    this.getType = function() { return this.type; }
    this.setType = function(type) { this.type = type; }
    
    this.getComponent = function() { return this.component; }
    this.setComponent = function(component) { this.component = component; }
    
    this.getOutLines = function() { return this.outLines; }
    this.setOutLines = function(outLines) { this.id = outLines; }
    
    this.getEnOpeartions = function() { return this.enOpeartions; }
    this.setEnOpeartions = function(enOpeartions) { this.enOpeartions = enOpeartions; }
    
    this.getEnPermission = function() { return this.enPermission; }
    this.setEnPermission = function(enPermission) { this.enPermission = enPermission; }
    
    this.getApprovalType = function() { return this.approvalType; }
    this.setApprovalType = function(approvalType) { this.approvalType = approvalType; }
    
    this.getExecuteSequence = function() { return this.executeSequence; }
    this.setExecuteSequence = function(executeSequence) { this.executeSequence = executeSequence; }
    
    this.getCompletePercent = function() { return this.completePercent; }
    this.setCompletePercent = function(completePercent) { this.completePercent = completePercent; }
    
    this.getFormFile = function() { return this.formFile; }
    this.setFormFile = function(formFile) { this.formFile = formFile; }
    
    this.getFormItems = function() { return this.formItems; }
    this.setFormItems = function(formItems) { this.formItems = formItems; }
    
    this.getPastDueTime = function() { return this.pastDueTime; }
    this.setPastDueTime = function(pastDueTime) { this.pastDueTime = pastDueTime; }
    
    this.getPastDueAction = function() { return this.pastDueAction; }
    this.setPastDueAction = function(pastDueAction) { this.pastDueAction = pastDueAction; }
    
    this.getCreateTime = function() { return this.createTime; }
    this.setCreateTime = function(createTime) { this.createTime = createTime; }

    this.getUpdateTime = function() { return this.updateTime; }
    this.setUpdateTime = function(updateTime) { this.updateTime = updateTime; }
    
    this.getActors = function() { return this.actors; }
    this.setActors = function(actors) { this.actors = actors; }
    
    this.getReaders = function() { return this.readers; }
    this.setReaders = function(readers) { this.readers = readers; }
}