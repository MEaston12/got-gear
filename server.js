require('dotenv').config();
const cookieParser = require('cookie-parser');
const fs = require('fs');
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const sass = require('sass');
const app = express();
const PORT = process.env.PORT||3001;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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