var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Cards = mongoose.model('Cards', {
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    post: function(req, res) {
        var card = new Cards(req.body);

        card.save(function(err, data) {
            if (err) console.log(err);
            res.json(data);
        });
    },
    get: function(req, res) {
        var cards = [];

        Cards.find({}, function(err, docs) {
            res.json(docs);
        });
    },
    delete: function(req, res) {
        Cards.findByIdAndRemove(req.query.id, function() {
            res.json();
        });
    }
}
