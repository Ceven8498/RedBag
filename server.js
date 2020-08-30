const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
// import sequelize connection
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const chmod = require('chmod');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const exphbs = require('express-handlebars');
 const hbs = exphbs.create({});
const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    timezone: 'utc',
    store: new SequelizeStore({
      db: sequelize
    })
  };
  

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');
app.use(session(sess));
app.use(routes);


// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
