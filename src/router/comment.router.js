const Router = require('koa-router')

const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller')
const {
  verifyAuth,
  verifyPermisson
} = require('../middleware/auth.middleware')


const commentRouter = new Router({prefix: '/comment'})

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply',verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermisson, update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermisson, remove)
commentRouter.get('/', list)

module.exports = commentRouter