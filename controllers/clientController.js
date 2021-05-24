const Client = require('../models/clientModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const { Providers } = require('../models/providersModel')

/**
 * [getAllClients fetches all clients]
 *
 * @param   {[type]}  async  [async description]
 * @param   {[type]}  req    [req description]
 * @param   {[type]}  res    [res description]
 * @param   {[type]}  next   [next description]
 *
 * @return  {[json]}         [return all found clients]
 */
exports.getAllClients = catchAsync(async (req, res, next) => {
  // const clients = await Client.find().populate('providers', { _id: 1 })
  const clients = await Client.find().populate('providers')

  res.status(200).json({
    status: 'success',
    length: clients.length,
    data: {
      clients
    }
  })
})

/**
 * [createClient - create new client]
 *
 * @param   {[type]}  async  [async description]
 * @param   {[type]}  req    [req description]
 * @param   {[type]}  res    [res description]
 * @param   {[type]}  next   [next description]
 *
 * @return  {[json]}         [return newly created client]
 */
exports.createClient = catchAsync(async (req, res, next) => {
  // data from request body
  const { name, email, phone, providers } = req.body

  // check for required fields
  if (!name) return next(new AppError('Please provide a name', 400))
  if (!email) return next(new AppError('Please provide an email', 400))
  if (!phone) return next(new AppError('Please provide a phone number', 400))

  // const newProviders = providers.id

  // console.log(newProviders, 'new provjdrs')

  const client = {
    name,
    email,
    phone,
    providers
  }

  //create new client
  const newClient = await Client.create(client)

  //send response
  res.status(201).json({
    status: 'success',
    data: {
      client: newClient
    }
  })
})

exports.getClient = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id).populate('providers')

  if (!client) return next(new AppError('No client with ID was found', 404))

  res.status(200).json({
    status: 'success',
    data: {
      client
    }
  })
})

exports.updateClient = catchAsync(async (req, res, next) => {
  const { name, email, phone, providers } = req.body

  // check for required fields
  if (!name) return next(new AppError('Please provide a name'))
  if (!email) return next(new AppError('Please provide an email'))
  if (!phone) return next(new AppError('Please provide a phone number'))

  const client = {
    name,
    email,
    phone,
    providers
  }

  const updatedClient = await Client.findByIdAndUpdate(req.params.id, client, {
    new: true,
    runValidators: true
  })

  if (!updatedClient) {
    return next(new AppError('No client was found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      client: updatedClient
    }
  })
})

exports.deleteClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id)

  if (!client) return next(new AppError('No client found with that ID', 404))

  res.status(204).json({
    status: 'success',
    data: null
  })
})
