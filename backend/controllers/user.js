const Post = require('../models/Post')
const User = require('../models/User')
const { sendEmail } = require('../middlewares/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

exports.register = async (req, res) => {
    try {
        const { name, email, password, chavi } = req.body
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ success: false, msg: 'User already exists' })
        const myCloud = await cloudinary.v2.uploader.upload(chavi, { folder: 'Chavi' })
        user = await User.create({
            name,
            email,
            password,
            chavi:
            {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })
        const token = await user.generateToken()
        res.status(201).cookie('token', token, { expires: new Date(Date.now() + (90 * 24 * 60 * 60000)) }).json({ success: true, user, token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // const user = await User.findOne({ email }).select('+password')
        const user = await User.findOne({ email }).select('+password').populate('posts followers following')
        if (!user) { console.log('user doesnt exist'); return res.status(400).json({ success: false, msg: 'User doesn\'t exist' }) }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) return res.status(400).json({ success: false, msg: 'User or Password is incorrect' })
        const token = await user.generateToken()
        res.status(200).cookie('token', token, { expires: new Date(Date.now() + (90 * 24 * 60 * 60000)) }).json({ success: true, user, token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err })
    }
}

exports.follow = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id)
        const loggedIn = await User.findById(req.user._id)
        if (!userToFollow) return res.status(404).json({ success: false, msg: 'User not found' })
        if (loggedIn.following.includes(userToFollow._id)) {
            const indexOfFollowing = loggedIn.following.indexOf(userToFollow)
            const indexOfFollower = userToFollow.followers.indexOf(userToFollow)
            loggedIn.following.splice(indexOfFollowing, 1)
            userToFollow.followers.splice(indexOfFollower, 1)
            await loggedIn.save()
            await userToFollow.save()
            return res.status(200).json({ success: true, msg: 'User removed from your follow list' })
        }
        loggedIn.following.push(userToFollow._id)
        userToFollow.followers.push(loggedIn._id)
        await loggedIn.save()
        await userToFollow.save()
        res.status(200).json({ success: true, msg: 'User added to your follow list' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.logout = async (req, res) => {
    try {
        res.status(200).cookie('token', null, { expires: new Date(Date.now()), httpOnly: true }).json({ success: true, msg: 'Logged Out' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('+password')
        const { old, newP } = req.body
        if (!old || !newP) return res.status(400).json({ success: false, msg: "Please provide old & new password" })
        const isMatch = await user.matchPassword(old)
        if (!isMatch) return res.status(400).json({ success: false, msg: 'Old password entered is incorrect' })
        user.password = newP
        await user.save()
        res.status(200).json({ success: true, msg: 'Password changed successfully' })
    } catch (err) {
        res.status(500).json({ success: false, msg: err })
        console.log(err);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const { name, email, chavi } = req.body
        if (name) user.name = name
        if (email) user.email = email
        if (chavi) {
            await cloudinary.v2.uploader.destroy(user.chavi.public_id)
            const myCloud = await cloudinary.v2.uploader.upload(chavi, { folder: 'Chavi' })
            user.chavi.public_id = myCloud.public_id
            user.chavi.url = myCloud.secure_url
            // We do this only when user wants to update chavi, hence chavi initial value is empty & to show old chavi we have made oldChavi
        }
        await user.save()
        res.status(200).json({ success: true, msg: 'Profile updated successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('posts')
        const posts = user.posts
        const followers = user.followers
        const following = user.following
        // removing chavi from cloudinary
        await cloudinary.v2.uploader.destroy(user.chavi.public_id)
        // delete all posts of user
        for (let i = 0; i < posts.length; i++) {
            await cloudinary.v2.uploader.destroy(posts[i].img.public_id)
            await Post.deleteOne({ _id: posts[i]._id })
        }
        // remove user from follower's following
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i])
            const index = follower.following.indexOf(user._id)
            follower.following.splice(index, 1)
            await follower.save()
        }
        // remove user from following's follower
        for (let i = 0; i < following.length; i++) {
            const follows = await User.findById(following[i])
            const index = follows.followers.indexOf(user._id)
            follows.followers.splice(index, 1)
            await follows.save()
        }
        // remove all comments of the user from all posts
        const postsOfOthers = await Post.find()
        for (let i = 0; i < postsOfOthers.length; i++) {
            const post = await Post.findById(postsOfOthers[i]._id)
            for (let j = 0; j < post.comments.length; j++) {
                if (post.comments[j].user === user._id) {
                    post.comments.splice(j, 1)
                }
            }
            await post.save()
        }
        // remove all likes of the user from all posts
        for (let i = 0; i < postsOfOthers.length; i++) {
            const post = await Post.findById(postsOfOthers[i]._id)
            for (let j = 0; j < post.likes.length; j++) {
                if (post.likes[j] === user._id) {
                    post.likes.splice(j, 1)
                }
            }
            await post.save()
        }
        await User.deleteOne({ _id: user._id })
        // logout user after deleting profile
        res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
        res.status(200).json({ success: true, msg: 'Profile deleted successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('posts following followers')
        res.status(200).json({ success: true, user, msg: 'User fetched successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.user).populate('posts following followers')
        if (!user) return res.status(404).json({ success: false, msg: 'Profile not found' })
        res.status(200).json({ success: true, user, msg: 'Profile fetched successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ name: { $regex: req.query.name, $options: 'i' } })
        res.status(200).json({ success: true, users, msg: 'Profiles fetched successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ success: false, msg: "user not found" })
        const resetPasswordToken = await user.getResetPasswordToken()
        await user.save()
        const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetPasswordToken}`
        const text = `Reset your password by clicking on the link below:\n\n ${resetUrl}`
        try {
            await sendEmail({ to: user.email, subject: 'Reset your password', text })
            res.status(200).json({ success: true, msg: `email sent to ${user.email}` })
        } catch (err) {
            console.log(err);
            user.resetPasswordToken = undefined
            user.resetPasswordExpiry = undefined
            await user.save()
            res.status(500).json({ success: false, msg: err.msg })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}


exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
        const user = await User.findOne({ resetPasswordToken, resetPasswordExpiry: { $gt: Date.now() } })
        if (!user) return res.status(401).json({ success: false, msg: 'Token is invalid or has expired' })
        user.resetPasswordToken = undefined
        user.resetPasswordExpiry = undefined
        user.password = req.body.password
        await user.save()
        res.status(200).json({ success: true, msg: 'Password updated successful' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const posts = []
        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate('likes comments.user owner')
            posts.push(post)
        }
        res.status(200).json({ success: true, posts })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

exports.getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const posts = []
        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate('likes comments.user owner')
            posts.push(post)
        }
        res.status(200).json({ success: true, posts })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}