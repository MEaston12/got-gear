var cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT||3001;
const exhandlebars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.engine('handlebars', exhandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(cookieParser());





// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));    
})
.catch(err => {
    console.log(err)
});