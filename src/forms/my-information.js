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
    min: 3
  },

  department: {
    type: "text",
    label: "Department",
    required: true,
    min: 2,
    pattern: /^[A-Z]/
  },

  telephoneNumber: {
    type: "text",
    label: "Extension",
    required: true,
    min: 4,
    pattern: /\d{4}/,
    message: "Enter a 4 digit extension"
  }
};

export default schema;
