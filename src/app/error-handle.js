const errorType = require('../constants/error-type')

const errorHandler = (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名或密码不能为空'
      break
    case errorType.USER_ALREADY_EXITSTS:
      status = 409
      message = '用户名已存在'
      break
    case errorType.USER_DOES_NOT_EXITSTS:
      status = 400
      message = '用户不存在'
      break
    case errorType.PASSWORD_IS_INCURRENT:
      status = 400
      message = '密码不正确'
      break
    case errorType.UNAUTHORIZATION:
      status = 401
      message = '无效的token'
      break
    case errorType.UNPERMISSON:
      status = 401
      message = '您没有权限'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler