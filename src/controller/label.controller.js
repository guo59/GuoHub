const labelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { name} = ctx.request.body
    const result = await labelService.create(name)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, limit} = ctx.query
    const result = await labelService.getLabels(offset, limit)
    ctx.body = result
  }
}

module.exports = new LabelController()