var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dbSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: false,
    },
});

var db = mongoose.model("database", dbSchema);

module.exports = db;
