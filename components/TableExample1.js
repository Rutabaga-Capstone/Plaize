import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native"
import { Table, TableWrapper, Row, Cell } from "react-native-table-component"
import BodyIcon from "./BodyIcon"

export default class TableView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tableHead: ["", "Name", "Date"],
			tableData: [
				["1", "Mrs. Smith", "Nov 11"],
				["a", "Mr. Jones", "Nov 19"],
				["1", "Ms. Brown", "Dec 1"],
				["a", "Mr. Juarez", "Dec 5"]
			]
		}
	}

	_alertIndex(index) {
		Alert.alert(`This is row ${index + 1}`)
	}

	render() {
		const state = this.state
		const element = (data, index) => (
			<TouchableOpacity onPress={() => this._alertIndex(index)}>
				<View style={styles.btn}>
					{/* <Text style={styles.btnText}></Text> */}
					<BodyIcon
					// name={
					// 	Platform.OS === "ios"
					// 		? `ios-checkmark-circle${focused ? "" : "-outline"}`
					// 		: "md-checkmark-circle"
					// }
					/>
				</View>
			</TouchableOpacity>
		)

		return (
			<View style={styles.container}>
				<Table borderStyle={{ borderColor: "transparent" }}>
					<Row
						data={state.tableHead}
						style={styles.head}
						textStyle={styles.text}
					/>
					{state.tableData.map((rowData, index) => (
						<TableWrapper key={index} style={styles.row}>
							{rowData.map((cellData, cellIndex) => (
								<Cell
									key={cellIndex}
									data={cellIndex === 0 ? element(cellData, index) : cellData}
									textStyle={styles.text}
								/>
							))}
						</TableWrapper>
					))}
				</Table>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 1,
		paddingTop: 30,
		backgroundColor: "#FFF",
		borderRadius: 2
	},
	head: { height: 40, backgroundColor: "#d6e8f2", fontSize: 32 },
	text: { margin: 2 },
	row: { flexDirection: "row", backgroundColor: "#FFF" },
	btn: {
		width: 58,
		height: 18,
		backgroundColor: "#89C238",
		borderRadius: 4,
		textAlign: "center"
	},
	btnText: { textAlign: "center", color: "#fff", margin: 0 },
	fontSize: 20
})
