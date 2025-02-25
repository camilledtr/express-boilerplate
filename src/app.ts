import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

import { requestLoggerMiddleware } from "./middlewares/logs"
import { errorHandlerMiddleware } from "./middlewares/error"
import { NotFoundError } from "./types/error"
import { initializeDb } from "./config/db"
import { DB_PATH, DB_TEST_PATH } from "./constants/db"
import { isTest } from "./constants/env"

dotenv.config()

const app = express()

app.use(express.json({ limit: "50mb" })) // for parsing application/json
app.use(express.urlencoded({ extended: true, limit: "50mb" })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || false,
    optionsSuccessStatus: 200,
  })
)

// Database connection
const db = initializeDb(isTest ? DB_TEST_PATH : DB_PATH)

// Middlewares
app.use(requestLoggerMiddleware)

// Routes
app.get("/", (req, res) => {
  res.send("Server is running")
})

app.use((req, res, next) => {
  next(new NotFoundError("Resource not found", "NOT_FOUND"))
})

app.use(errorHandlerMiddleware)

export default app
