export const parseUTCDate = (date: string): Date => {
  const [datePart, timePart] = date.split(" ")
  const [year, month, day] = datePart.split("-").map(Number)
  const [hour, minute, second] = timePart.split(":").map(Number)

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second || 0))
}

export const formatUTCDate = (date: Date): string => {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")
  const hour = String(date.getUTCHours()).padStart(2, "0")
  const minute = String(date.getUTCMinutes()).padStart(2, "0")
  const second = String(date.getUTCSeconds()).padStart(2, "0")

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
