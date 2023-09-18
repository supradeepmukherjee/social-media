import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getFollowingPost } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import User from '../User'
import './Home.css'
import { useAlert } from 'react-alert'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { error: likeError, msg } = useSelector(state => state.like)
  useEffect(() => {
    dispatch(getFollowingPost())
    dispatch(getAllUsers())
  }, [dispatch])
  const { loading, posts, error } = useSelector(state => state.postOfFollowing)
  const { loading: usersLoading, users } = useSelector(state => state.allUsers)
  useEffect(() => {
    if (likeError) {
      alert.error(likeError)
      dispatch({ type: 'clearError' })
    }
    if (error) {
      alert.error(error)
      dispatch({ type: 'clearError' })
    }
    if (msg) {
      alert.success(msg)
      dispatch({ type: 'clearMsg' })
    }
  }, [alert, dispatch, error, likeError, msg])
  return (
    loading || usersLoading ? <Loader /> :
      <div className='home'>
        <div className="homeLeft">
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
              ownerID={post.owner._id} />)
            :
            <Typography variant='h6'>
              No posts yet
            </Typography>
          }
        </div>
        <div className="homeRight">
          {users && users.length > 0 ?
            users.map(user => <User userID={user._id} key={user._id} name={user.name} chavi={user.chavi.url} />
            )
            :
            <Typography variant='h6'>
              No users yet
            </Typography>
          }
        </div>
      </div>
  )
}

export default Home