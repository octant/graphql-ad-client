import React from "react";
import { FormWrapper } from "react-validated-frm";

import * as Forms from "./schema";
import Layout from "../../FormTemplates/reactstrap";

const Stem = React.forwardRef((props, ref) => {
  const { methods, values } = props;
  return (
    <FormWrapper
      ref={ref}
      definition={Forms["q"]}
      layout={Layout}
      values={values}
      onChange={methods.change}
      onInit={methods.init}
      onSubmit={methods.submit}
    />
  );
});

export default Stem;
