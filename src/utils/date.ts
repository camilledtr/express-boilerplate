export const isDate = (date: string): boolean => {
  return !isNaN(new Date(date).getTime())
}
