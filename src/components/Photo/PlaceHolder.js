import React from "react";
import Dropzone from "react-dropzone";
import { UserIcon } from "./icons";
import { Alert } from "reactstrap";

const PlaceHolder = ({ error, methods }) => (
  <div>
    <Dropzone
      multiple={false}
      maxSize={200000}
      accept={"image/jpeg"}
      onDrop={methods.select}
    >
      <UserIcon />
    </Dropzone>
    {error ? (
      <Alert toggle={methods.dismiss} color="danger">
        {error}
      </Alert>
    ) : (
      ""
    )}
  </div>
);

export default PlaceHolder;
