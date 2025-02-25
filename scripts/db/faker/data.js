import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()

if (!process.env.DEV_EMAIL) {
  throw new Error("Missing DEV_EMAIL in .env")
}

if (!process.env.DEV_PASSWORD) {
  throw new Error("Missing DEV_PASSWORD in .env")
}

if (!process.env.DEV_FIRST_NAME) {
  throw new Error("Missing DEV_FIRST_NAME in .env")
}

if (!process.env.DEV_LAST_NAME) {
  throw new Error("Missing DEV_LAST_NAME in .env")
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

const hashedDevPassword = await hash(process.env.DEV_PASSWORD)

const users = [
  {
    id: "id-dev-user",
    email: process.env.DEV_EMAIL,
    firstName: process.env.DEV_FIRST_NAME,
    lastName: process.env.DEV_LAST_NAME,
    password: hashedDevPassword,
  },
]

// ...

export default {
  users
}
