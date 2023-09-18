import { Avatar, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updateProfile } from '../../Actions/User'
import Loader from '../Loader/Loader'
import './UpdateProfile.css'

const UpdateProfile = () => {
    const { loading, error, user } = useSelector(state => state.user)
    const { loading: updateLoading, error: updateError, msg } = useSelector(state => state.like)
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.name)
    const [chavi, setChavi] = useState(null)
    const [oldChavi, setOldChavi] = useState(user.chavi.url)
    const dispatch = useDispatch()
    const alert = useAlert()
    const handleImgChange = async e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            if (reader.readyState === 2) {
                setChavi(reader.result)
                setOldChavi(reader.result)
            }
        }
    }
    const submitHandler = async e => {
        e.preventDefault()
        await dispatch(updateProfile(email, name, chavi))
        dispatch(loadUser())
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: 'clearError' })
        }
        if (updateError) {
            alert.error(updateError)
            dispatch({ type: 'clearError' })
        }
        if (msg) {
            alert.success(msg)
            dispatch({ type: 'clearMsg' })
        }
    }, [alert, dispatch, error, msg, updateError])

    return (
        loading ? <Loader /> :
            <div className='updateProfile'>
                <form className="updateProfileForm" onSubmit={submitHandler}>
                    <Typography variant='h3' style={{ padding: '2vmax' }}>
                        Update Profile
                    </Typography>
                    <Avatar src={oldChavi} sx={{ height: '10vmax', width: '10vmax' }} />
                    <input type="file" accept='image/*' onChange={handleImgChange} />
                    <input className='updateProfileInputs' type="text" placeholder='Update your Name' required value={name} onChange={e => setName(e.target.value)} />
                    <input className='updateProfileInputs' type="email" placeholder='Update your email' required value={email} onChange={e => setEmail(e.target.value)} />
                    <Button disabled={updateLoading} type='submit'>
                        Update Profile
                    </Button>
                </form>
            </div>
    )

}

export default UpdateProfile