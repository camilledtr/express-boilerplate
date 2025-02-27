import { Express } from "express"

import { clearCookies } from "../../../utils/cookies"

const logoutRoute = (app: Express) => {
  app.post("/logout", async (req, res, next) => {
    try {
      clearCookies(res)
      res.status(200).send({ success: true })
    } catch (error) {
      next(error)
    }
  })
}

export default logoutRoute
