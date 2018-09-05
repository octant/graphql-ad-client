import React from "react";
import { toast } from "react-toastify";

import Form from "./New";

class NewUser extends React.Component {
  handleSubmit = state => {
    console.log(state);
    toast.success("Your information has been saved!");
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>New User</h3>
        <div style={{ width: "26em" }}>
          <Form submit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default NewUser;
