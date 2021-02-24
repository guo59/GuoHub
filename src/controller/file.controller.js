const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const {APP_HOST, APP_PORT} = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size} = ctx.req.file
    const { id} = ctx.user

    const result = await fileService.createAvatar(filename, mimetype, size, id)

    // 头像链接存储到用户表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.getAvatarByUserId(avatarUrl, id)

    ctx.body = '上传头像成功'
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    const { id} = ctx.user
    const {momentId} = ctx.query

    for(let file of files) {
      const {filename, mimetype, size} = file
      await fileService.createFile(filename, mimetype, size, id, momentId)
    }
    ctx.body = '上传动态配图成功'
  }
}

module.exports = new FileController()