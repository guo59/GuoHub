const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'})

const {
  verifyAuth,
  verifyPermisson
} = require('../middleware/auth.middleware')
const {
  verifyLabelExists
} = require('../middleware/label.middleware')
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')

// 发表动态 验证是否登录
momentRouter.post('/', verifyAuth, create)
momentRouter.get('/:momentId', detail)
momentRouter.get('/', list)
momentRouter.patch('/:momentId', verifyAuth, verifyPermisson, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermisson, remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermisson, verifyLabelExists, addLabels)

// 获取动态配图
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter