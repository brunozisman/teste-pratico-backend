import express from 'express'
import cors from 'cors'
import 'dotenv/config';

import routes from './routes'
import mongoose from 'mongoose';

class App {
    public server: express.Application

    public constructor() {
        this.server = express()
        this.middlewares()
        this.database()
        this.routes()
    }

    private middlewares() {
        this.server.use(express.json())
        this.server.use(cors())
    }

    private routes() {
        this.server.use(routes)
    }

    private database() {
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user')
    }
}

export default new App().server