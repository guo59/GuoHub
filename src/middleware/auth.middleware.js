const jwt = require('jsonwebtoken')

const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const errorType = require('../constants/error-type')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY} = require('../app/config')

const verifyLogin = async (ctx, next) => {
  const { name, password} = ctx.request.body

  // 用户名或密码为空
  if(!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 用户名不存在
  const result = await userService.getUserByName(name)
  const user = result[0]
  if(!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXITSTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 密码不正确
  if(md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCURRENT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  console.log('验证token');
  // 获取token
  const authorization = ctx.headers.authorization
  if(!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    console.log(err);
    const error = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }

}

const verifyPermisson = async (ctx, next) => {
  console.log('验证权限的middleware');
  const [resourceName] = Object.keys(ctx.params)
  const tableName = resourceName.replace('Id', '')
  const resourceId = ctx.params[resourceName]
  const { id} = ctx.user

  try {
    const isPermisson = await authService.checkResource(tableName, resourceId, id)
    if(!isPermisson) throw new Error()
    await next()
  } catch (err) {
    const error = new Error(errorType.UNPERMISSON)
    return ctx.app.emit('error', error, ctx)
  }

}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermisson
}