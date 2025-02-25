import dotenv from "dotenv"

dotenv.config()

export const DB_PATH = process.env.DB_PATH || "database.sqlite"
export const DB_TEST_PATH = process.env.DB_TEST_PATH || "test.sqlite"
