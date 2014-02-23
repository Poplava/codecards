var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Cards = mongoose.model('Cards', {
    title: String,
    text: String
});

module.exports = {
    post: function(data) {
        var card = new Cards(data);

        card.save(function(err) {
            if (err) console.log(err);
        });

        return card;
    },
    get: function(req, res) {
        var cards = [];

        Cards.find({}, function(err, docs) {
            res.json(docs);
        });
    },
    delete: function(req, res) {
        Cards.findById(req.query.id).remove().exec(function() {
            res.json();
        });
    }
}
