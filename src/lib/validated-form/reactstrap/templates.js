import React from "react";
import { FormFeedback, FormGroup, Label, Input } from "reactstrap";

class ReactStrapTemplates extends React.Component {
  checkbox() {
    return (
      <FormGroup check>
        <Label check>
          <Input invalid={this.invalid(this.props.error)} {...this.props} />
          {this.props.label}
          {this.props.required ? "*" : ""}
          <FormFeedback>{this.props.error}</FormFeedback>
        </Label>
      </FormGroup>
    );
  }

  radio() {
    const { options, label } = this.props;
    return (
      <FormGroup tag="fieldset">
        <legend>
          {label}
          {this.props.required ? "*" : ""}
        </legend>
        <FormFeedback>{this.props.error}</FormFeedback>
        {options.map(({ text, ...option }) => {
          return (
            <FormGroup key={option.id} check>
              <Label>
                <Input invalid={this.invalid(this.props.error)} {...option} />{" "}
                {text}
              </Label>
            </FormGroup>
          );
        })}
      </FormGroup>
    );
  }

  select() {
    return (
      <FormGroup>
        <Label for={this.props.name}>
          {this.props.label}
          {this.props.required ? "*" : ""}
        </Label>
        <Input invalid={this.invalid(this.props.error)} {...this.props}>
          {this.props.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.text}
            </option>
          ))}
        </Input>
        <FormFeedback>{this.props.error}</FormFeedback>
      </FormGroup>
    );
  }

  text() {
    return (
      <FormGroup>
        <Label for={this.props.name}>
          {this.props.label}
          {this.props.required ? "*" : ""}
        </Label>
        <Input invalid={this.invalid(this.props.error)} {...this.props} />
        <FormFeedback>{this.props.error}</FormFeedback>
      </FormGroup>
    );
  }

  invalid(error) {
    return error !== undefined && error !== "*";
  }

  field() {
    const type = this.props.type;

    switch (type) {
      case "checkbox":
        return this.checkbox();
      case "radio":
        return this.radio();
      case "select":
        return this.select();
      default:
        return this.text();
    }
  }

  render() {
    return this.field();
  }
}

export default ReactStrapTemplates;
