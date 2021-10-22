let Story = require("../models/storymodel");
let Author = require("../models/authormodel");

let bob = new Author({ name: 'Bob Smith' });

bob.save(function (err) {
    if (err) return handleError(err);

    let story = new Story({
        title: "Bob goes sledding",
        author: bob.id
    });

    story.save(function (err) {
        if (err) return handleError(err);
    });
});

Story
    .findOne({ title: "Bob goes sledding" })
    .populate("author")
    .exec(function (err, story) {
        if (err) return handleError(err);
        console.log("The author is %s", story.author.name);
    });

Story
    .find({ author: bob._id })
    .exec(function (err, stories) {
        if (err) return handleError(err);
    });