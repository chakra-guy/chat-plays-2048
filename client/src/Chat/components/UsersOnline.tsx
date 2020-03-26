import React from "react"

import { formatTime } from "../../_common/utils"
import { UserContainer, OnlineUser, OnlineSince, Username } from "../styles"
import { getColor } from "../utils"
import { User } from "../_types/User"

type Props = {
  users: User[]
}

export default function UsersOnline({ users }: Props) {
  return (
    <UserContainer data-testid="users-online">
      Users Online
      {users.map(user => (
        <OnlineUser key={user.online_at}>
          <Username color={getColor(user.username)}>{user.username}</Username>
          <OnlineSince>{formatTime(user.online_at)}</OnlineSince>
        </OnlineUser>
      ))}
    </UserContainer>
  )
}
