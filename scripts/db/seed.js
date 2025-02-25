import sqlite3 from "sqlite3"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

import fakeData from "./faker/data.js"

dotenv.config()

const db = new sqlite3.Database(process.env.DB_PATH || "database.sqlite")
const dbTest = new sqlite3.Database(process.env.DB_TEST_PATH || "test.sqlite")

const {
  users,
} = fakeData

const runDbQuery = async (query, db, params = []) => {
  return new Promise(function (resolve, reject) {
    try {
      db.run(query, params, function (error) {
        if (error) reject({ error })
        else resolve({ status: "OK", id: this.lastID })
      })
    } catch (error) {
      console.error(error)
      reject({ error })
    }
  })
}

const seedDatabase = async (db, dbName) => {
  // --------------- CREATE USER -----------------

  for (const user of users) {
    try {
      await runDbQuery(
        `INSERT INTO user ('id', 'email', 'first_name', 'last_name', 'password')
        VALUES (?, ?, ?, ?, ?)`,
        db,
        [user.id, user.email, user.firstName, user.lastName, user.password]
      )
    } catch (error) {
      console.error(`Error during the insertion of the ${user.id} user:`, error)
      return
    }
  }

  // ...

  console.log(`${dbName} database seeded with the default data!`)
}

export const hash = async (clear) => {
  const saltRounds = 10

  const hashed = await new Promise((resolve, reject) => {
    bcrypt.hash(clear, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })

  return hashed
}

seedDatabase(db, "REAL").then(async () => {
  await seedDatabase(dbTest, "TEST")
})
