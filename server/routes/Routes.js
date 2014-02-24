var Cards = require('../models/Cards');

module.exports = function(app) {
    app.post('/cards', Cards.post);
    app.get('/cards', Cards.get);
    app.delete('/cards', Cards.delete);
};
