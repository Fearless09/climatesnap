import React from "react";

function WeatherDetails({ city, data }) {
  return (
    <div
      className="container mt-4 bg-dark overflow-hidden text-white pb-5"
      style={{ borderRadius: "6PX" }}
    >
      <div className="px-3 px-sm-4 py-3">
        <h5 className="mb-0 hstack">
          <span className="fw-normal me-2">Weather Today in</span>
          <span>{city}</span>
        </h5>
      </div>

      <div className="mt-3 px-3 px-sm-4">
        <div className="hstack justify-content-between">
          <div>
            <h1 className="mb-0" style={{ fontSize: "56px" }}>
              {Math.round(data.main.feels_like)}°C
            </h1>
            <p className="text-capitalize">feels like</p>
          </div>
          <div>
            <img
              src={`/icons/${data.weather[0].icon}.png`}
              className="img img-fluid"
              alt=""
            />
          </div>
        </div>

        <Details
          high_low={`${data.main.temp_max}°C / ${data.main.temp_min}°C`}
          wind_deg={data.wind.deg}
          wind_speed={data.wind.speed}
          humidity={data.main.humidity}
          pressure={data.main.pressure}
          visibility={data.visibility / 1000}
        />
      </div>
    </div>
  );
}

export default WeatherDetails;

export function Details({
  high_low,
  wind_speed,
  humidity,
  wind_deg,
  pressure,
  visibility,
}) {
  return (
    <div className="mt-3">
      <h5>Details</h5>
      <hr className="mt-0" />
      <div className="row gy-2">
        <FlexItem name={"High/Low"} value={high_low} />
        <FlexItem name={"Wind Speed"} value={`${wind_speed} m/s`} />
        <FlexItem name={"Humidity"} value={`${humidity}%`} />
        <FlexItem name={"Wind Degree"} value={`${wind_deg} deg`} />
        <FlexItem name={"Pressure"} value={`${pressure} hPa`} />
        <FlexItem name={"Visibility"} value={`${visibility / 1000} km`} />
      </div>
    </div>
  );
}

function FlexItem({ name, value }) {
  return (
    <div className="col-6">
      <p className="hstack justify-content-between">
        <span>{name}</span>
        <span>{value}</span>
      </p>
      <hr className="m-0" />
    </div>
  );
}
