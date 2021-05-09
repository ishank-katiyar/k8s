import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./App.css";

// const dotenv = require("dotenv");
// dotenv.config();
// const endpoint = process.env.REACT_APP_API_ENDPOINT;

const config = require("../config/config");

let socket;

try {
	console.log("going to connect to socket");
	socket = socketIOClient("", {
		path: config.SOCKET_ENDPOINT,
		// transports: ["websocket", "polling", "flashsocket"],
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
		// const socket = socketIOClient(config.API_ENDPOINT);
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

	// useEffect(() => {
	// 	console.log("useEffect");
	// 	axios
	// 		.get(config.API_ENDPOINT + "/getAll", { validateStatus: () => true })
	// 		.then((res) => {
	// 			setdata(res.data);
	// 			console.log("data from api", res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log("error occured while getting data from api", err);
	// 			console.log(JSON.stringify(err));
	// 			console.log(JSON.stringify(err, undefined, 4));
	// 		});
	// }, []);

	// const RefreshData = () => {
	// 	// console.log("RefreshData");
	// 	axios.get(config.API_ENDPOINT + "/getAll").then((res) => {
	// 		// console.log(res);
	// 		setdata(res.data);
	// 	});
	// };

	const AddData = () => {
		// console.log("Adddata");
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

		// axios
		// 	.post(config.API_ENDPOINT + "/createNewEntry", newdata)
		// 	.then((res) => {
		// 		console.log(res);
		// 		if (res.data === "Successfully created new entry !!") {
		// 			setnewdata({ name: "", likes: 0 });
		// 			RefreshData();
		// 		}
		// 		// console.log(res);
		// 	})
		// 	.catch((err) =>
		// 		console.log("error occured while creating new entry", err)
		// 	);
	};

	const UpdateData = (idx) => {
		// console.log("UpdateData");
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
		// axios
		// 	.post(config.API_ENDPOINT + "/updateEntry", Data)
		// 	.then((res) => {
		// 		// console.log(res);
		// 	})
		// 	.catch((err) => console.log("error occured while updating data", err));
	};

	const DeleteData = (idx) => {
		// console.log("DeleteData");
		const Data = {
			_id: data[idx]._id,
		};
		try {
			socket.emit(config.DELETE_ENTRY, Data);
		} catch (err) {
			console.log("4", err);
		}
		// axios
		// 	.post(config.API_ENDPOINT + "/deleteEntry", Data)
		// 	.then((res) => {
		// 		if (res.statusText === "OK") {
		// 			RefreshData();
		// 		} else {
		// 			console.log(res);
		// 		}
		// 	})
		// 	.catch((err) => console.log("error occured while deleting data", err));
	};

	// useEffect(() => {
	// 	socket.emit(config.REFRESH);

	// 	socket.on(config.REFRESH, (res) => {
	// 		console.log("data from socket", res);
	// 		setdata(res);
	// 	});
	// }, []);

	const handlechange = (idx, col, value) => {
		// console.log("Handlechange");
		// console.log(data);
		// console.log(data[0]);
		let newdata = data;
		if (col === "name") {
			newdata[idx].name = value;
		} else if (col === "likes") {
			newdata[idx].likes = value;
		}
		// console.log("newdata", newdata);
		setdata([...newdata]);
	};

	const handlechangenewdata = (col, value) => {
		// console.log("Handlechangenewdata");
		let nn = newdata;
		if (col === "name") {
			nn.name = value;
		} else if (col === "likes") {
			nn.likes = value;
		}
		// console.log("new new entry", nn);
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
			{/* <div>
				<button onClick={() => RefreshData()}>Refresh page</button>
			</div> */}
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
