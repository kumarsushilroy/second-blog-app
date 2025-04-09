
const express = require('express');
const dotenv = require('dotenv')
const connection = require('./Db');
const cors = require('cors')
dotenv.config();

//ROUTES
const UserRoute = require('./Routes/UserRoute')
const blogRoute = require('./Routes/BlogRoute')

const app = express();

const port = 4000;

//MIDDLE WARE
app.use(express.json());
app.use(cors())

//USER ROUTE
app.use(UserRoute);
//BLOG ROUTE
app.use(blogRoute);

app.get('/get', (req,res)=>{
    res.send({message:'true'}) 
})

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
    connection();
})