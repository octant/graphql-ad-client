import React from "react";

import { Field } from "react-validated-frm";
import { Button, ButtonGroup, Form } from "reactstrap";
import templates from "./templates";

const Layout = ({ buttons, errors, fields, isValid, validatedMethods }) => {
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
      {buttons ? (
        <ButtonGroup>
          {Object.keys(buttons || []).map(button =>
            buttonList[button](buttons[button], validatedMethods, isValid)
          )}
        </ButtonGroup>
      ) : (
        ""
      )}
    </Form>
  );
};

const buttonList = {
  submit: (text, validatedMethods, isValid) => {
    return (
      <Button
        key="submit"
        color={"primary"}
        disabled={!isValid}
        onClick={validatedMethods.submit}
      >
        {text}
      </Button>
    );
  },
  reset: (text, validatedMethods) => (
    <Button key="reset" onClick={validatedMethods.reset}>
      {text}
    </Button>
  )
};

export default Layout;
