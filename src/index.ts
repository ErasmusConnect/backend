import 'dotenv/config'

import express from 'express'
import defaultRouter from './routes'
import { logger } from './utils/logger'

const app = express()

app.use(express.json())
app.use('/', defaultRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    logger.info(`App is listening on port: ${PORT}`)
})
