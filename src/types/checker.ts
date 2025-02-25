import { z } from "zod"

import { AppError } from "./error"

export const checkType = <T>(
  input: Record<string, string | undefined>,
  schema: z.ZodType<T>
): { data: T } | AppError => {
  const result = schema.safeParse(input)
  if (result.success) {
    return { data: result.data }
  } else {
    const errorMessage = result.error.errors
      .map((err) => {
        const fieldPath = err.path.join(".")
        return `${fieldPath}: ${err.message}`
      })
      .join(", ")
    return { error: errorMessage }
  }
}
