import React from "react";
import { graphql, compose } from "react-apollo";
import omitDeep from "omit-deep-lodash";
import { toast } from "react-toastify";

import { EDIT_QUESTION, UPDATE_QUESTION } from "../queries";
import Edit from "../Shared/Builder";

class EditQuestion extends React.Component {
  handleSubmit = state => {
    const {
      data: { question }
    } = this.props;
    const { id, ...rest } = state;
    this.props
      .submit(question.id, rest)
      .then(() => {
        toast.success("Your information has been saved!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
      .catch(() => {
        toast.error("Failed to save your information!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  };

  render() {
    const {
      data: { error, loading, question }
    } = this.props;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <Edit
        key={question.id}
        submitType={"update"}
        id={question.id}
        question={omitDeep(question, ["__typename"])}
        submit={this.handleSubmit}
      />
    );
  }
}

const WithQuestion = graphql(EDIT_QUESTION, {
  options: props => ({
    variables: { id: props.match.params.id },
    fetchPolicy: "cache-and-network"
  })
});

const WithQuestionMutation = graphql(UPDATE_QUESTION, {
  props: ({ mutate }) => ({
    submit: (id, question) =>
      mutate({
        variables: { id, question },
        refetchQueries: ["getQuestion"]
      })
  })
});

export default compose(
  WithQuestion,
  WithQuestionMutation
)(EditQuestion);
