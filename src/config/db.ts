import sqlite3, { Database } from "sqlite3"
import fs from "fs"
import path from "path"

import { isTest } from "../constants/env"

export const initializeDb = (dbPath: string): Database => {
  if (!fs.existsSync(dbPath)) {
    console.error("\nError: Database file not found at", path.resolve(dbPath))
    console.error("Make sure the database file exists before running the server.")
    process.exit(1)
  }

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("\nError opening database: ", err.message)
      process.exit(1)
    } else {
      if (!isTest) {
        console.log("Connected to the SQLite database.")
      }
    }

    db.run("PRAGMA foreign_keys = ON", (err) => {
      if (err) {
        console.error("\nFailed to enable foreign keys:", err.message)
      } else {
        if (!isTest) {
          console.log(
            "Foreign keys constraint enabled.\n-------------------------\n"
          )
        }
      }
    })
  })

  return db
}
