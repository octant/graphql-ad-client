import React from "react";

import Form from "../../lib/validated-form";
import Layout from "../../lib/validated-form/reactstrap";
import myInformation from "../../forms/my-information";

const UserInfo = ({ values, submit }) => {
  return (
    <Form
      definition={myInformation}
      layout={Layout}
      onSubmit={submit}
      values={{ ...values }}
    />
  );
};

export default UserInfo;
