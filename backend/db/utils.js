const dotenv = require("dotenv");
dotenv.config();
var mongoose = require("mongoose");
var db = require("./db");

mongoose.set("useFindAndModify", false);

mongoose
	.connect(
		process.env.MONGO_ST,
		{ useNewUrlParser: true, useUnifiedTopology: true, auth: {user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD} }
	)
	.then(() => console.log("Connected to database..."))
	.catch((err) => console.log("error", err));

function getAll() {
	return new Promise((resolve, reject) => {
		db.find({})
			.then((Allentries) => {
				resolve(Allentries);
			})
			.catch((err) => {
				reject("Error occured while getting all entries");
			});
	});
}

function createNewEntry(data) {
	return new Promise((resolve, reject) => {
		db.create(data)
			.then(() => {
				resolve("Successfully created new entry !!");
			})
			.catch((err) => {
				reject("Wrong format for entry");
			});
	});
}

function updateEntry(data) {
	return new Promise((resolve, reject) => {
		// console.log("data from updateEntry:- ", data);
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			db.findByIdAndUpdate(
				data._id,
				{
					$set: {
						name: data.name,
						likes: data.likes,
					},
				},
				(err, docs) => {
					if (err) {
						console.log("error while updating data");
						reject("Error occured while updating entry");
					} else {
						console.log(docs);
						resolve(docs);
					}
				}
			);
		} else {
			console.log("invalid id for updation");
			reject("Invalid id for updation");
		}
	});
}

function deleteEntry(data) {
	return new Promise((resolve, reject) => {
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			db.findByIdAndDelete(data._id, (err, docs) => {
				if (err) {
					reject("Error occured while deleting entry");
				} else {
					resolve(docs);
				}
			});
		} else {
			reject("Invalid id for deletion");
		}
	});
}

module.exports = {
	getAll,
	createNewEntry,
	updateEntry,
	deleteEntry,
};
