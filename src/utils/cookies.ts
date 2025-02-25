import { Response } from "express"

import { isProduction, isHttps } from "../constants/env"
import {
  CLIENT_TOKEN_COOKIE_KEY,
  CLIENT_USER_COOKIE_KEY,
  TOKEN_MAX_AGE,
} from "../constants/cookie"

export type SetCookiesInput = {
  token: string
  userMail: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: Response<any, Record<string, any>>
}

const cookieParams = {
  maxAge: TOKEN_MAX_AGE,
  path: "/",
  secure: isProduction && isHttps,
  httpOnly: true,
  sameSite: true,
}

export const setCookies = ({ token, userMail, res }: SetCookiesInput) => {
  res.cookie(CLIENT_TOKEN_COOKIE_KEY, token, cookieParams)
  res.cookie(CLIENT_USER_COOKIE_KEY, encodeURIComponent(userMail), cookieParams)
}

export const clearCookies = (res: Response) => {
  res.clearCookie(CLIENT_TOKEN_COOKIE_KEY)
  res.clearCookie(CLIENT_USER_COOKIE_KEY)
}
