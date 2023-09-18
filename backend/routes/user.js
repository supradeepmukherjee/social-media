const express = require('express')
const { register, login, follow, logout, updatePassword, updateProfile, deleteProfile, myProfile, getAllUsers, getUserProfile, forgotPassword, resetPassword, getMyPosts, getUserPosts } = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/myProfile').get(isAuthenticated, myProfile)
router.route('/follow/:id').get(isAuthenticated, follow)
router.route('/update/password').put(isAuthenticated, updatePassword)
router.route('/update/profile').put(isAuthenticated, updateProfile)
router.route('/del').delete(isAuthenticated, deleteProfile)
router.route('/all').get(isAuthenticated, getAllUsers)
router.route('/profile/:user').get(isAuthenticated, getUserProfile)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:token').put(resetPassword)
router.route('/myposts').get(isAuthenticated, getMyPosts)
router.route('/userposts/:id').get(isAuthenticated, getUserPosts)

module.exports = router