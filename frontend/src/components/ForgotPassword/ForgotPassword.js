import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../Actions/User'
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const { loading, msg, error } = useSelector(state => state.like)
    const dispatch = useDispatch()
    const alert = useAlert()
    const submitHandler = async e => {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }
    useEffect(() => {
        if (msg) {
            alert.success(msg)
            dispatch({ type: 'clearMsg' })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: 'clearError' })
        }
    }, [alert, dispatch, error, msg])
    return (
        <div className='forgotPassword'>
            <form className='forgotPasswordForm' action="" onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Social App
                </Typography>
                <input className='forgotPasswordInputs' type="email" placeholder='Enter your email' required value={email} onChange={e => setEmail(e.target.value)} />
                <Button disabled={loading} type='submit'>
                    Send Token
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword