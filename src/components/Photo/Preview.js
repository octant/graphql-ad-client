import React from "react";

export default React.forwardRef((props, ref) => (
  <div style={{ display: props.cropping ? "block" : "none" }}>
    <canvas
      style={{
        height: 196,
        width: 196,
        border: "dashed",
        borderRadius: 5
      }}
      ref={ref}
    />
  </div>
));
