import React from "react";
import { Input } from "reactstrap";
import Builder from "./Builder";

class ChooseQuestionType extends React.Component {
  constructor(props) {
    super(props);

    this.state = { choice: "" };
  }

  handleChoice = e => {
    this.setState({ choice: e.target.value });
  };

  questionTypes = () => [
    { value: "", text: "Select a type..." },
    { value: "mc", text: "Multiple Choice" },
    { value: "yn", text: "Yes / No" },
    { value: "rh", text: "Raise Hand" },
    { value: "tf", text: "True / False" }
  ];

  render() {
    return (
      <div>
        <Input onChange={this.handleChoice} type="select" name="choice">
          {this.questionTypes().map(q => (
            <option key={q.value} value={q.value}>
              {q.text}
            </option>
          ))}
        </Input>
        <hr />
        {this.state.choice !== "" ? (
          <Builder
            methods={{ submit: this.props.submit }}
            type={this.state.choice}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ChooseQuestionType;
