import React from "react";

function CurrentWeather({ city, data }) {
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    hour12: false,
  };

  const formattedDate = now.toLocaleString("en-US", options);
  return (
    <div
      className="container overflow-hidden text-white mt-3 p-0 pb-3"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.01),rgba(0, 0, 0, 0.05)), url('/cloud.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        borderRadius: "8px",
      }}
    >
      <div
        className="py-2 px-3 px-sm-4"
        style={{ background: "hsla(0, 0%, 0%, 50%)" }}
      >
        <h5 className="mb-0 hstack">
          <span>{city}</span>
          <span className="fw-normal fs-6 ms-2"> as of {formattedDate}</span>
        </h5>
      </div>

      <div className="mt-4 hstack justify-content-between px-3 px-sm-4">
        <div>
          <h1 className="mb-0" style={{ fontSize: "76px" }}>
            {Math.round(data.main.temp)}°C
          </h1>
          <p className="text-capitalize">{data.weather[0].description}</p>
        </div>
        <div>
          <img
            src={`/icons/${data.weather[0].icon}.png`}
            className="img img-fluid"
            alt=""
          />
        </div>
      </div>

      <h5 className="hstack px-3 px-sm-4">
        <span>Day {Math.round(data.main.temp_max)}°C</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-dot"
          viewBox="0 0 16 16"
        >
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
        <span>Night {Math.round(data.main.temp_min)}°C</span>
      </h5>
    </div>
  );
}

export default CurrentWeather;
