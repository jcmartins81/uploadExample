import express from 'express'
import routes from './routes.js'
import morgan from 'morgan'
import mongoose from "mongoose";
import path from 'path'
import dotenv from "dotenv"
const __dirname = path.resolve()

dotenv.config()

/**
 *
 * Database setup
 */

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true
  }
)
  .then(r => console.log("Conectado ao DB!"))
  .catch(reason => console.log("Não foi possível conectar no DB!"))



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use("/files", express.static(path.resolve(__dirname, "temp", "uploads")))

app.use(routes)

app.listen(3000)