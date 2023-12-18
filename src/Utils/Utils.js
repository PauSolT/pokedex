export function CapitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function NoEndOfLines(string) {
  return string.replaceAll(/[\n\f]/g, " ");
}

export function CapitalizeFirstLetterInSentence(string) {
  const words = string.split(" ");

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}