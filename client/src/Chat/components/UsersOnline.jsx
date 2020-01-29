import React from "react"
import PropTypes from "prop-types"
import convertToStyles from "material-color-hash"

import { formatTime } from "../../_common/utils"
import { UserContainer, OnlineUser, OnlineSince, Username } from "../styles"

export default function UsersOnline({ users }) {
  return (
    <UserContainer data-testid="users-online">
      Users Online
      {users.map(user => (
        <OnlineUser key={user.online_at}>
          <Username styles={convertToStyles(user.username)}>
            {user.username}
          </Username>
          <OnlineSince>{formatTime(user.online_at)}</OnlineSince>
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
