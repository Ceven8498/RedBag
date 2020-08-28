const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
