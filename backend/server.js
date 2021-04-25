const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
var logger = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use("/lib", express.static(path.join(__dirname, "node_modules")));
app.use(cors());

app.get("/api/", (req, res) => {
	res.send("hello from express!!");
});

const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "OPTIONS"],
	},
	path: "/socket/",
	// wsEngine: require("eiows").Server,
	// wsEngine: "ws",
});

const { getAll, createNewEntry, updateEntry, deleteEntry } = require("./utils");

io.on("connection", (socket) => {
	console.log("new user join with id (((( :- ", socket.id);
	console.log(socket.client.conn.server.clientsCount + " users connected");
	// console.log(JSON.stringify(socket, undefined, 4));
	console.log("usl", socket.handshake.headers.host);
	socket.on("getAll", () => {
		getAll()
			.then((value) => {
				// console.log(value);
				console.log("emmitting getAll to current user");
				socket.emit("getAll", value);
			})
			.catch((err) => {
				console.log("10.", err);
				socket.emit(
					"getAll",
					JSON.parse("Error occured while getting all entries")
				);
			});
	});
	socket.on("createEntry", (data) => {
		console.log("create new entry :- ", data);
		createNewEntry(data)
			.then(() => {
				getAll()
					.then((value) => {
						// console.log(value);
						console.log("emmitting getAll to all user");
						io.emit("getAll", value);
					})
					.catch((err) => {
						console.log("4.", err);
						// io.emit(
						// 	"getAll",
						// 	JSON.parse("Error occured while getting all entries")
						// );
					});
			})
			.catch((err) => console.log("1. ", err));
	});
	socket.on("updateEntry", (data) => {
		console.log("updateentry", data);
		updateEntry(data)
			.then(() => {
				getAll()
					.then((value) => {
						// console.log(value);
						console.log("emmitting getAll to all user");
						io.emit("getAll", value);
					})
					.catch((err) => {
						console.log("2.", err);
						// io.emit(
						// 	"getAll",
						// 	JSON.parse("Error occured while getting all entries")
						// );
					});
			})
			.catch((err) => console.log("3. ", err));
	});
	socket.on("deleteEntry", (data) => {
		console.log("deleteentry", data);
		deleteEntry(data)
			.then(() => {
				getAll()
					.then((value) => {
						// console.log(value);
						console.log("emmitting getAll to all user");
						io.emit("getAll", value);
					})
					.catch((err) => {
						console.log("5.", err);
						// io.emit(
						// 	"getAll",
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
