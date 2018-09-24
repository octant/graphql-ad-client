export const q = {
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

export const a = {
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

export const alternatives = {
  mc: [{ value: "a" }, { value: "b" }, { value: "c" }, { value: "d" }],
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
