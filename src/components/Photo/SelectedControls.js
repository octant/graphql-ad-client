import React from "react";
import ReactCrop from "react-image-crop";
import { Button } from "reactstrap";

const SelectedControls = ({ cropping, methods, selected }) => (
  <div style={{ display: !cropping && selected ? "block" : "none" }}>
    <Button color="success" onClick={methods.cropStart}>
      Crop
    </Button>{" "}
    <Button color="default" onClick={methods.reset}>
      Discard
    </Button>
  </div>
);

export default SelectedControls;
