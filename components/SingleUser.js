import React from 'react'

export default function SingleUser(props) {
  const users = props.users
  return users.map(user => {
    return user.name
  })
}
