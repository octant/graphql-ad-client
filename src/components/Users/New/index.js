import React from "react";
import { toast } from "react-toastify";
import { graphql, compose } from "react-apollo";

import { ALL_AD_USERS, CREATE_USER } from "../queries";
import Form from "./New";

class NewUser extends React.Component {
  handleSubmit = state => {
    this.props
      .submit(state)
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
        <h3>New User</h3>
        <div style={{ width: "26em" }}>
          <Form
            users={users}
            values={{
              employeeID: "19281",
              givenName: "Michael",
              sN: "Wood",
              title: "Sr. Developer",
              description: "Microage I.T.",
              department: "IT",
              manager: "matt_dunlop",
              physicalDeliveryOfficeName: "294 Willow Avenue"
            }}
            submit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

const NewUserMutation = graphql(CREATE_USER, {
  props: ({ mutate }) => ({
    submit: user =>
      mutate({
        variables: { user }
      })
  })
});

export default compose(
  graphql(ALL_AD_USERS),
  NewUserMutation
)(NewUser);
