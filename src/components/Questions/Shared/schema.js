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
