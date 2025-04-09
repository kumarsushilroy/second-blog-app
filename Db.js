
const mongoose = require('mongoose');

const connection = ()=>{
    mongoose.connect("mongodb+srv://romanreins488:DUrjB96L9h7j1s7O@cluster0.seplv39.mongodb.net/second-blog").then(()=>{ 
        console.log('connection successfull')
    }).catch((error)=>{
        console.log(error)  
    })
};


module.exports = connection;