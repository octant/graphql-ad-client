import React from "react";
import { FormGroup, Input } from "reactstrap";
import { graphql, compose, withApollo } from "react-apollo";

import { ALL_AD_USERS, SELECT_USER } from "../queries";

class Users extends React.Component {
  handleSelect = e => {
    const username = e.target.value;
    this.props
      .selectUser(username)
      .then(() => this.props.history.push(`/users/${username}`));
  };

  render() {
    return (
      <FormGroup>
        <Input onChange={this.handleSelect} name="users" type="select">
          <option>
            {this.props.data.loading ? "loading..." : "Select a user"}
          </option>
          {(this.props.data.loading ? [] : this.props.data.users).map(
            (option, i) => (
              <option key={i} value={option.sAMAccountName}>
                {option.displayName}
              </option>
            )
          )}
        </Input>
      </FormGroup>
    );
  }
}

const SelectUser = graphql(SELECT_USER, {
  props: ({ mutate }) => ({
    selectUser: username =>
      mutate({
        variables: { username }
      })
  })
});

export default compose(
  SelectUser,
  withApollo,
  graphql(ALL_AD_USERS)
)(Users);
