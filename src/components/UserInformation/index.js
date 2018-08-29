import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import Form from "./Form";

class UserData extends React.Component {
  handleSubmit = state => {
    const {
      data: { my }
    } = this.props;

    this.props
      .submit(my.sAMAccountName, state)
      .then(result => {
        toast.success("Your information has been saved!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
      .catch(error => {
        toast.error("Failed to save your information!", {
          position: toast.POSITION.BOTTOM_RIGHT
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
      physicalDeliveryOfficeName
    }
  }
`;

const userInfoMutation = gql`
  mutation UpdateADUser($id: String!, $user: ADUserInput!) {
    updateADUser(id: $id, user: $user) {
      sAMAccountName
    }
  }
`;

const UserInfoWithData = graphql(userInfoQuery);
const UserInfoWithMutation = graphql(userInfoMutation, {
  props: ({ mutate }) => ({
    submit: (id, user) =>
      mutate({
        variables: { id, user },
        refetchQueries: ["myInformation"]
      })
  })
});

export default compose(
  UserInfoWithData,
  UserInfoWithMutation
)(UserData);
