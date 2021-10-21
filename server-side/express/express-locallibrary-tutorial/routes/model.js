let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let SomeModelSchema = new Schema(
    {
        a_string: String,
        a_date: Date
    }
);

let SomeModel = mongoose.model('SomeModel', SomeModelSchema);
