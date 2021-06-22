var cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT||3001;
const exhandlebars = require('handlebars');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exhandlebars());
app.set('view engine', 'handlebars');

app.use(cookieParser());




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});