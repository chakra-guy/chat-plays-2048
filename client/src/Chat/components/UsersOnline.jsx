import React from "react"
import PropTypes from "prop-types"

export default function UsersOnline({ users }) {
  return (
    <div
      style={{
        height: "120px",
        border: "1px solid black",
      }}
    >
      <ul>
        {users.map(user => (
          <li key={user.online_at}>
            {/* use moment.js for thime */}
            {user.username} -{new Date(user.online_at).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

UsersOnline.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      online_at: PropTypes.string,
    }),
  ).isRequired,
}
