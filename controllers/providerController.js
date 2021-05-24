const { Providers } = require('../models/providersModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

exports.createProvider = catchAsync(async (req, res, next) => {
  const { name } = req.body

  //check for required fields
  if (!name) return next(new AppError('Please a provider name', 400))

  const provider = { name }

  //create new provider
  const newProvider = await Providers.create(provider)

  //send response
  res.status(201).json({
    status: 'success',
    data: {
      provider: newProvider
    }
  })
})

exports.getAllProviders = catchAsync(async (req, res, next) => {
  const providers = await Providers.find()

  res.status(200).json({
    status: 'success',
    length: providers.length,
    data: {
      providers
    }
  })
})

exports.updateProvider = catchAsync(async (req, res, next) => {
  const { name } = req.body

  //check for required fields
  if (!name) return next(new AppError('Please provide a name'))

  const provider = { name }

  const updatedProvider = await Providers.findByIdAndUpdate(
    req.params.id,
    provider,
    { new: true, runValidators: true }
  )

  if (!updatedProvider) {
    return next(new AppError('No provider with ID was found', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      provider: updatedProvider
    }
  })
})

exports.getProvider = catchAsync(async (req, res, next) => {
  const provider = await Providers.findById(req.params.id)

  if (!provider) return next(new AppError('No provider with ID was found', 404))

  res.status(200).json({
    status: 'success',
    data: {
      provider
    }
  })
})

exports.deleteProvider = catchAsync(async (req, res, next) => {
  const provider = await Providers.findByIdAndDelete(req.params.id)

  if (!provider)
    return next(new AppError('No provider found with that ID', 404))

  res.status(204).json({
    status: 'success',
    data: null
  })
})
