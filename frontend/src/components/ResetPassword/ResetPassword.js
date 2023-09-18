import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { resetPassword } from '../../Actions/User'
import './ResetPassword.css'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
    const { loading, msg, error } = useSelector(state => state.like)
    const dispatch = useDispatch()
    const alert = useAlert()
    const { token } = useParams()
    const submitHandler = async e => {
        e.preventDefault()
        if (password === cpassword) dispatch(resetPassword(token, password))
        else alert('Passwords do not match')
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
        <div className='resetPassword'>
            <form className='resetPasswordForm' action="" onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Reset Password
                </Typography>
                <input className='resetPasswordInputs' type="password" placeholder='Enter new password' required value={password} onChange={e => setPassword(e.target.value)} />
                <input className='resetPasswordInputs' type="password" placeholder='Confirm new password' required value={cpassword} onChange={e => setcPassword(e.target.value)} />
                <Link to={'/forgotPassword'}>
                    <Typography>
                        Request Another Token
                    </Typography>
                </Link>
                <Typography style={{ marginLeft: '37vw' }}>
                    OR
                </Typography>
                <Link to={'/'}>
                    <Typography>
                        Login
                    </Typography>
                </Link>
                <Button disabled={loading} type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ResetPassword