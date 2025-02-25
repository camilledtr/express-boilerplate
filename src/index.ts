import app from "./app"

import { isTest } from "./constants/env"

app.listen(process.env.PRIVATE_PORT || 8042, () => {
  if (!isTest) {
    console.log(
      `Server is running on port ${process.env.PRIVATE_PORT || 8042}\n`
    )
  }
})
