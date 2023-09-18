import axios from 'axios'

export const registerUser = (name, email, password, chavi) => async dispatch => {
    try {
        dispatch({ type: 'registerRequest' })
        const { data } = await axios.post('/register', { name, email, password, chavi }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'registerSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'registerFailure',
            payload: err.response.status
        })
    }
}

export const loginUser = (email, password) => async dispatch => {
    try {
        dispatch({ type: 'loginRequest' })
        const { data } = await axios.post('/login', { email, password }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'loginSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'loginFailure',
            payload: err.response.status
        })
    }
}

export const forgotPassword = email => async dispatch => {
    try {
        dispatch({ type: 'forgotPasswordRequest' })
        const { data } = await axios.post('/forgotpassword', { email }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'forgotPasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'forgotPasswordFailure',
            payload: err.response.data.message
        })
    }
}

export const updateProfile = (email, name, chavi) => async dispatch => {
    try {
        dispatch({ type: 'updateProfileRequest' })
        const { data } = await axios.put('/update/profile', { name, email, chavi }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'updateProfileSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'updateProfileFailure',
            payload: err.response.data.message
        })
    }
}

export const changePassword = (old, newP) => async dispatch => {
    try {
        dispatch({ type: 'changePasswordRequest' })
        const { data } = await axios.put('/update/password', { old, newP, }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'changePasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'changePasswordFailure',
            payload: err.response.data.message
        })
    }
}

export const resetPassword = (token, password) => async dispatch => {
    try {
        dispatch({ type: 'resetPasswordRequest' })
        const { data } = await axios.put(`/resetpassword/${token}`, { password }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'resetPasswordSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'resetPasswordFailure',
            payload: err.response.data.message
        })
    }
}

export const loadUser = () => async dispatch => {
    try {
        dispatch({ type: 'loadUserRequest' })
        const { data } = await axios.get('/myProfile')
        dispatch({
            type: 'loadUserSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'loadUserFailure',
            payload: err.response.data.message
        })
    }
}

export const getFollowingPost = () => async dispatch => {
    try {
        dispatch({ type: 'postOfFollowingRequest' })
        const { data } = await axios.get('/posts')
        console.log();
        dispatch({
            type: 'postOfFollowingSuccess',
            payload: data.posts
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'postOfFollowingFailure',
            payload: err.response.data.message
        })
    }
}

export const getAllUsers = (text = '') => async dispatch => {
    try {
        dispatch({ type: 'allUsersRequest' })
        const { data } = await axios.get(`/all?name=${text}`)
        dispatch({
            type: 'allUsersSuccess',
            payload: data.users
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'allUsersFailure',
            payload: err.response.data.message
        })
    }
}

export const getMyPosts = () => async dispatch => {
    try {
        dispatch({ type: 'myPostsRequest' })
        const { data } = await axios.get('/myposts')
        dispatch({
            type: 'myPostsSuccess',
            payload: data.posts
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'myPostsFailure',
            payload: err.response.data.message
        })
    }
}

export const getUserPosts = id => async dispatch => {
    try {
        dispatch({ type: 'userPostsRequest' })
        const { data } = await axios.get(`/userposts/${id}`)
        dispatch({
            type: 'userPostsSuccess',
            payload: data.posts
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'userPostsFailure',
            payload: err.response.data.message
        })
    }
}

export const getUserProfile = userID => async dispatch => {
    try {
        dispatch({ type: 'userProfileRequest' })
        const { data } = await axios.get(`/profile/${userID}`)
        dispatch({
            type: 'userProfileSuccess',
            payload: data.user
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'userProfileFailure',
            payload: err.response.data.message
        })
    }
}

export const followUser = id => async dispatch => {
    try {
        dispatch({ type: 'followUserRequest' })
        const { data } = await axios.get(`/follow/${id}`)
        dispatch({
            type: 'followUserSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'followUserFailure',
            payload: err.response.data.message
        })
    }
}

export const logout = () => async dispatch => {
    try {
        dispatch({ type: 'logoutUserRequest' })
        await axios.get('/logout')
        dispatch({ type: 'logoutUserSuccess' })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'logoutUserFailure',
            payload: err.response.data.message
        })
    }
}

export const delProfile = () => async dispatch => {
    try {
        dispatch({ type: 'delProfileRequest' })
        await axios.delete('/del')
        dispatch({ type: 'delProfileSuccess' })
    } catch (err) {
        console.log(err);
        dispatch({
            type: 'delProfileFailure',
            payload: err.response.data.message
        })
    }
}
