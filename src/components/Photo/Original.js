import React from "react";

export default React.forwardRef((props, ref) => (
  <div
    style={{
      display: props.cropping || !props.selected ? "none" : "block"
    }}
  >
    <canvas
      style={{
        border: "dashed",
        borderRadius: 5
      }}
      ref={ref}
    />
  </div>
));
