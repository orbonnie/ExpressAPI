const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//Load en vars
dotenv.config({ path: './config/config.env' });

//Connect DB
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Body parser
app.use(express.json());

//custom middleware in MW folder
// app.use(logger);

//third party MW
// run only in dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Welcome to Bootcamps');
})

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//Handle promise rejection
process.on('UnhandledPromiseRejection', (err, promise) => {
  console.log(`Unhandled rejection: ${err.message}`.red);
  //Close server
  server.close(() => process.exit(1));
});