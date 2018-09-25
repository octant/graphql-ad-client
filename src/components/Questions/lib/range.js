const characterRange = (start, stop) => {
  const result = [];
  for (
    let idx = start.charCodeAt(0), end = stop.charCodeAt(0);
    idx <= end;
    ++idx
  ) {
    result.push(String.fromCharCode(idx));
  }
  return result;
};

export const characterAtIndex = index => {
  const range = characterRange("a", "z");

  return range[index];
};
