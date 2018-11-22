const config = require('./config');


Page({
  data: {
    config,
    value: '',
    textareaValue: 'test textarea',
    areaIndex: 0,
    
  },
  
  onAreaChange(e) {
    this.setData({
      areaIndex: e.detail.value
    });
  },
  handleZanFieldChange(e) {
    const { detail } = e;
  },
  handleZanFieldFocus(e) {
    const { detail } = e;
  },
  handleZanFieldBlur(e) {
    const { detail } = e;
  },
  clearInput() {
    this.setData({
      value: ''
    });
  },
  clearTextarea() {
    this.setData({
      textareaValue: ''
    });
  },
  formSubmit(event) {
  },
  formReset(event) {
  },

  /* piker-view 示例相关函数 */
  handleDateFieldClick() {
    this.setData({
      'pickerViewConfig.show': true
    });
  },
  syncChange({ detail }) {
    this.setData({
      'sync.checked': detail.checked
    });
  },
  handlePopupDateChange(e) {
    this.setData({
      'pickerViewConfig.value': e.detail.value
    });
  },
  hideDatePopup() {
    this.setData({
      'pickerViewConfig.show': false
    });
  }
});
