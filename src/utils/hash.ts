import bcrypt from "bcrypt"

export const hash = async (clear: string): Promise<string> => {
  const saltRounds = 10

  const hashed = await new Promise(
    (resolve: (value: string) => void, reject) => {
      bcrypt.hash(clear, saltRounds, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      })
    }
  )

  return hashed
}

export const compareHash = async (clear: string, hashed: string) => {
  const result = await bcrypt.compare(clear, hashed)

  return result
}
