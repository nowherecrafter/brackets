module.exports = function check(str, bracketsConfig) {
  const stackOpen = [];

  const allBrackets = new Set();
  const closingBrackets = new Set();
  const bracketDictionary = new Map();
  
  for (const [open, close] of bracketsConfig) {
    bracketDictionary.set(open, close);
    closingBrackets.add(close);
    allBrackets.add(open).add(close);
  }

  for (const char of str) {
    if (!allBrackets.has(char)) continue;

    if (bracketDictionary.has(char)) {
      const closingBracket = bracketDictionary.get(char);

      if (closingBracket === char) {
        if (stackOpen.length > 0 && stackOpen[stackOpen.length - 1] === char) {
          stackOpen.pop();
        }
      } else {
        stackOpen.push(char);
      }
    }

    else if (closingBrackets.has(char)) {
      if (stackOpen.length === 0) return false;
      const lastOpen = stackpop();
      if (bracketDictionary.get(lastOpen) !== char) return false;

    }
  }

  return stackOpen.length === 0;
}
