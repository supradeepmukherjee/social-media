import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../Actions/User'
import './ChangePassword.css'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
    const { loading, error, msg } = useSelector(state => state.like)
    const dispatch = useDispatch()
    const alert = useAlert()
    const submitHandler = e => {
        e.preventDefault()
        if (password === cpassword) dispatch(changePassword(oldPassword, password))
        else alert('New Password and Confirmed Password do not match')
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
        <div className='login'>
            <form className='loginForm' action="" onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Change Password
                </Typography>
                <input className='changePasswordInputs' type="password" placeholder='Enter current password' required value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                <input className='changePasswordInputs' type="password" placeholder='Enter new password' required value={password} onChange={e => setPassword(e.target.value)} />
                <input className='changePasswordInputs' type="password" placeholder='Confirm new password' required value={cpassword} onChange={e => setcPassword(e.target.value)} />
                <Button disabled={loading} type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ChangePassword