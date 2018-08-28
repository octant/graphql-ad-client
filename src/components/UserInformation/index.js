import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import Form from "./Form";

class UserData extends React.Component {
  handleSubmit = state => {
    const {
      data: { my },
      notify
    } = this.props;

    this.props
      .submit(my.sAMAccountName, state)
      .then(result => {
        notify.success("Updated succeeded", {
          position: notify.POSITION.TOP_RIGHT
        });
      })
      .catch(error => {
        notify.error("Update failed", {
          position: notify.POSITION.TOP_RIGHT
        });
      });
  };

  render() {
    const {
      data: { error, loading, my }
    } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <div>
        <Form values={{ ...my }} submit={this.handleSubmit} />
      </div>
    );
  }
}

const userInfoQuery = gql`
  query myInformation {
    my {
      sAMAccountName
      title
      displayName
      givenName
      sN
      department
      telephoneNumber
    }
  }
`;

const userInfoMutation = gql`
  mutation UpdateUser($id: String!, $user: ADUserInput!) {
    updateUser(id: $id, user: $user) {
      sAMAccountName
      title
      displayName
      givenName
      sN
      department
      telephoneNumber
    }
  }
`;

const UserInfoWithData = graphql(userInfoQuery);
const UserInfoWithMutation = graphql(userInfoMutation, {
  props: ({ mutate }) => ({
    submit: (id, user) =>
      mutate({
        variables: { id, user }
      })
  })
});

export default compose(
  UserInfoWithData,
  UserInfoWithMutation
)(UserData);
