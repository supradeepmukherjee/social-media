import axios from 'axios'

export const likePost = (id) => async dispatch => {
    try {
        dispatch({ type: 'likeRequest' })
        const { data } = await axios.get(`/post/${id}`)
        dispatch({
            type: 'likeSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'likeFailure',
            payload: err.response.data.message
        })
    }
}

export const addComment = (id, comment) => async dispatch => {
    try {
        dispatch({ type: 'addCommentRequest' })
        const { data } = await axios.put(`/comment/${id}`, { comment }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'addCommentSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'addCommentFailure',
            payload: err.response.data.message
        })
    }
}

export const updateCaption = (postID, caption) => async dispatch => {
    try {
        dispatch({ type: 'updateCaptionRequest' })
        const { data } = await axios.put(`/post/${postID}`, { caption }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'updateCaptionSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'updateCaptionFailure',
            payload: err.response.data.message
        })
    }
}

export const newPost = (img, caption) => async dispatch => {
    try {
        dispatch({ type: 'newPostRequest' })
        const { data } = await axios.post(`/post/upload`, { img, caption }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'newPostSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'newPostFailure',
            payload: err.response.data.message
        })
    }
}

export const delComment = (postID, commentID) => async dispatch => {
    try {
        dispatch({ type: 'delCommentRequest' })
        const { data } = await axios.delete(`/comment/${postID}`, { data: { commentID } }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'delCommentSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'delCommentFailure',
            payload: err.response.data.message
        })
    }
}

export const delPost = postID => async dispatch => {
    try {
        dispatch({ type: 'delPostRequest' })
        const { data } = await axios.delete(`/post/${postID}`)
        dispatch({
            type: 'delPostSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'delPostFailure',
            payload: err.response.data.message
        })
    }
}