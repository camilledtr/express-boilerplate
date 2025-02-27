import { Express } from "express"
import { Database } from "sqlite3"

import logoutRoute from "./logout/logout"

const authRoutes = (app: Express, db: Database) => {
  logoutRoute(app)
}

export default authRoutes
