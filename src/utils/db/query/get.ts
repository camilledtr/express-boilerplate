import { Database } from "sqlite3"
import { z } from "zod"

const getFromDb = async <T>(
  query: string,
  db: Database,
  params: Array<string | number | boolean | Date | null> = [],
  schema: z.ZodType<T>
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (error, rows) => {
      if (error) {
        return reject({ error })
      }
      const validation = schema.array().safeParse(rows)
      if (!validation.success) {
        console.error(rows)
        return reject({
          error: validation.error.errors
            .map((err) => {
              const fieldPath = err.path.join(".")
              return `${fieldPath}: ${err.message}`
            })
            .join(", "),
        })
      }
      resolve(validation.data)
    })
  })
}

async function getOneFromDb<T>(
  query: string,
  db: Database,
  params: Array<string | number | boolean | Date | null> = [],
  schema: z.ZodType<T>
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(query, params, (error, row) => {
      if (error) {
        return reject({ error })
      }
      if (!row) {
        return resolve(undefined)
      }

      const validation = schema.safeParse(row)
      if (!validation.success) {
        return reject({
          error: validation.error.errors
            .map((err) => {
              const fieldPath = err.path.join(".")
              return `${fieldPath}: ${err.message}`
            })
            .join(", "),
        })
      }

      resolve(validation.data)
    })
  })
}

export { getFromDb, getOneFromDb }
