import React from "react";
import { graphql, compose } from "react-apollo";
import { toast } from "react-toastify";

import { USER_INFORMATION, UPDATE_AD_INFORMATION } from "../queries";
import Form from "./Edit";
import Photo from "../../Photo";

class EditUser extends React.Component {
  handleSubmit = state => {
    const {
      data: { directoryEntry }
    } = this.props;
    this.props
      .submit(directoryEntry.sAMAccountName, state)
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
      data: { error, loading, directoryEntry }
    } = this.props;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <div key={directoryEntry.sAMAccountName}>
        <h2>{directoryEntry.displayName}</h2>
        <div>
          <Photo />
          <hr />
        </div>
        <div style={{ width: "26em" }}>
          <Form values={{ ...directoryEntry }} submit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

const WithDirectoryEntry = graphql(USER_INFORMATION, {
  options: props => ({
    variables: { username: props.match.params.username },
    fetchPolicy: "cache-and-network"
  })
});

const UserInfoWithMutation = graphql(UPDATE_AD_INFORMATION, {
  props: ({ mutate }) => ({
    submit: (id, user) =>
      mutate({
        variables: { id, user },
        refetchQueries: ["userInformation"]
      })
  })
});

export default compose(
  WithDirectoryEntry,
  UserInfoWithMutation
)(EditUser);
