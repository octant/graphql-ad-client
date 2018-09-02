import React from "react";
import Dropzone from "react-dropzone";
import { UserIcon } from "./icons";
import { Alert } from "reactstrap";

const PlaceHolder = ({ error, methods, selected }) => (
  <div style={{ display: selected ? "none" : "block" }}>
    <Dropzone
      multiple={false}
      maxSize={200000}
      accept={"image/jpeg"}
      onDrop={methods.select}
    >
      <UserIcon />
    </Dropzone>

    <div style={{ padding: "1em 0 1em 0", display: error ? "block" : "none" }}>
      <Alert toggle={methods.dismiss} color="danger">
        {error}
      </Alert>
    </div>
  </div>
);

export default PlaceHolder;
