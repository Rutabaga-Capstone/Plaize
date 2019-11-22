import React from "react"
import { users } from "../seed"

export default function AllUsers(props) {
	const allUsers = users
	return <SingleUser users={allUsers} />
}
