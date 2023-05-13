import express from 'express'
import errorHandler from './middlewares/error_handler'
import '@shared/helpers/container'
import routes from './routes'
import cors from 'cors'

const application = express()

application.use(express.json())
application.use(cors)

application.use(routes)
application.use(errorHandler)

export default application
