const Post = require('../models/Post')
const User = require('../models/User')
const cloudinary = require('cloudinary')

exports.createPost = async (req, res) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.img, { folder: 'posts' })
        const newPostData = {
            caption: req.body.caption,
            img: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            owner: req.user.id
        }
        const newPost = await Post.create(newPostData)
        const user = await User.findById(req.user._id)
        user.posts.unshift(newPost._id)
        await user.save()
        res.status(201).json({ success: true, msg: 'New post created' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, msg: 'Post not found' })
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index, 1)
            await post.save()
            return res.status(200).json({ success: true, msg: 'Post unliked' })
        }
        post.likes.push(req.user._id)
        await post.save()
        res.status(200).json({ success: true, msg: 'Post liked' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.delPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, msg: 'Post not found' })
        if (post.owner.toString() != req.user._id.toString()) return res.status(401).json({ success: false, msg: 'Unauthorised' })
        await cloudinary.v2.uploader.destroy(post.img.public_id)
        await Post.deleteOne({ _id: post._id })
        const user = await User.findById(req.user._id)
        const index = user.posts.indexOf(req.params.id)
        user.posts.splice(index, 1)
        await user.save()
        res.status(200).json({ success: true, msg: 'Post deleted' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.getPostOfFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const posts = await Post.find({ owner: { $in: user.following } }).populate('owner likes comments.user')
        res.status(200).json({ success: true, posts: posts.reverse() })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.updateCaption = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, msg: 'Post not found' })
        if (post.owner.toString() != req.user._id.toString()) return res.status(401).json({ success: false, msg: 'Dont edit other\'s post' })
        post.caption = req.body.caption
        await post.save()
        res.status(200).json({ success: true, msg: 'Caption updated' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.comment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, msg: 'Post not found' })
        let exists = -1
        // checking if comment already exists
        post.comments.forEach((comment, index) => {
            if (comment.user.toString() == req.user._id.toString()) exists = index
        })
        if (exists >= 0) {
            post.comments[exists].comment = req.body.comment
            await post.save()
            res.status(200).json({ success: true, post, msg: 'Comment edited' })
        } else {
            post.comments.push({ user: req.user._id, comment: req.body.comment })
            await post.save()
            res.status(200).json({ success: true, post, msg: 'Comment added' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.delComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, msg: 'Post not found' })
        // checking if owner wants to delete
        if (post.owner.toString() == req.user._id.toString()) {
            if (req.body.commentID == undefined) return res.status(400).json({ success: false, msg: 'comment id required' })
            post.comments.forEach((comment, index) => {
                if (comment._id.toString() == req.body.commentID.toString()) return post.comments.splice(index, 1)
            })
            await post.save()
            res.status(200).json({ success: true, msg: 'A Comment under your post has been deleted' })
        } else {
            post.comments.forEach((comment, index) => {
                if (comment.user.toString() == req.user._id.toString()) return post.comments.splice(index, 1)
            })
            await post.save()
            res.status(200).json({ success: true, msg: 'Your Comment has been deleted' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}