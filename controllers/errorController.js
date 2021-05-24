const AppError = require('./../utils/appError')

// Handle Duplicate Input Value Error Mongo
const handleDuplicateFieldsErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]

  const message = `Input value: ${value} already exist. Please enter another value`
  return new AppError(message, 400)
}

// Handle Cast Error from Mongo
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

// Handle Validation input errors from mongo
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((element) => element.message)

  const message = `Invalid input data. ${errors.join('. ')}`

  return new AppError(message, 400)
}

// Error Message sent in development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  })
}

// Error Message sent in production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    // Programming or unknown errors, aka bugs. don't leak that to clients
    console.log('ERROR 🥵', err)

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }

    if (error.name === 'CastError') error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDuplicateFieldsErrorDB(error)
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error)

    sendErrorProd(error, res)
  }
}
