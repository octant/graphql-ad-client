import React from "react";

import Form from "../../lib/validated-form";
import Layout from "../../lib/validated-form/reactstrap";
import myInformation from "../../forms/my-information";

const UserInfo = ({ values, submit }) => {
  console.log(values);
  return (
    <div style={{ width: "26em" }}>
      <Form
        definition={myInformation}
        layout={Layout}
        onSubmit={submit}
        values={{ ...values }}
      />
    </div>
  );
};

export default UserInfo;
