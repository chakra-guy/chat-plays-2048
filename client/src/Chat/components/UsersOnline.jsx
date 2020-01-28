import React from "react"
import PropTypes from "prop-types"
import convertToStyles from "material-color-hash"
import moment from "moment"

import { UserContainer, OnlineUser, OnlineSince, Username } from "../styles"

export default function UsersOnline({ users }) {
  return (
    <UserContainer>
      Users Online
      {users.map(user => (
        <OnlineUser key={user.online_at}>
          <Username styles={convertToStyles(user.username)}>
            {user.username}
          </Username>
          <OnlineSince>
            {moment(user.online_at)
              .startOf("minute")
              .fromNow()}
          </OnlineSince>
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
