require('dotenv').config();
const cookieParser = require('cookie-parser');
const fs = require('fs');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/connection');
const sass = require('sass');
const app = express();
const PORT = process.env.PORT||3001;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

const stylePath = './public/stylesheets/style.css';
const sassPath = './sass/style.sass';
fs.writeFileSync(stylePath, sass.renderSync({file: sassPath}).css);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});