
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username is require']
    },

    email:{
        type:String,
        required:[true, 'email is required']
    },

    password:{
        type:String,
        required:[true, 'password is require']
    },  

    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'blogs'
        } 
        
    ]
});

module.exports = mongoose.model('users', userSchema);