const router = require('express').Router()
const userController = require('../../controller/user/userController')

router.post('/user/login', userController.login)
router.post('/user/addUser', userController.addUser)
router.delete('/user/deleteUser', userController.deleteUser)
router.post('/user/editUser', userController.editUser)
router.post('/user/getUserById', userController.getUserById)

module.exports = router
