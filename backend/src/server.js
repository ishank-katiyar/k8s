const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

const { getAll, createNewEntry, updateEntry, deleteEntry } = require("../db/utils");
const config = require("../config/config");

if (process.env.NODE_ENV === "production") {
	console.log = function() {};
}

if (process.env.NODE_ENV === "development") {
	var logger = require("morgan");
	// To test if backend is connected
	app.get(config.API_ENDPOINT, (req, res) => {
		res.status(200).json("hello from express!!");
	});
}

const server = http.createServer(app);

const io = socketio(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "OPTIONS"],
	},
	path: config.SOCKET_ENDPOINT,
});

io.on("connection", (socket) => {
	console.log("new user join with id (((( :- ", socket.id);
	console.log(socket.client.conn.server.clientsCount + " users connected");
	// console.log("usl", socket.handshake.headers.host);

	socket.on(config.REFRESH, () => {
		getAll()
			.then((value) => {
				// console.log(value);
				console.log("emmitting getAll to current user");
				socket.emit(config.REFRESH, value);
			})
			.catch((err) => {
				console.log("10.", err);
				socket.emit(
					config.REFRESH,
					JSON.parse("Error occured while getting all entries")
				);
			});
	});

	socket.on(config.CREATE_ENTRY, (data) => {
		console.log("create new entry :- ", data);
		createNewEntry(data)
			.then(() => {
				getAll()
					.then((value) => {
						// console.log(value);
						console.log("emmitting getAll to all user");
						io.emit(config.REFRESH, value);
					})
					.catch((err) => {
						console.log("4.", err);
						// io.emit(
						// 	config.REFRESH,
						// 	JSON.parse("Error occured while getting all entries")
						// );
					});
			})
			.catch((err) => console.log("1. ", err));
	});

	socket.on(config.UPDATE_ENTRY, (data) => {
		console.log(config.UPDATE_ENTRY, data);
		updateEntry(data)
			.then(() => {
				getAll()
					.then((value) => {
						// console.log(value);
						console.log("emmitting getAll to all user");
						io.emit(config.REFRESH, value);
					})
					.catch((err) => {
						console.log("2.", err);
						// io.emit(
						// 	config.REFRESH,
						// 	JSON.parse("Error occured while getting all entries")
						// );
					});
			})
			.catch((err) => console.log("3. ", err));
	});

	socket.on(config.DELETE_ENTRY, (data) => {
		console.log(config.DELETE_ENTRY, data);
		deleteEntry(data)
			.then(() => {
				getAll()
					.then((value) => {
						// console.log(value);
						console.log("emmitting getAll to all user");
						io.emit(config.REFRESH, value);
					})
					.catch((err) => {
						console.log("5.", err);
						// io.emit(
						// 	config.REFRESH,
						// 	JSON.parse("Error occured while getting all entries")
						// );
					});
			})
			.catch((err) => console.log("6. ", err));
	});

	socket.on("disconnect", () => {
		console.log("new user exit with id )))) :- ", socket.id);
	});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
