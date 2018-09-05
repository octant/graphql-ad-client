import React from "react";

import userInformation from "./schema";
import Form from "../../../lib/validated-form";
import Layout from "../../../lib/validated-form/reactstrap";

const EditForm = ({ values, submit }) => {
  return (
    <Form
      definition={userInformation}
      layout={Layout}
      onSubmit={submit}
      values={{ ...values }}
    />
  );
};

export default EditForm;
