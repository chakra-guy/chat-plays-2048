import React from "react"

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
