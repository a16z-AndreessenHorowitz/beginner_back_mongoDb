const mongoose = require('mongoose')
const generate=require("../helpers/generate")
const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    tokenUser:{
        type:String,
        default:generate.generateRandomString(20)
    },
    phone:String,
    avatar:String,
    // role_id:String, bên admin thui
    status:{
      type:String,
      default:"active"
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt: Date
},{
    timestamps:true//truyền true thay đọan code phía dưới
    // timestamps: {
    //     createdAt: 'created_at', // Use `created_at` to store the created date
    //     updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    //   }
});

const User = mongoose.model('User', userSchema,'users');

module.exports = User;