import React from "react";
import "react-table/react-table.css";
import { graphql } from "react-apollo";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import { ALL_AD_USERS } from "../queries";
import List from "./List";

class ListUsers extends React.Component {
  render() {
    const {
      data: { error, loading, users }
    } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <div>
        <Button tag={Link} to="/users/new/">
          New
        </Button>
        <hr />
        <List users={users} />
      </div>
    );
  }
}

export default graphql(ALL_AD_USERS)(ListUsers);
