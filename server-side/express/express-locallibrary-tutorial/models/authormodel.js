let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let authorSchema = Schema({
    name: String,
    stories: [{ type: Schema.Types.ObjectId, ref: "Story" }]
});

module.exports = mongoose.model("Author", authorSchema);