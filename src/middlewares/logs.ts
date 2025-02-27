import { Request, Response, NextFunction } from "express"
import * as fs from "fs"
import * as path from "path"

import { getCurrentDir } from "../utils/path"

export function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const ip = req.headers["x-forwarded-for"]
    ? (req.headers["x-forwarded-for"] as string).split(",")[0].trim()
    : req.ip

  const logMessage = `${new Date().toLocaleString("fr-FR", { timeZoneName: "short" })}, ${req.method}, ${req.originalUrl}, IP: ${ip}\n`
  const logFilePath = path.join(getCurrentDir(), "../../routing.log")

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error while storing the request log", err)
    }
  })

  next()
}
