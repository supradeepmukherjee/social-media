import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

const User = ({ userID, name, chavi }) => {
  return (
    <Link to={`/user/${userID}`} className="homeUser">
      <img src={chavi} alt={name} />
      <Typography>
        {name}
      </Typography>
    </Link>
  )
}

export default User