let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: "Author" },
    title: String
});

module.exports = mongoose.model("Story", storySchema);
