const mongoose = require("mongoose")

const Schema = mongoose.Schema

var tokenSchema = new Schema({
    userID:    {type: String, required: true}
})


mongoose.model("tokenCollection", tokenSchema)

