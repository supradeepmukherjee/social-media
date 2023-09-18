import { Delete } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { delComment } from '../../Actions/Post'
import { getFollowingPost, getMyPosts } from '../../Actions/User'
import './CommentCard.css'

const CommentCard = ({ userID, name, chavi, comment, commentID, postID, isAccount }) => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const del = async () => {
        await dispatch(delComment(postID, commentID))
        if (isAccount) dispatch(getMyPosts())
        else dispatch(getFollowingPost())
    }
    return (
        <div className='commentUser'>
            <Link to={`/user/${userID}`}>
                <img src={chavi} alt={name} />
                <Typography style={{ minWidth: '6vmax' }}>
                    {name}
                </Typography>
            </Link>
            <Typography>
                {comment}
            </Typography>
            {isAccount ?
                <Button onClick={del}>
                    <Delete />
                </Button>
                :
                (userID === user._id ?
                    <Button onClick={del}>
                        <Delete />
                    </Button>
                    : null)}
        </div >
    )
}

export default CommentCard