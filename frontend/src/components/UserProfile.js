import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { followUser, getUserPosts, getUserProfile } from '../Actions/User'
import Loader from './Loader/Loader'
import Post from './Post/Post'
import User from './User'
import './Account/Account.css'

const UserProfile = () => {
    const dispatch = useDispatch()
    const { loading, error, posts } = useSelector(state => state.userPosts)
    const { error: followError, msg, loading: followLoading } = useSelector(state => state.like)
    const { user, loading: userLoading, error: userError } = useSelector(state => state.userProfile)
    const { user: I } = useSelector(state => state.user)
    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [following, setFollowing] = useState(false)
    const [myProfile, setMyProfile] = useState(false)
    const { id } = useParams()
    const alert = useAlert()
    const followHandler = async () => {
        await dispatch(followUser(id))
        setFollowing(!following)
        dispatch(getUserProfile(id))
    }
    useEffect(() => {
        dispatch(getUserPosts(id))
        dispatch(getUserProfile(id))
    }, [dispatch, id])
    useEffect(() => {
        if (I._id === id) setMyProfile(true)
        if (user) {
            user.followers.forEach(item => {
                if (item._id === I._id) setFollowing(true)
                else setFollowing(false)
            })
        }
    }, [I._id, id, user])
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: 'clearError' })
        }
        if (followError) {
            alert.error(followError)
            dispatch({ type: 'clearError' })
        }
        if (userError) {
            alert.error(userError)
            dispatch({ type: 'clearError' })
        }
        if (posts) {
            // alert.success(msg)
            dispatch({ type: 'clearMsg' })
        }
        if (msg) {
            alert.success(msg)
            dispatch({ type: 'clearMsg' })
        }
    }, [alert, dispatch, error, followError, msg, posts, userError])
    return (
        loading || userLoading ? <Loader /> :
            <div className='account'>
                <div className="accountLeft">
                    {posts && posts.length > 0 ?
                        posts.map(post => <Post
                            postID={post._id}
                            key={post._id}
                            ownerName={post.owner.name}
                            caption={post.caption}
                            postImg={post.img.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImg={post.owner.chavi.url}
                            ownerID={post.owner._id}
                            page='user'
                            userID={id} />)
                        :
                        <Typography variant='h6'>
                            User hasn't posted until now
                        </Typography>
                    }
                </div>
                <div className="accountRight">
                    {user &&
                        <>
                            <Avatar src={user.chavi.url} sx={{ height: '8vmax', width: '8vmax' }} />
                            <Typography variant='h5'>
                                {user.name}
                            </Typography>
                            <div className="">
                                <button onClick={() => setFollowersToggle(!followersToggle)}>
                                    <Typography>
                                        Followers
                                    </Typography>
                                </button>
                                <Typography>
                                    {user.followers.length}
                                </Typography>
                            </div>
                            <div className="">
                                <button onClick={() => setFollowingToggle(!followingToggle)}>
                                    <Typography>
                                        Following
                                    </Typography>
                                </button>
                                <Typography>
                                    {user.following.length}
                                </Typography>
                            </div>
                            <div className="">
                                <Typography>
                                    Posts
                                </Typography>
                                <Typography>
                                    {user.posts.length}
                                </Typography>
                            </div>
                            {myProfile ? null :
                                <Button disabled={followLoading} variant='contained' style={{ background: !following ? 'red' : 'blue' }} onClick={followHandler}>
                                    {following ? 'Following' : 'Follow'}
                                </Button>}
                            <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                                <div className="dialogBox">
                                    <Typography variant='h4'>
                                        Followers
                                    </Typography>
                                    {user && user.followers.length > 0 ?
                                        user.followers.map(follower => <User userID={follower._id} key={follower._id} name={follower.name} chavi={follower.chavi.url}
                                        />)
                                        :
                                        <Typography style={{ margin: '2vmax' }}>
                                            You have no followers
                                        </Typography>
                                    }
                                </div>
                            </Dialog>
                            <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                                <div className="dialogBox">
                                    <Typography variant='h4'>
                                        Following
                                    </Typography>
                                    {user && user.following.length > 0 ?
                                        user.following.map(following => <User userID={following._id} key={following._id} name={following.name} chavi={following.chavi.url}
                                        />)
                                        :
                                        <Typography style={{ margin: '2vmax' }}>
                                            You dont follow anyone
                                        </Typography>
                                    }
                                </div>
                            </Dialog>
                        </>}
                </div>
            </div>
    )
}

export default UserProfile