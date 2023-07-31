const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
var cors = require('cors')

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = ['http://localhost:5500',
                      'http://127.0.0.1:5500'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
