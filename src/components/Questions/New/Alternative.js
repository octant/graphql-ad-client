import React from "react";
import { FormWrapper } from "react-validated-frm";

import * as Forms from "./schema";
import Layout from "../../FormTemplates/reactstrap";

const Alternative = React.forwardRef((props, ref) => {
  const { methods, values } = props;
  return (
    <FormWrapper
      ref={ref}
      definition={Forms["a"]}
      layout={Layout}
      onChange={methods.change}
      onInit={methods.init}
      onSubmit={methods.submit}
      values={values}
    />
  );
});

export default Alternative;
