import dotenv from "dotenv"

dotenv.config()

export const isProduction = process.env.NODE_ENV === "production"
export const isTest = process.env.NODE_ENV === "test"
export const isHttps = process.env.HTTPS !== "false"
