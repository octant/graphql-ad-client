import React from "react";

import Schema from "./schema";
import ValidatedForm from "./validated-form";

const FormWrapper = ({ buttons, definition, layout, onSubmit, values }) => {
  return (
    <ValidatedForm
      buttons={buttons}
      onSubmit={onSubmit}
      schema={new Schema(definition)}
      values={values}
    >
      {layout}
    </ValidatedForm>
  );
};

export default FormWrapper;
