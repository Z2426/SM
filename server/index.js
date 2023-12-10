import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import dbConnection from "./dbConfig/index.js"
import router from './routes/index.js'
import path from "path"
//securty packges
import helmet from "helmet"
const __dirname = path.resolve(path.dirname(""))
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8800
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "views")))
console.log(process.env.AUTHE_PASSWORD)
//error middleware
app.use(router)
//app.use(errorMiddleware)
dbConnection()
app.listen(PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})