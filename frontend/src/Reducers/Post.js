import { createReducer } from "@reduxjs/toolkit";

const initialState = {

}

export const likeReducer = createReducer(initialState, {
    likeRequest: state => {
        state.loading = true
    },
    likeSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    likeFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    addCommentRequest: state => {
        state.loading = true
    },
    addCommentSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    addCommentFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    delCommentRequest: state => {
        state.loading = true
    },
    delCommentSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    delCommentFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    followUserRequest: state => {
        state.loading = true
    },
    followUserSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    followUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    newPostRequest: state => {
        state.loading = true
    },
    newPostSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    newPostFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    delPostRequest: state => {
        state.loading = true
    },
    delPostSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    delPostFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    updateProfileRequest: state => {
        state.loading = true
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    updateProfileFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    changePasswordRequest: state => {
        state.loading = true
    },
    changePasswordSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    changePasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    delProfileRequest: state => {
        state.loading = true
    },
    delProfileSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    delProfileFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    forgotPasswordRequest: state => {
        state.loading = true
    },
    forgotPasswordSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    forgotPasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    resetPasswordRequest: state => {
        state.loading = true
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    updateCaptionRequest: state => {
        state.loading = true
    },
    updateCaptionSuccess: (state, action) => {
        state.loading = false
        state.msg = action.payload
    },
    updateCaptionFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearError: state => {
        state.error = null
    },
    clearMsg: state => {
        state.msg = null
    }
})

export const myPostsReducer = createReducer(initialState, {
    myPostsRequest: state => {
        state.loading = true
    },
    myPostsSuccess: (state, action) => {
        state.loading = false
        state.posts = action.payload
    },
    myPostsFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearError: state => {
        state.error = null
    },
    clearMsg: state => {
        state.msg = null
    }
})

export const userPostsReducer = createReducer(initialState, {
    userPostsRequest: state => {
        state.loading = true
    },
    userPostsSuccess: (state, action) => {
        state.loading = false
        state.posts = action.payload
    },
    userPostsFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearError: state => {
        state.error = null
    },
    clearMsg: state => {
        state.msg = null
    }
})
