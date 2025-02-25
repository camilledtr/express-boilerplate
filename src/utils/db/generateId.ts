const generateId = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz"

  function getRandomLetters(count: number) {
    let result = ""
    for (let i = 0; i < count; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    return result
  }

  const part1 = getRandomLetters(4)
  const part2 = getRandomLetters(4)
  const part3 = getRandomLetters(4)
  return `${part1}-${part2}-${part3}`
}

export default generateId
