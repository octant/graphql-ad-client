import React from "react";

class ValidatedForm extends React.Component {
  constructor(props) {
    super(props);

    const validProps = {};
    const passedValues = this.props.values || {};
    for (const key in props.schema.schemaDefinition) {
      if (passedValues.hasOwnProperty(key)) {
        validProps[key] = props.values[key] === null ? "" : props.values[key];
      }
    }

    this.state = { ...props.schema.defaultValues(), ...validProps };
  }

  change = (name, value) => {
    this.setState(() => ({ [name]: value }));
  };

  reset = () => {
    this.setState(() => this.props.schema.defaultValues());
  };

  submit = () => {
    this.props.onSubmit({ ...this.state });
  };

  fields() {
    const { schemaDefinition } = this.props.schema;
    const fields = {};

    Object.keys(schemaDefinition).forEach(name => {
      const field = {
        definition: schemaDefinition[name],
        methods: {
          change: this.change
        },
        name,
        value: this.state[name]
      };
      fields[name] = field;
    });

    return fields;
  }

  render() {
    return this.props.children({
      customTemplates: this.props.customTemplates,
      fields: this.fields(),
      values: { ...this.state },
      errors: this.props.schema.validate(this.state),
      isValid: this.props.schema.isValid(this.state),
      methods: { change: this.change, reset: this.reset, submit: this.submit }
    });
  }
}

export default ValidatedForm;
