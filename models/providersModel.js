const mongoose = require('mongoose')

const providersSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provider name is required']
  }
})

const Providers = mongoose.model('Providers', providersSchema)

exports.Providers = Providers
exports.providersSchema = providersSchema
