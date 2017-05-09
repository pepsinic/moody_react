const mongoose = require("mongoose")
const Schema = mongoose.Schema

const findOrCreate = require('mongoose-findorcreate')

var userSchema = new Schema({
    username:  {
                type: String,
                trim: true, 
                lowercase: true,
                required: 'Username min 1 caracter',
                minlength: 1,
                unique: true
                },

    email:      {
                type: String,
                },

    password:  {
                type: String,
                required: 'Password missing or too short',
                minlength: 6
                }
}) // _id given automatically! 

userSchema.plugin(findOrCreate);

mongoose.model("userCollection", userSchema)

// mongoose.connection.collections["usercollections"].drop( function(err) { 
// // the name of the collection MUST be without CAPITAL letter and plural!!!!!! otherwise undefined
//     console.log('collection dropped');
// })

// OPTION SCHEMA  for email : {type: mongoose.SchemaTypes.Email, required: true}

