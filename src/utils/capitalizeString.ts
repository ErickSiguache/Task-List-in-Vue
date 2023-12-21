export default function capitalizeString(textToCapitalize: string): string {
  return textToCapitalize
    .split(' ')
    .map((word) => {
      const takeTheFirstLetter = word.slice(0, 1)
      const capitalizeFirstLetter = takeTheFirstLetter.toUpperCase()
      const replaceLetterToUpper = word.replace(takeTheFirstLetter, capitalizeFirstLetter)
      return replaceLetterToUpper
    })
    .join(' ')
}
