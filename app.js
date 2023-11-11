const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


// JWT Authentication
const authJwt = require('./helpers/jwt');
app.use(authJwt());


// Error handling
const errorHandler = require('./helpers/error-handler.js');
app.use(errorHandler);

// Routes
const api = process.env.API_URL;
app.use(`${api}/quotes`, require('./routes/quotes'));
app.use(`${api}/users`, require('./routes/users'));

// Database Connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'quote_db',
}).then(() => { console.log('Database Connection is ready...')}).catch((error) => {  console.log(error) });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

