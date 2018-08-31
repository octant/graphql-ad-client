import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Input, Button, Row, Col } from "reactstrap";
import EXIF from "exif-js";

import {
  clearCanvas,
  downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from "./utils";

const defaultProps = {
  selected: false,
  file: null,
  cropping: false,
  base64URL: null,
  crop: {
    maxHeight: 96,
    maxWidth: 96,
    aspect: 1 / 1
  }
};
class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.preview = React.createRef();
    this.original = React.createRef();
    this.state = { ...defaultProps };
  }

  reset = () => {
    clearCanvas([this.original, this.preview]);
    this.setState({ ...defaultProps });
  };

  handleCrop = crop => {
    this.setState({ crop });
  };

  handleCropStart = () => {
    const canvas = this.original.current;
    this.setState({
      base64URL: canvas.toDataURL(this.state.file.type),
      cropping: true
    });
  };

  handleCropCancel = () => {
    clearCanvas([this.preview]);
    this.setState({
      base64URL: null,
      cropping: false,
      crop: { ...defaultProps.crop }
    });
  };

  handleImageLoaded = image => {
    console.log("handleImageLoaded");
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

  handleSave = () => {
    const fileExtension = extractImageFileExtensionFromBase64(
      this.state.base64URL
    );
    const imageData64 = this.preview.current.toDataURL(this.state.file.type);

    downloadBase64File(imageData64, `cropped.${fileExtension}`);
    setTimeout(this.reset, 1000);
  };

  handleFileSelect = e => {
    const self = this;
    const file = e.target.files[0];
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
      };

      self.setState(() => ({ file, selected: true }));
    });
    this.setState(
      () => ({ ...defaultProps }),
      () => (image.src = URL.createObjectURL(file))
    );
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
              {this.state.cropping ? (
                <ReactCrop
                  maxHeight={96}
                  maxWidth={96}
                  onImageLoaded={this.handleImageLoaded}
                  onComplete={this.handleCropComplete}
                  src={this.state.base64URL || ""}
                  onChange={this.handleCrop}
                  crop={this.state.crop}
                />
              ) : (
                ""
              )}
            </div>

            <div>
              <div
                style={{
                  display: this.state.cropping ? "none" : "block"
                }}
              >
                <canvas ref={this.original} />
              </div>
              <div>
                {this.state.selected ? (
                  this.state.cropping ? (
                    <div>
                      <Button color="success" onClick={this.handleSave}>
                        Save
                      </Button>{" "}
                      <Button color="default" onClick={this.handleCropCancel}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button color="success" onClick={this.handleCropStart}>
                        Crop
                      </Button>{" "}
                      <Button color="default" onClick={this.reset}>
                        Cancel
                      </Button>
                    </div>
                  )
                ) : (
                  <div>
                    <Input onChange={this.handleFileSelect} type="file" />
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <canvas ref={this.preview} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Photo;
