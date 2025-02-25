import jwt from "jsonwebtoken"

type TokenPayload = {
  email: string
  username: string
}

export const signToken = (payload: TokenPayload, privateKey: string) => {
  try {
    const result = jwt.sign(payload, privateKey)

    return result
  } catch (err) {
    console.error("Error at signToken: ")
    console.error(err)
    return null
  }
}
