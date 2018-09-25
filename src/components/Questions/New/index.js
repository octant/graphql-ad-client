import React from "react";
import { toast } from "react-toastify";
import { graphql } from "react-apollo";

import { CREATE_QUESTION } from "../queries";
import Choose from "./Choose";

class NewQuestion extends React.Component {
  handleSubmit = state => {
    this.props
      .submit(state)
      .then(() => {
        toast.success("Your question has been saved!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
      .catch(() => {
        toast.error("Failed to save your question!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  };

  render() {
    return (
      <div>
        <h3>New Question</h3>
        <div style={{ width: "26em" }}>
          <Choose submit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default graphql(CREATE_QUESTION, {
  props: ({ mutate }) => ({
    submit: question =>
      mutate({
        variables: { question },
        refetchQueries: ["getQuestions"]
      })
  })
})(NewQuestion);
