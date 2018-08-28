import React from "react";
import PropTypes from "prop-types";

import DefaultTemplates from "./default/DefaultTemplates";

class Field extends React.Component {
  handleChange = e => {
    const { change } = this.props.methods;
    const { name, value } = e.target;
    change(name, value);
  };

  handleCheck = e => {
    const { change } = this.props.methods;
    const { name, checked } = e.target;
    change(name, checked);
  };

  checkboxProps() {
    return {
      checked: this.props.value === true,
      error: this.props.error,
      id: this.props.name,
      label: this.props.definition.label,
      name: this.props.name,
      onChange: this.handleCheck,
      required: this.props.definition.required,
      type: `checkbox`,
      value: this.props.value
    };
  }

  radioProps() {
    const { definition } = this.props;

    return {
      type: `radio`,
      label: this.props.definition.label,
      required: this.props.definition.required,
      options: definition.options.map((option, i) => {
        return {
          checked: option.value === this.props.value,
          error: this.props.error,
          id: `${this.props.name}-${i}`,
          name: this.props.name,
          onChange: this.handleChange,
          text: option.text,
          type: `radio`,
          value: option.value
        };
      })
    };
  }

  selectProps() {
    return {
      error: this.props.error,
      id: this.props.name,
      label: this.props.definition.label,
      name: this.props.name,
      onChange: this.handleChange,
      options: this.props.definition.options,
      required: this.props.definition.required,
      type: `select`,
      value: this.props.value
    };
  }

  textProps() {
    return {
      error: this.props.error,
      id: this.props.name,
      label: this.props.definition.label,
      name: this.props.name,
      onChange: this.handleChange,
      required: this.props.definition.required,
      type: this.props.definition.type,
      value: this.props.value
    };
  }

  getProps() {
    switch (this.props.definition.type) {
      case "checkbox":
        return this.checkboxProps();
      case "select":
        return this.selectProps();
      case "radio":
        return this.radioProps();
      default:
        return this.textProps();
    }
  }

  render() {
    if (typeof this.props.children === "function")
      return this.props.children(this.getProps());
    else {
      return React.createElement(
        this.props.customTemplates || DefaultTemplates,
        this.getProps()
      );
    }
  }
}

Field.propTypes = {
  definition: PropTypes.object.isRequired,
  methods: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string
  ])
};

export default Field;
