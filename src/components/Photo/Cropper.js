import React from "react";
import ReactCrop from "react-image-crop";
import { Button } from "reactstrap";

const PlaceHolder = ({
  base64URL,
  crop,
  cropping,
  height,
  methods,
  selected,
  width
}) => (
  <div
    className="react-crop"
    style={{
      overflow: "auto"
    }}
  >
    <div
      className="react-crop"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: "dashed",
        borderRadius: 5,
        marginBottom: "0.25em",
        display: cropping ? "block" : "none"
      }}
    >
      <ReactCrop
        maxHeight={96}
        maxWidth={96}
        onImageLoaded={methods.imageLoaded}
        onComplete={methods.cropComplete}
        src={base64URL || ""}
        onChange={methods.crop}
        crop={crop}
      />
    </div>
    <SelectedControls
      cropping={cropping}
      methods={methods}
      selected={selected}
    />
    <CroppingControls
      methods={methods}
      cropping={cropping}
      selected={selected}
    />
  </div>
);

const CroppingControls = ({ cropping, methods, selected }) => (
  <div style={{ display: cropping && selected ? "block" : "none" }}>
    <Button color="success" onClick={methods.save}>
      Save
    </Button>{" "}
    <Button color="default" onClick={methods.cropCancel}>
      Cancel
    </Button>
  </div>
);

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

export default PlaceHolder;
