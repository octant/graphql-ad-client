import React from "react";
import "react-table/react-table.css";
import { graphql } from "react-apollo";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import { QUESTIONS } from "../queries";
import List from "./List";

class ListQuestions extends React.Component {
  render() {
    const {
      data: { error, loading, questions }
    } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <div>
        <Button tag={Link} to="/questions/new/">
          New
        </Button>
        <hr />
        <List questions={questions} />
      </div>
    );
  }
}

export default graphql(QUESTIONS)(ListQuestions);
