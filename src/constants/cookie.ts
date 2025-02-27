import { isProduction } from "./env"

export const CLIENT_USER_COOKIE_KEY =
  process.env.CLIENT_USER_COOKIE_KEY || "user"
export const CLIENT_TOKEN_COOKIE_KEY =
  process.env.CLIENT_TOKEN_COOKIE_KEY || "token"

export const CLIENT_COOKIES = [CLIENT_USER_COOKIE_KEY, CLIENT_TOKEN_COOKIE_KEY]

// 2h in prod, 4 hours in dev
export const TOKEN_MAX_AGE = isProduction
  ? 2 * 60 * 60 * 1000
  : 4 * 60 * 60 * 1000
