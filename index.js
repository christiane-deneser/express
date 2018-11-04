const express = require('express');
const exphbs  = require('express-handlebars');
// https://github.com/ericf/express-handlebars/issues/198
const hbs = exphbs.create({
  extname: '.hbs',
  partialsDir: [
    'views/partials/'
  ]
});
const Data = require('./data/data');
const app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.listen(3000, () => {
  console.log('Server listening on port 3000')
});

app.get('/', (req, res) => {
  let data = Data;
  res.render('index', data.context);
});
