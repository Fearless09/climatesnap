import React from "react";

function Loading() {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
