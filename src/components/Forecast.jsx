import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Details } from "./WeatherDetails";

const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Forecast({ city, forecast }) {
  const day = new Date().getDay();
  const updatedWeek = week.slice(day, week.length).concat(week.slice(0, day));

  return (
    <div
      className="container bg-dark overflow-hidden text-white mt-4"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.00),rgba(0, 0, 0, 0.00)), url('/cloud.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        borderRadius: "8px",
      }}
    >
      <div className="py-2 px-3 px-sm-4">
        <h5 className="mb-0">
          <span>{city}</span>
          <span className="fw-normal fs-6 ms-1 ms-sm-2">
            next seven (7) days forcast
          </span>
        </h5>
      </div>

      <Accordion className="pb-2" allowZeroExpanded>
        {forecast.list.splice(0, 7).map((item, index) => (
          <AccordionItem
            className="rounded border border-light my-2 overflow-hidden"
            key={index}
          >
            <AccordionItemHeading>
              <AccordionItemButton>
                <div
                  className="py-2 px-3"
                  style={{ background: "hsla(0, 0%, 0%, 25%)" }}
                >
                  <h6>{updatedWeek[index]}</h6>
                </div>
                <div className="hstack justify-content-between px-3">
                  <div className="pt-2">
                    <h1 className="mb-0">{Math.round(item.main.temp)}°C</h1>
                    <p className="text-capitalize">
                      {item.weather[0].description}
                    </p>
                    <h6 className="hstack">
                      <span>Day {Math.round(item.main.temp_max)}°C</span>
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
                      <span>Night {Math.round(item.main.temp_min)}°C</span>
                    </h6>
                  </div>
                  <div>
                    <img
                      src={`/icons/${item.weather[0].icon}.png`}
                      className="img img-fluid"
                      alt=""
                    />
                  </div>
                </div>
                {/* <hr className='mt-0' /> */}
              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel>
              <div className="px-3 px-sm-4">
                <Details
                  high_low={`${item.main.temp_max}°C / ${item.main.temp_min}°C`}
                  wind_deg={item.wind.deg}
                  wind_speed={item.wind.speed}
                  humidity={item.main.humidity}
                  pressure={item.main.pressure}
                  visibility={item.visibility / 1000}
                />
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Forecast;
