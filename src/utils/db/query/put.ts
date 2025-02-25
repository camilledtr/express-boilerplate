import { Database } from "sqlite3"

import { AppError } from "../../../types/error"

const updateDb = async (
  query: string,
  db: Database,
  params: (string | number | boolean | Date | null)[] = []
): Promise<{ status: string } | AppError> => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error: Error | null) {
      if (error) {
        return reject({ error })
      }
      resolve({ status: "success" })
    })
  })
}

export default updateDb
