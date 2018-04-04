const mongoose = require('mongoose')
// equiv to const Schema = mongoose.Schema
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String
})

mongoose.model('users', userSchema)
