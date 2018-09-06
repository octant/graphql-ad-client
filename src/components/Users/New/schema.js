const schema = users => ({
  employeeID: {
    type: "text",
    label: "Employee ID",
    required: true,
    pattern: /^\d{5}$/
  },

  givenName: {
    type: "text",
    label: "First Name",
    required: true,
    min: 2,
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
    patter: /^[A-Z]/
  },

  description: {
    type: "text",
    label: "Description",
    required: true,
    min: 3,
    pattern: /^[A-Z]/
  },

  department: {
    type: "text",
    label: "Department",
    required: true,
    min: 2,
    pattern: /^[A-Z]/,
    message: "at least two characters starting with a capital"
  },

  manager: {
    type: "select",
    label: "Manager",
    required: true,
    options: [{}, ...optionsList(users)]
  },

  physicalDeliveryOfficeName: {
    type: "select",
    label: "Office",
    required: true,
    options: [
      {},
      { value: "294 Willow Avenue", text: "294 Willow Avenue" },
      { value: "Blind River", text: "Blind River" },
      { value: "Elliot Lake", text: "Elliot Lake" },
      { value: "Wawa", text: "Wawa" }
    ]
  },

  homeDirectoryServer: {
    type: "select",
    label: "Home Drive Server",
    required: true,
    options: [{}, { value: "ahu-serv04", text: "ahu-serv04" }]
  },

  telephoneNumber: {
    type: "text",
    label: "Extension",
    pattern: /^\d{4}$/,
    message: "enter a 4 digit extension"
  }
});

function optionsList(users) {
  return users.map(user => ({
    value: user.sAMAccountName,
    text: user.displayName
  }));
}

export default schema;
