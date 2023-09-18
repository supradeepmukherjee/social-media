import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { delProfile, getMyPosts, logout } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import User from '../User'
import './Account.css'

const Account = () => {
  const dispatch = useDispatch()
  const { loading, error, posts } = useSelector(state => state.myPosts)
  const { error: likeError, msg, loading: delLoading } = useSelector(state => state.like)
  const { user, loading: userLoading } = useSelector(state => state.user)
  const [followersToggle, setFollowersToggle] = useState(false)
  const [followingToggle, setFollowingToggle] = useState(false)
  const alert = useAlert()
  const logoutHandler = async () => {
    dispatch(logout())
    alert.success('Logged Out successfully')
  }
  const delHandler = async () => {
    await dispatch(delProfile())
    dispatch(logout())
  }
  useEffect(() => {
    dispatch(getMyPosts())
  }, [dispatch, user])
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: 'clearError' })
    }
    if (likeError) {
      alert.error(likeError)
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
  }, [alert, dispatch, error, likeError, msg, posts])
  return (
    loading || userLoading ? <Loader /> :
      <div className='account'>
        <div className="accountLeft">
          {posts && posts.length > 0 ?
            posts.map(post => <Post
              postID={post._id}
              key={post._id}
              ownerName={user.name}
              caption={post.caption}
              postImg={post.img.url}
              likes={post.likes}
              comments={post.comments}
              ownerImg={user.chavi.url}
              ownerID={post.owner._id}
              isAccount={true}
              isDelete={true} />)
            :
            <Typography variant='h6'>
              You have not posted until now
            </Typography>
          }
        </div>
        <div className="accountRight">
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
          <Button variant='contained' onClick={logoutHandler}>
            Logout
          </Button>
          <Link to='/updateProfile'>
            Update Profile
          </Link>
          <Link to='/changePassword'>
            Change Password
          </Link>
          <Button disabled={delLoading} onClick={delHandler} variant='text' style={{ color: 'red', margin: '2vmax' }}>
            Delete my Account
          </Button>
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
        </div>
      </div>
  )
}

export default Account