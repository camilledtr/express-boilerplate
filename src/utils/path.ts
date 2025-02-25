import * as path from "path"

export const getCurrentDir = () => {
  if (import.meta.url) {
    return path.dirname(new URL(import.meta.url).pathname)
  }
  return __dirname
}
