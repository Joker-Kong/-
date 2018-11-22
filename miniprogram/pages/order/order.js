Page(Object.assign({}, {
  data: {
    stepper1: {
      stepper:1,
      min: 1
    },
    total:"129"
  },
  handleZanStepperChange({
    detail: stepper,
    target: {
      dataset: {
        componentId
      }
    }
  }) {
    this.setData({
      [`${componentId}.stepper`]: stepper,
      total: 129 * stepper-0
    });
  }
}));