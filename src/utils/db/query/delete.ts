import { Database } from "sqlite3"

import { AppError } from "../../../types/error"

const deleteFromDb = (
  query: string,
  db: Database,
  params: (string | number | boolean | Date | null)[] = []
): Promise<{ status: string } | AppError> => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error: Error | null) {
      if (error) {
        return reject({ error })
      }
      if (this?.lastID == null) {
        return reject({
          error: new Error("Delete operation failed: row id is not found"),
        })
      }
      resolve({ status: "success" })
    })
  })
}

export default deleteFromDb
