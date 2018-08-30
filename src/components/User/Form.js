import React from "react";

import myInformation from "./form-definitions/user";
import Form from "../../lib/validated-form";
import Layout from "../../lib/validated-form/reactstrap";

const UserForm = ({ values, submit }) => {
  return (
    <div>
      <Form
        definition={myInformation}
        layout={Layout}
        onSubmit={submit}
        values={{ ...values }}
      />
    </div>
  );
};

export default UserForm;
