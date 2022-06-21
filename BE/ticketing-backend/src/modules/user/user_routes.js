const express = require('express')
const Route = express.Router()
const userController = require('./user_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.post(
  '/',
  authMiddleware.authentication,
  uploadFile,
  userController.register
)
Route.get('/:id', userController.getShowTimeById)
Route.get('/tanpafill/q', userController.getAllUserTanpaFill)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  // authMiddleware.isAdmin,
  uploadFile,
  userController.updateUser
)
Route.delete(
  '/:id',

  userController.deletedUser
)
module.exports = Route
