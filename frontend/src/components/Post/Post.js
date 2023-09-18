import { ChatBubbleOutline, DeleteOutline, FavoriteBorder, Favorite, MoreVert } from '@mui/icons-material'
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, delPost, likePost, updateCaption } from '../../Actions/Post'
import User from '../User'
import { Link } from 'react-router-dom'
import { getFollowingPost, getMyPosts, getUserPosts, loadUser } from '../../Actions/User'
import CommentCard from '../CommentCard/CommentCard'
import './Post.css'

const Post = ({ postID, caption, postImg, likes = [], comments = [], ownerImg, ownerName, ownerID, isDelete = false, isAccount = false, page = '', userID }) => {
    const [liked, setLiked] = useState(false)
    const [likesUser, setLikesUser] = useState(false)
    const [commentValue, setCommentValue] = useState('')
    const [commentToggle, setCommentToggle] = useState(false)
    const [captionValue, setCaptionValue] = useState('')
    const [captionToggle, setCaptionToggle] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const handleLike = async () => {
        setLiked(!liked)
        await dispatch(likePost(postID))
        if (isAccount) dispatch(getMyPosts())
        else dispatch(getFollowingPost())
        if (page === 'user') dispatch(getUserPosts(userID))
    }
    const updateCaptionHandler = async e => {
        e.preventDefault()
        await dispatch(updateCaption(postID, captionValue))
        dispatch(getMyPosts())
    }
    const handleDel = async () => {
        await dispatch(delPost(postID))
        dispatch(getMyPosts())
        dispatch(loadUser())
    }
    const formHandler = async e => {
        e.preventDefault()
        await dispatch(addComment(postID, commentValue))
        if (isAccount) {
            dispatch(getMyPosts())
        } else dispatch(getFollowingPost())
    }
    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id) setLiked(true)
        });
    }, [likes, user._id])
    return (
        <div className='post'>
            <div className="postHeader">
                {isAccount ?
                    <Button onClick={() => setCaptionToggle(!captionToggle)}>
                        <MoreVert />
                    </Button>
                    : null}
            </div>
            <img src={postImg} alt="post" />
            <div className="postDetails">
                <Avatar src={ownerImg} alt='user' sx={{ height: '3vmax', width: '3vmax' }} />
                <Link to={`/user/${ownerID}`} >
                    <Typography fontWeight={700}>
                        {ownerName}
                    </Typography>
                </Link>
                <Typography fontWeight={100} color='rgba(0,0,0,.582)' style={{ alignSelf: 'center' }}>
                    {caption}
                </Typography>
            </div>
            <button style={{ border: "none", backgroundColor: 'white', cursor: 'pointer', margin: '1vmax 2vmax' }} onClick={() => setLikesUser(!likesUser)} disabled={!likes.length}>
                <Typography>
                    {likes.length} likes
                </Typography>
            </button>
            <div className="postFooter">
                <Button onClick={handleLike}>
                    {liked ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder />}
                </Button>
                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>
                {isDelete ?
                    <Button onClick={handleDel}>
                        <DeleteOutline />
                    </Button>
                    : null}
            </div>
            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="dialogBox">
                    <Typography variant='h4'>
                        Liked by
                    </Typography>
                    {likes.map(like => <User userID={like._id} key={like._id} name={like.name} chavi={like.chavi.url} />)}
                </div>
            </Dialog>
            <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
                <div className="dialogBox">
                    <Typography variant='h4'>
                        Comments
                    </Typography>
                    <form className='commentForm' onSubmit={formHandler}>
                        <input type="text" value={commentValue} onChange={e => setCommentValue(e.target.value)} placeholder='Type your comment' required />
                        <Button variant='contained' type='submit'>
                            Submit
                        </Button>
                    </form>
                    {comments.length > 0 ?
                        comments.map(comment => <CommentCard userID={comment.user._id} name={comment.user.name} chavi={comment.user.chavi.url} comment={comment.comment} commentID={comment._id} key={comment._id} postID={postID} isAccount={isAccount} />)
                        :
                        <Typography>
                            No Comments yet
                        </Typography>
                    }
                </div>
            </Dialog>
            <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
                <div className="dialogBox">
                    <Typography variant='h4'>
                        Comments
                    </Typography>
                    <form className='commentForm' onSubmit={updateCaptionHandler}>
                        <input type="text" value={captionValue} onChange={e => setCaptionValue(e.target.value)} placeholder='Type your new caption' required />
                        <Button variant='contained' type='submit'>
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}

export default Post