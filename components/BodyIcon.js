import React from "react"
import { Ionicons } from "@expo/vector-icons"

import Colors from "../constants/Colors"

export default function BodyIcon(props) {
	return (
		<Ionicons
			name={props.name}
			size={26}
			style={{ marginBottom: -3 }}
			color={props.focused ? Colors.bodyIconSelected : Colors.bodyIconDefault}
		/>
	)
}
