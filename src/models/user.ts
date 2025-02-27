import { z } from "zod"

import { parseUTCDate } from "../utils/db/date"

export const UserRawDbSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type UserRawDb = z.infer<typeof UserRawDbSchema>

export const UserDbSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserDb = z.infer<typeof UserDbSchema>

export const parseUserDb = (user: UserRawDb): UserDb => ({
  ...user,
  createdAt: parseUTCDate(user.createdAt),
  updatedAt: parseUTCDate(user.updatedAt),
})
