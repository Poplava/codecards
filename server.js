var express = require('express'),
    app = express(),
    Cards = require('./server/models/Cards');

app.use(express.logger());
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.bodyParser());

app.set('views', 'server/views');
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 8000);

app.use(express.static('./dist'));

app.post('/cards', function(req, res) {
    var result = Cards.post(req.body);
    res.json(result);
});

app.get('/cards', Cards.get);

app.delete('/cards', Cards.delete);

app.get('/index', function(req, res) {
    res.render('index.dev.jade', { title: 'title' });
});

module.exports = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
