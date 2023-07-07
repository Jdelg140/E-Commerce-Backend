const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize= require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: true }) 
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
