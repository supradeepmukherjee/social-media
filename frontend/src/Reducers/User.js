import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false
}

export const userReducer = createReducer(initialState, {
    loginRequest: state => {
        state.loading = true
    },
    loginSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    },
    loginFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    registerRequest: state => {
        state.loading = true
    },
    registerSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    },
    registerFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    loadUserRequest: state => {
        state.loading = true
    },
    loadUserSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    },
    loadUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    logoutUserRequest: state => {
        state.loading = true
    },
    logoutUserSuccess: state => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
    },
    logoutUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true
    },
    clearError: state => {
        state.error = null
    }
})

export const allUsersReducer = createReducer(initialState, {
    allUsersRequest: state => {
        state.loading = true
    },
    allUsersSuccess: (state, action) => {
        state.loading = false
        state.users = action.payload
    },
    allUsersFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearError: state => {
        state.error = null
    }
})

export const userProfileReducer = createReducer(initialState, {
    userProfileRequest: state => {
        state.loading = true
    },
    userProfileSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
    },
    userProfileFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearError: state => {
        state.error = null
    }
})

export const postOfFollowingReducer = createReducer(initialState, {
    postOfFollowingRequest: state => {
        state.loading = true
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading = false
        state.posts = action.payload
    },
    postOfFollowingFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearError: state => {
        state.error = null
    }
})