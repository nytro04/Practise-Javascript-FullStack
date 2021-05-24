const mongoose = require('mongoose')
const validator = require('validator')
const { providersSchema } = require('./../models/providersModel')

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  providers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Providers'
    }
  ]
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
