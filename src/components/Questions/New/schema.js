import { characterAtIndex } from "../../../lib/utils/range";

export const question = {
  stem: {
    type: "textarea",
    label: "Question",
    required: true
  },
  topic: {
    type: "text",
    label: "Topic",
    required: true
  }
};

export const answer = {
  text: {
    type: "textarea",
    label: "Text",
    required: true
  },
  type: {
    type: "select",
    label: "Type",
    required: true,
    options: [
      { value: "", text: "" },
      { value: "answer", text: "Answer" },
      { value: "distractor", text: "Distractor" },
      { value: "na", text: "Not applicable" }
    ]
  }
};

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
