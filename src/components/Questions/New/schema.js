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
  yn: [{ value: "no", text: "No" }, { value: "yes", text: "Yes" }],
  rh: [{ value: "false", text: "<-" }, { value: "true", text: "->" }],
  tf: [{ value: "false", text: "False" }, { value: "true", text: "True" }]
};
