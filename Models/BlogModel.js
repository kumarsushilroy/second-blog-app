
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:[true, 'title is required']
    },

    description:{
        type:String,
        required:[true, 'title is required']
    },
    
    image:{
        type:String,
        required:[true, 'title is required']
    }, 

    user:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        requred:[true, 'user is required']
    },
    
    
});

module.exports = mongoose.model('blogs', blogSchema);



