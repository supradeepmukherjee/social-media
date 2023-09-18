import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../Actions/User'
import User from '../User'
import './Search.css'

const Search = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const { loading, users } = useSelector(state => state.allUsers)
    const submitHandler = async e => {
        e.preventDefault()
        dispatch(getAllUsers(name))
    }
    return (
        <div className='search'>
            <form className="searchForm" onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Search a Person
                </Typography>
                <input type="text" placeholder='Update your Name' required value={name} onChange={e => setName(e.target.value)} />
                <Button disabled={loading} type='submit'>
                    Search
                </Button>
                <div className="searchResults">
                    {users && users.map(user => <User
                        key={user.id}
                        userID={user.id}
                        name={user.name}
                        chavi={user.chavi.url} />)}
                </div>
            </form>
        </div>
    )
}

export default Search