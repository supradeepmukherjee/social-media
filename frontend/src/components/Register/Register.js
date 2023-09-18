import { Avatar, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../../Actions/User'
import './Register.css'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [chavi, setChavi] = useState(null)
  const dispatch = useDispatch()
  const alert = useAlert()
  const handleImgChange = async e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      if (reader.readyState === 2) setChavi(reader.result)
    }
  }
  const submitHandler = async e => {
    e.preventDefault()
    dispatch(registerUser(name, email, password, chavi))
  }
  const { loading, error } = useSelector(state => state.user)
  useEffect(() => {
    if (error === 400) {
      alert.error("A person with this Email ID is already registered")
      dispatch({ type: 'clearError' })
    }
  }, [alert, dispatch, error])

  return (
    <div className='register'>
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant='h3' style={{ padding: '2vmax' }}>
          Social App
        </Typography>
        <Avatar src={chavi} sx={{ height: '10vmax', width: '10vmax' }} />
        <input type="file" accept='image/*' onChange={handleImgChange} />
        <input className='registerInputs' type="text" placeholder='Enter your Name' required value={name} onChange={e => setName(e.target.value)} />
        <input className='registerInputs' type="email" placeholder='Enter your email' required value={email} onChange={e => setEmail(e.target.value)} />
        <input className='registerInputs' type="password" placeholder='Enter your password' required value={password} onChange={e => setPassword(e.target.value)} />
        <Link to='/'>
          <Typography>
            Already Registered?
          </Typography>
        </Link>
        <Button disabled={loading} type='submit'>
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Register