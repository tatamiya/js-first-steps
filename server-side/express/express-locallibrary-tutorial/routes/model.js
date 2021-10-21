let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let SomeModelSchema = new Schema(
    {
        a_string: String,
        a_date: Date
    }
);

let SomeModel = mongoose.model('SomeModel', SomeModelSchema);

let awesome_instance = new SomeModel({ name: 'awesome' });

awesome_instance.save(function (err) {
    if (err) return handleError(err);
});

SomeModel.create({ name: 'also_awesome' }, function (err, awsome_instance) {
    if (err) return handleError(err);
});

console.log(awesome_instance.name);

awesome_instance.name = "New cool name";
awesome_instance.save(function (err) {
    if (err) return handleError(err);
});
