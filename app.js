const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('swagger-jsdoc')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

//Import routers from routes folder
const clientRouter = require('./routes/clientRoutes')
const providerRouter = require('./routes/providerRoutes')

const swaggerOption = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProTranslating API',
      version: '1.0.0',
      description:
        'Node Express API for ProTranslating FullStack Javascript practical Test'
    },
    servers: [
      {
        url: 'http://localhost:8888'
      }
    ]
  },
  apis: ['./routes/*.js ']
}

const swaggerSpecs = swaggerDocs(swaggerOption)

const app = express()

// for swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))

//morgan is logging http request in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// rate limit => prevents too many request one IP
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request this IP, please try again in an hour'
})

app.use('/api', limiter)

//handling cors
app.use(cors())
app.options('*', cors())

// Routes Middleware
app.use('/api/v1/clients', clientRouter)
app.use('/api/v1/providers', providerRouter)

//catch all unhandled routes all(get,post,update,delete) * == all

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404))
})

//Global error handler
app.use(globalErrorHandler)

module.exports = app
