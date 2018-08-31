import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Input, Button } from "reactstrap";
import EXIF from "exif-js";

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

  handleFullStop = () => {
    clearCanvas([this.original, this.preview]);
    this.setState({ ...defaultProps });
  };

  handleCrop = crop => {
    this.setState({ crop });
  };

  handleCropStart = () => {
    const canvas = this.original.current;
    this.setState({
      base64URL: canvas.toDataURL("image/jpeg"),
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
    image64toCanvasRef(this.preview.current, this.state.base64URL, pixelCrop);
  };

  handleSave = e => {
    e.preventDefault();
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
        <h2>Photo</h2>

        <div>
          {this.state.cropping ? (
            <div
              style={{
                position: "static",
                margin: 0
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
                  <Button color="default" onClick={this.handleFullStop}>
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
          <div>
            <canvas ref={this.preview} />
          </div>
        </div>
      </div>
    );
  }
}

function clearCanvas(refs) {
  refs.forEach(ref => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.canvas.height = 200;
    ctx.canvas.width = 200;
  });
}

export function image64toCanvasRef(canvasRef, image64, pixelCrop) {
  const canvas = canvasRef; // document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = image64;
  image.onload = function() {
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  };
}

export default Photo;
