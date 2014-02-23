var express = require('express'),
    app = express();

app.use(express.logger());
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.bodyParser());

app.set('views', 'server/views');
app.set('view engine', 'jade');

app.get('/index', function(req, res) {
    res.render('index.dev.jade', { title: 'title' });
});

module.exports = app;
