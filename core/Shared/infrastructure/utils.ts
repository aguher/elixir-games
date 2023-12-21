export const includeWord = (str:string, words:string[]) => {
  if (words.length === 1) {
    return str.includes(words[0])
  } else {
    return words.some(word => str.includes(word))
  }
}
