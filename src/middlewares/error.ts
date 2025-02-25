import { Request, Response, NextFunction } from "express"
import * as fs from "fs"
import * as path from "path"

import { HttpErrorType } from "../types/error"
import { getCurrentDir } from "../utils/path"
import { isProduction, isTest } from "../constants/env"

export const errorHandlerMiddleware = (
  err: HttpErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: change to user when several users
  const ip = req.headers["x-forwarded-for"]
    ? (req.headers["x-forwarded-for"] as string).split(",")[0].trim()
    : req.ip

  const logMessage = `\n${new Date().toLocaleString("fr-FR", { timeZoneName: "short" })}, ${req.method}, ${req.originalUrl}, IP: ${ip}, ${err.status || 500}${err.code ? ` (${err.code})` : ""}${`: ${err.message || "Something went wrong"}`} - ${err.stack || "No stack"}\n`
  const logFilePath = path.join(getCurrentDir(), "../../error.log")

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error while storing the error log", err)
    }
  })

  if (!isTest) {
    if (!isProduction) {
      console.error(logMessage, "\n")
    } else {
      console.error(
        `${err.message} (Error ${err.status || 500}${err.code ? ` - ${err.code}` : ""})`
      )
    }
  }

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
    code: err.code || "UNKNOWN_ERROR",
  })

  next()
}
