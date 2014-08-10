/**
 * bind coro combo in grid
 * @param options
 * @param mygrid
 * @param rId
 * @param cId
 * @param list1
 * @param defaultValue
 */
function dhx_bindCombo(options, mygrid, rId, cId, list1, defaultValue) {
	mygrid.setCellExcellType(rId,cId,"coro");
	if(!list1) return;
	var combo1 = mygrid.getCustomCombo(rId,cId);
	if (options) {
		options.comboSize && combo1.setSize(options.comboSize);
		options.comboWidth && mygrid.cells(rId,cId).setComboWidth(comboWidth);
	}
	combo1.clear();
	for (var i=0;i<list1.length;i++) {
		combo1.put(list1[i][0], list1[i][1]);
	}
	mygrid.cells(rId,cId).setValue(defaultValue!=undefined?defaultValue:list1[0][0]);
}

