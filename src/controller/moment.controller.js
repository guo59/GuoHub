const fs = require('fs')

const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')

const {
  PICTURE_PATH
} = require('../constants/file-path')

class MomentController {
  async create(ctx, next) {
    // 获取用户id和动态
    const userId = ctx.user.id
    const content = ctx.request.body.content
    // console.log(userId, content);

    // 数据插入到数据库中
    const result = await momentService.create(userId, content)
    ctx.body = result[0]
  }

  async detail(ctx, next) {
    // 获取动态id
    const momentId = ctx.params.momentId

    // 根据id查询动态详情
    const [result] = await momentService.getMomentById(momentId)

    ctx.body = result[0]
  }

  async list(ctx, next) {
    const { offset, size} = ctx.query
    const [result] = await momentService.getMomentList(offset, size)

    ctx.body = result
  }

  async update(ctx, next) {
    const {momentId} = ctx.params
    const {content} = ctx.request.body

    const result = await momentService.update(momentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { momentId} = ctx.params

    const result = await momentService.remove(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const { labels} = ctx
    const { momentId} = ctx.params

    for(let label of labels) {
      const isExists = await momentService.hasLabel(momentId, label.id)
      if(!isExists) {
        await momentService.addLabel(momentId, label.id)
      }
    }
    ctx.body = '给动态添加标签成功'
  }

  async fileInfo(ctx, next) {
    let { filename} = ctx.params
    const fileInfo = await fileService.getFileByFilename(filename)
    const { type} = ctx.query
    const types = ['large', 'middle', 'small']
    if(types.some(item => item === type)) {
      filename = filename + '-' + type
    }
    
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()