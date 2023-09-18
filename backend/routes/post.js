const express = require('express')
const { createPost, likeUnlikePost, delPost, getPostOfFollowing, updateCaption, comment, delComment } = require('../controllers/post')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.route('/post/upload').post(isAuthenticated, createPost)
router.route('/post/:id').get(isAuthenticated, likeUnlikePost).delete(isAuthenticated, delPost).put(isAuthenticated, updateCaption)
router.route('/posts').get(isAuthenticated, getPostOfFollowing)
router.route('/comment/:id').put(isAuthenticated, comment).delete(isAuthenticated, delComment)

module.exports = router