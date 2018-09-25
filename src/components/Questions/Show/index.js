import React from "react";
import { graphql } from "react-apollo";

import { QUESTION } from "../queries";
import Show from "./Show";

const ShowQuestion = ({ data: { error, loading, question } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <Show key={question.id} question={question} />;
};

const WithQuestion = graphql(QUESTION, {
  options: props => ({
    variables: { id: props.match.params.id },
    fetchPolicy: "cache-and-network"
  })
});

export default WithQuestion(ShowQuestion);
