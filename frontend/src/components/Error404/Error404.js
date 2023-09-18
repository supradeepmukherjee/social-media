import { ErrorOutline } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './Error404.css'

const Error404 = () => {
  return (
    <div className='error'>
      <div className="errorContainer">
        <ErrorOutline />
        <Typography variant='h2' style={{ padding: '2vmax' }}>
          Page not found
        </Typography>
        <Link to='/'>
          <Typography variant='h5'>
            Go to Home
          </Typography>
        </Link>
      </div>
    </div>
  )
}

export default Error404