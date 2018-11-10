const express = require('express');
const exphbs  = require('express-handlebars');
// https://github.com/ericf/express-handlebars/issues/198
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: [
    'views/modules/'
  ]
});
const Data = require('./data/data');
const app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('dist'));

app.get('/', (req, res) => {
  let data = Data;
  res.render('index', data.context);
});

app.use(express.static('public/'));

app.listen(3000, () => {
  console.log('Server listening on port 3000')
});
