const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//routes
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');


//config
dotenv.config();


connectDB();

const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



//routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blog', blogRoutes);



app.listen(process.env.PORT || 4000, ()=>{
    console.log(`Server listening on ${process.env.DEV_MODE} port ` + process.env.PORT);
})