const mongoose = require('mongoose');

blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    author:{
        type:String,
        required:true
        
    
    },
    photo:String
    
},
{timestamps : true}
)


module.exports = mongoose.model('Blog', blogSchema);