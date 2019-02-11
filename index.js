const winston = require('winston');
const express = require('express');

const app = express();

require('./startup/loggin')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/connect')();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up. Listening on port ${port}...`);
  winston.info(`Server is up. Listening on port ${port}...`);
});
