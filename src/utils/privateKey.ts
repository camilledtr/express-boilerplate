import fs from "fs"

export const getPrivateKey = () => {
  try {
    const res = fs.readFileSync(process.cwd() + "/private.key").toString()

    return res
  } catch (err) {
    console.error("Error at getPrivateKey: ")
    console.error(err)
    return null
  }
}
