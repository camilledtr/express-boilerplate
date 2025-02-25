import sqlite3 from "sqlite3"
import dotenv from "dotenv"

dotenv.config()

const db = new sqlite3.Database(process.env.DB_PATH || "database.sqlite")
const dbTest = new sqlite3.Database(process.env.DB_TEST_PATH || "test.sqlite")

const initializeDatabase = async (db, dbName) => {
  const runQuery = (query) => {
    return new Promise((resolve, reject) => {
      db.run(query, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  try {
    await runQuery(`DROP TABLE IF EXISTS user`)
    // ...

    await runQuery(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT NOT NULL PRIMARY KEY,
        email TEXT NOT NULL,
        username TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // ...

    console.log(`Db schema initialized for the ${dbName} database`)
  } catch (err) {
    console.error(
      `Error initializing the ${dbName} database schema:`,
      err.message,
      "\n"
    )
    process.exit(1)
  } finally {
    db.close()
  }
}

initializeDatabase(db, "REAL").then(() => {
  initializeDatabase(dbTest, "TEST")
})
