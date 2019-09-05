const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

//settings
app.set('port',process.env.PORT || 3000);
app.engine('hbs',exphbs({
  extname:'hbs',
  layoutsDir:path.resolve('src/views/layouts'),
  partialsDir:path.resolve('src/views/partials'),
  defaultLayout:'main.hbs'
}));
app.set('view engine','hbs')
app.set('views',path.resolve('src/views'));

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve('src/public')));

//routes
const AppRoutes = require('./routes/index');
app.use('/',AppRoutes);

module.exports = app;