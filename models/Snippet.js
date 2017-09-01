const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    university: String,
    job: {
        type: String,
        default: ''
    },
    avatar: String,
});

let Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;