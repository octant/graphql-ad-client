const schema = {
  displayName: {
    type: "text",
    label: "Display Name",
    required: true,
    min: 3,
    pattern: /^[A-Z]/
  },

  givenName: {
    type: "text",
    label: "First Name",
    required: true,
    min: 3,
    pattern: /^[A-Z]/
  },

  sN: {
    type: "text",
    label: "Last Name",
    required: true,
    min: 3,
    pattern: /^[A-Z]/
  },

  title: {
    type: "text",
    label: "Title",
    required: true,
    min: 3,
    pattern: /^[A-Z]/
  },

  department: {
    type: "text",
    label: "Department",
    required: true,
    min: 2,
    pattern: /^[A-Z]/
  },

  physicalDeliveryOfficeName: {
    type: "select",
    label: "Office",
    options: [
      { value: "294 Willow Avenue", text: "294 Willow Avenue" },
      { value: "Blind River", text: "Blind River" },
      { value: "Elliot Lake", text: "Elliot Lake" },
      { value: "Wawa", text: "Wawa" }
    ]
  },

  telephoneNumber: {
    type: "text",
    label: "Extension",
    required: true,
    pattern: /^\d{4}$/,
    message: "Enter a 4 digit extension"
  }
};

export default schema;
