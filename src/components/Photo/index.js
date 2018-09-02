import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Col, Row } from "reactstrap";
import EXIF from "exif-js";

import {
  clearCanvas,
  downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from "./utils";
import Cropper from "./Cropper";
import Original from "./Original";
import PlaceHolder from "./PlaceHolder";
import Preview from "./Preview";

const defaultProps = {
  selected: false,
  file: null,
  cropping: false,
  base64URL: null,
  error: null,
  crop: {
    maxHeight: 96,
    maxWidth: 96,
    aspect: 1 / 1
  },
  fileDimensions: {}
};

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.preview = React.createRef();
    this.original = React.createRef();
    this.state = { ...defaultProps };
  }

  handleCrop = crop => {
    this.setState({ crop });
  };

  handleCropCancel = () => {
    clearCanvas([this.preview]);
    this.setState({
      base64URL: null,
      cropping: false,
      crop: { ...defaultProps.crop }
    });
  };

  handleCropComplete = (crop, pixelCrop) => {
    this.setState({
      preview: image64toCanvasRef(
        this.preview.current,
        this.state.base64URL,
        pixelCrop
      )
    });
  };

  handleCropStart = () => {
    const canvas = this.original.current;
    this.setState({
      base64URL: canvas.toDataURL(this.state.file.type),
      cropping: true
    });
  };

  handleErrorDismiss = () => {
    this.setState(() => ({ error: null }));
  };

  handleFileSelect = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.reduce((total, file) => {
        console.log(total);
        return total + file.name;
      });
      this.setState(() => ({
        error:
          "The following files were rejected: " +
          rejectedFiles.map(file => file.name).join(", ")
      }));
      return;
    }

    const self = this;
    const file = acceptedFiles[0];
    const image = new Image();
    const canvas = this.original.current;
    const ctx = canvas.getContext("2d");

    EXIF.getData(file, function() {
      const orient = {
        1: 0,
        3: 180,
        8: -90,
        6: 90
      };

      const degrees = orient[EXIF.getTag(this, "Orientation")];

      image.onload = function() {
        if (degrees === -90 || degrees === 90) {
          canvas.height = this.width;
          canvas.width = this.height;
        } else {
          canvas.height = this.height;
          canvas.width = this.width;
        }

        ctx.drawImage(image, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((degrees * Math.PI) / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
        ctx.save();

        self.setState(() => ({
          fileDimensions: { height: canvas.height, width: canvas.width }
        }));
      };

      self.setState(
        () => ({ ...defaultProps, file, selected: true, error: null }),
        () => (image.src = URL.createObjectURL(file))
      );
    });
  };

  handleSave = () => {
    const fileExtension = extractImageFileExtensionFromBase64(
      this.state.base64URL
    );
    const imageData64 = this.preview.current.toDataURL(this.state.file.type);

    downloadBase64File(imageData64, `cropped.${fileExtension}`);
    setTimeout(this.reset, 1000);
  };

  reset = () => {
    clearCanvas([this.original, this.preview]);
    this.setState({ ...defaultProps });
  };

  methods() {
    return {
      crop: this.handleCrop,
      cropCancel: this.handleCropCancel,
      cropComplete: this.handleCropComplete,
      cropStart: this.handleCropStart,
      dismiss: this.handleErrorDismiss,
      imageLoaded: this.handleImageLoaded,
      reset: this.reset,
      save: this.handleSave,
      select: this.handleFileSelect
    };
  }

  render() {
    return (
      <Row>
        <Col>
          <PlaceHolder
            methods={this.methods()}
            selected={this.state.selected}
            error={this.state.error}
          />
          <Original
            selected={this.state.selected}
            cropping={this.state.cropping}
            ref={this.original}
          />
          <Cropper
            base64URL={this.state.base64URL}
            crop={this.state.crop}
            cropping={this.state.cropping}
            height={this.state.fileDimensions.height}
            methods={this.methods()}
            selected={this.state.selected}
            width={this.state.fileDimensions.width}
          />
        </Col>
        <Col>
          <Preview ref={this.preview} cropping={this.state.cropping} />
        </Col>
      </Row>
    );
  }
}

export default Photo;
