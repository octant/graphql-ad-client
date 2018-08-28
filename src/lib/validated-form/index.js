import React from "react";

import Schema from "./schema";
import ValidatedForm from "./validated-form";
import "react-toastify/dist/ReactToastify.css";

const FormWrapper = ({ definition, layout, onSubmit, values }) => {
  return (
    <ValidatedForm
      onSubmit={onSubmit}
      schema={new Schema(definition)}
      values={values}
    >
      {layout}
    </ValidatedForm>
  );
};

export default FormWrapper;
