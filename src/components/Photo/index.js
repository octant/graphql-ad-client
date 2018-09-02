import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button, Col, Row } from "reactstrap";
import EXIF from "exif-js";

import {
  clearCanvas,
  downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from "./utils";
import PlaceHolder from "./PlaceHolder";
import Preview from "./Preview";
import Original from "./Original";

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

  handleDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles, rejectedFiles);
  };

  handleErrorDismiss = () => {
    this.setState(() => ({ error: null }));
  };

  handleFileSelect = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.log(rejectedFiles);
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

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>Photo</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Original
                selected={this.state.selected}
                cropping={this.state.cropping}
                ref={this.original}
              />
              <div>
                {this.state.selected ? (
                  this.state.cropping ? (
                    <div>
                      <div
                        style={{
                          minWidth: this.state.fileDimensions.width,
                          minHeight: this.state.fileDimensions.height
                        }}
                      >
                        <ReactCrop
                          maxHeight={96}
                          maxWidth={96}
                          onImageLoaded={this.handleImageLoaded}
                          onComplete={this.handleCropComplete}
                          src={this.state.base64URL || ""}
                          onChange={this.handleCrop}
                          crop={this.state.crop}
                        />
                      </div>
                      <div>
                        <Button color="success" onClick={this.handleSave}>
                          Save
                        </Button>{" "}
                        <Button color="default" onClick={this.handleCropCancel}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Button color="success" onClick={this.handleCropStart}>
                        Crop
                      </Button>{" "}
                      <Button color="default" onClick={this.reset}>
                        Discard
                      </Button>
                    </div>
                  )
                ) : (
                  <PlaceHolder
                    methods={{
                      dismiss: this.handleErrorDismiss,
                      select: this.handleFileSelect
                    }}
                    error={this.state.error}
                  />
                )}
              </div>
            </div>
          </Col>
          <Col>
            <Preview ref={this.preview} cropping={this.state.cropping} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Photo;
