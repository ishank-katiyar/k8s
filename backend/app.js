var express = require("express");
var cors = require("cors");
var logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

// console.log(process.env.MONGO_ST);
var PORT = process.env.PORT || 3000;

var app = express();

// middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
app.use(logger("dev"));
// disabling etag, dk wht wll hppn ??
// app.disable("etag");
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//     })
// );
app.use(cors());

const { getAll, createNewEntry, updateEntry, deleteEntry } = require("./utils");

// Routes
app.get("/", (req, res) => {
	res.send("hello from express!!");
});

app.get("/getAll", (req, res) => {
	// db.find({})
	// 	.then((Allentries) => res.status(200).json(Allentries))
	// 	.catch((err) => {
	// 		// console.log("Error occured while getting all entries", err);
	// 		res.json("Error occured while getting all entries");
	// 	});
	// const data = getAll()
	getAll()
		.then((value) => {
			// console.log(value);
			res.status(200).json(value);
		})
		.catch((err) => res.json("Error occured while getting all entries"));
});

app.post("/createNewEntry", (req, res) => {
	// console.log(req.body);
	// db.create(req.body)
	// 	.then(() => {
	// 		res.json("Successfully created new entry !!");
	// 		// console.log("Succrssfully created new entry !!");
	// 	})
	// 	.catch((err) => {
	// 		res.json("Wrong format for entry");
	// 		// console.log("Error occured while creating new entry", err);
	// 	});
	createNewEntry(req.body)
		.then(() => res.json("Successfully created new entry !!"))
		.catch((err) => res.json("Wrong format for entry"));
});

app.post("/updateEntry", (req, res) => {
	// if (mongoose.Types.ObjectId.isValid(data._id)) {
	// 	db.findByIdAndUpdate(
	// 		data._id,
	// 		{
	// 			$set: {
	// 				name: data.name,
	// 				likes: data.likes,
	// 			},
	// 		},
	// 		(err, docs) => {
	// 			if (err) {
	// 				res.json("Error occured while updating entry");
	// 				// console.log("Error occured while updating entry");
	// 			} else {
	// 				res.json(docs);
	// 			}
	// 		}
	// 	);
	// } else {
	// 	res.json("Invalid id");
	// 	// console.log("invalid id in updateEntry");
	// }
	updateEntry(req.body)
		.then((value) => res.json(value))
		.catch((err) => res.json(err));
});

app.post("/deleteEntry", (req, res) => {
	// data = req.body;
	// if (mongoose.Types.ObjectId.isValid(data._id)) {
	// 	db.findByIdAndDelete(data._id, (err, docs) => {
	// 		if (err) {
	// 			res.json("Error occured while deleting entry");
	// 		} else {
	// 			res.json(docs);
	// 		}
	// 	});
	// }
	deleteEntry(req.body)
		.then((value) => res.json(value))
		.catch((err) => res.json(err));
});

app.listen(PORT, () => {
	console.log("Listening to the port " + PORT + "...");
});
