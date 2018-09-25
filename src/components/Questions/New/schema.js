import { characterAtIndex } from "../lib/range";

const buildMultipleChoice = () => {
  const result = [];
  for (let index = 0; index < 4; index++) {
    result.push({ value: characterAtIndex(index) });
  }
  return result;
};

export const defaultAlternatives = {
  mc: buildMultipleChoice(),
  yn: [
    { value: "no", text: "No", type: "na" },
    { value: "yes", text: "Yes", type: "na" }
  ],
  rh: [
    { value: "no", text: "<-", type: "na" },
    { value: "yes", text: "->", type: "na" }
  ],
  tf: [{ value: "false", text: "False" }, { value: "true", text: "True" }]
};
