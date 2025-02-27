import { Database } from "sqlite3"

import { getOneFromDb } from "../../utils/db/query/get"
import { AppError } from "../../types/error"
import {
  parseUserDb,
  UserDb,
  UserRawDb,
  UserRawDbSchema,
} from "../../models/user"

type GetUserByEmailDbInput = { email: string } & {
  db: Database
}

export const getUserByEmailDb = async ({
  email,
  db,
}: GetUserByEmailDbInput): Promise<UserDb | undefined | AppError> => {
  try {
    const result = await getOneFromDb<UserRawDb>(
      `SELECT
        id,
        email,
        username,
        first_name AS firstName,
        last_name AS lastName,
        password,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM user
      WHERE email = ?`,
      db,
      [email],
      UserRawDbSchema
    )

    return result ? parseUserDb(result) : undefined
  } catch (error) {
    console.error("Error at getUserByEmailDb: ")
    console.error(error)
    return { error: "Something went wrong" }
  }
}
