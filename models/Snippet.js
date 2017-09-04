const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    body: String,
});

let Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;