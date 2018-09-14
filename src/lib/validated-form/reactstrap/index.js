import React from "react";

import Field from "../Field";
import { Button, Form } from "reactstrap";
import templates from "./templates";

const Layout = ({ buttons, errors, fields, isValid, methods }) => {
  return (
    <Form>
      {Object.keys(fields).map((field, index) => {
        return (
          <Field
            customTemplates={templates}
            key={index}
            error={errors[field]}
            {...fields[field]}
          />
        );
      })}
      <hr />
      <Button color={"success"} disabled={!isValid} onClick={methods.submit}>
        {buttons ? buttons.submit : "Save"}
      </Button>
    </Form>
  );
};

export default Layout;
