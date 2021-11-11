const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Load en vars
dotenv.config({ path: './config/config.env' });

//Connect DB
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle romise rejection
process.on('UnhandledRejection', (err, promise) => {
  console.log(`Unhandled rejection: ${err.message}`);
  //Close server
  server.close(() => process.exit(1));
});