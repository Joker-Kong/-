module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: '收货人',
      placeholder: '请输入您的姓名'
    },
    tel: {
      error: true,
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入手机号'
    },
    disabled: {
      title: '设为默认',
      disabled: true,
      value: ''
    },
    address: {
      title: '详细地址',
      type: 'textarea',
      placeholder: '请输入详细地址(最多50字)'
    }
  }
  }


