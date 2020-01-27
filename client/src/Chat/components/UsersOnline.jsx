import React from "react"
import PropTypes from "prop-types"
import { UserContainer, OnlineUser, OnlineSince } from "../styles"

export default function UsersOnline({ users }) {
  return (
    <UserContainer>
      Users Online
      {users.map(user => (
        <OnlineUser key={user.online_at}>
          {/* FIXME use moment.js for thime */}
          <div>{user.username}</div>
          <OnlineSince>{user.online_at}</OnlineSince>
        </OnlineUser>
      ))}
    </UserContainer>
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
