import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newPost } from '../../Actions/Post'
import { getMyPosts, loadUser } from '../../Actions/User'
import './NewPost.css'

const NewPost = () => {
    const [img, setImg] = useState(null)
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, error, msg } = useSelector(state => state.like)
    const handleImgChange = async e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            if (reader.readyState === 2) setImg(reader.result)
        }
    }
    const submitHandler = async e => {
        e.preventDefault()
        await dispatch(newPost(img, caption))
        dispatch(getMyPosts())
        dispatch(loadUser())
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: 'clearError' })
        }
        if (msg) {
            alert.success(msg)
            dispatch({ type: 'clearMsg' })
        }
    }, [alert, dispatch, error, msg])

    return (
        <div className='newPost'>
            <form className='newPostForm' onSubmit={submitHandler}>
                <Typography variant='h3'>
                    New Post
                </Typography>
                {img && <img src={img} alt='post' />}
                <input type="file" accept='image/*' onChange={handleImgChange} />
                <input type="text" placeholder='Caption' value={caption} onChange={e => setCaption(e.target.value)} />
                <Button type='submit' disabled={loading}>
                    Post
                </Button>
            </form>
        </div>
    )
}

export default NewPost