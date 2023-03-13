import express from 'express'
import errorHandler from './middlewares/error_handler'
import '@shared/helpers/container'
import routes from './routes'

const application = express()

application.use(express.json())

application.use(routes)
application.use(errorHandler)

export default application
