const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    
    },
    password:{
        type:String,
        required:true
        

    }
},
{timestamps : true}
)


module.exports = mongoose.model('user', userSchema);