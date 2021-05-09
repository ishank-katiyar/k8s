import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./App.css";

const config = require("../config/config");

let socket;

try {
	console.log("going to connect to socket");
	socket = socketIOClient("", {
		path: config.SOCKET_ENDPOINT,
	});
	console.log(socket);
} catch (err) {
	console.log("6.", err);
}

function App() {
	const [data, setdata] = useState([]);
	
	const [newdata, setnewdata] = useState({ name: "", likes: 0 });

	try {
		socket.on(config.REFRESH, (res) => {
			console.log("data from socket", res);
			setdata(res);
		});
	} catch (err) {
		console.log("5", err);
	}

	useEffect(() => {
		console.log("component reload...");
		try {
			axios
				.get(config.API_ENDPOINT + "/")
				.then((res) => {
					console.log(res);
					console.log("backend connected...");
				})
				.catch((err) => {
					console.log("cannot connect to backend...", err);
				});
		} catch (err) {
			console.log("7.", err);
		}
		try {
			socket.emit(config.REFRESH);
		} catch (err) {
			console.log("1", err);
		}
	}, []);

	const AddData = () => {
		if (newdata.name === "" || newdata.name === undefined) {
			alert("name cannot be empty");
			return;
		}
		try {
			socket.emit(config.CREATE_ENTRY, newdata);
		} catch (err) {
			console.log("2.", err);
		}
		setnewdata({ name: "", likes: 0 });
	};

	const UpdateData = (idx) => {
		const Data = {
			_id: data[idx]._id,
			name: data[idx].name,
			likes: data[idx].likes,
		};
		try {
			socket.emit(config.UPDATE_ENTRY, Data);
		} catch (err) {
			console.log("3", err);
		}
	};

	const DeleteData = (idx) => {
		const Data = {
			_id: data[idx]._id,
		};
		try {
			socket.emit(config.DELETE_ENTRY, Data);
		} catch (err) {
			console.log("4", err);
		}
	};

	const handlechange = (idx, col, value) => {
		let newdata = data;
		if (col === "name") {
			newdata[idx].name = value;
		} else if (col === "likes") {
			newdata[idx].likes = value;
		}
		setdata([...newdata]);
	};

	const handlechangenewdata = (col, value) => {
		let nn = newdata;
		if (col === "name") {
			nn.name = value;
		} else if (col === "likes") {
			nn.likes = value;
		}
		setnewdata({
			name: nn.name,
			likes: nn.likes,
		});
	};

	const Row = (ele, idx) => {
		return (
			<tbody key={idx}>
				<tr>
					<th>
						<input
							type="text"
							value={ele.name}
							onChange={(event) =>
								handlechange(idx, "name", event.target.value)
							}
						></input>
					</th>
					<th>
						<input
							type="number"
							value={ele.likes}
							onChange={(event) =>
								handlechange(
									idx,
									"likes",
									Number(event.target.value)
								)
							}
						></input>
					</th>
					<th>
						<button onClick={() => UpdateData(idx)}>update</button>
					</th>
					<th>
						<button onClick={() => DeleteData(idx)}>delete</button>
					</th>
				</tr>
			</tbody>
		);
	};

	return (
		<div>
			<table>
				{data.map((ele, idx) => {
					return Row(ele, idx);
				})}
			</table>
			<div style={{ fontSize: `30px`, margin: `20px` }}>
				Add element:-
			</div>
			<div style={{ fontSize: `20px`, margin: `10px` }}>
				<label>Name: </label>
				<input
					type="text"
					value={newdata.name}
					onChange={(event) =>
						handlechangenewdata("name", event.target.value)
					}
				/>
			</div>
			<div style={{ fontSize: `20px`, margin: `10px` }}>
				<label>likes: </label>
				<input
					type="number"
					value={newdata.likes}
					onChange={(event) =>
						handlechangenewdata("likes", Number(event.target.value))
					}
				/>
			</div>
			<div style={{ margin: `10px` }}>
				<button onClick={() => AddData()} style={{ fontSize: `20px` }}>
					Add
				</button>
			</div>
		</div>
	);
}

export default App;
