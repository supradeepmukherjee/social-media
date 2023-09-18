import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Actions/User'
import './Login.css'
import { useAlert } from 'react-alert'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const alert = useAlert()
    const { error } = useSelector(state => state.user)
    const { msg } = useSelector(state => state.like)
    const loginHandler = e => {
        e.preventDefault()
        dispatch(loginUser(email, password))
    }
    useEffect(() => {
        if (error === 400) {
            alert.error('Email ID/Password is incorrect')
            dispatch({ type: 'clearError' })
        }
        if (msg) {
            alert.success(msg)
            dispatch({ type: 'clearMsg' })
        }
    }, [alert, dispatch, error, msg])
    return (
        <div className='login'>
            <form className='loginForm' action="" onSubmit={loginHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Social App
                </Typography>
                <input type="email" placeholder='Enter your email' required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Enter your password' required value={password} onChange={e => setPassword(e.target.value)} />
                <Link to={'/forgotPassword'}>
                    <Typography >
                        Forgot Password?
                    </Typography>
                </Link>
                <Button type='submit'>
                    Login
                </Button>
                <Link to={'/register'}>
                    <Typography >
                        New User?
                    </Typography>
                </Link>
            </form>
        </div>
    )
}

export default Login