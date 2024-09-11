import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import dbConnection from "./dbConfig/index.js"
import router from './routes/index.js'
import path from "path"
import swaggerUi from 'swagger-ui-express'
import fs from "fs"
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
// Đọc file swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, './swagger/dist/swagger.json'), 'utf8'));
// Cấu hình Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router)
dbConnection()
app.listen(PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
    console.log(`Swagger UI available at http://localhost:${process.env.PORT}/api-docs`);
})