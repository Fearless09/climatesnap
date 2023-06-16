import React from 'react'

function WeatherDetails({ city, data }) {
    return (
        <div className='container rounded mt-5 bg-dark text-white pb-5'>
            <div className="px-4 py-2">
                <h5 className="mb-0 hstack">
                    <span className='fw-normal me-2'>Weather Today in</span>
                    <span>{city}</span>
                </h5>
            </div>

            <div className='mt-4 px-4'>
                <div className="hstack justify-content-between">
                    <div>
                        <h1 className='mb-0' style={{ fontSize: '56px' }}>{Math.round(data.main.feels_like)}°C</h1>
                        <p className='text-capitalize'>feels like</p>
                    </div>
                    <div>
                        <img src={`../public/icons/${data.weather[0].icon}.png`} className='img img-fluid' alt="" />
                    </div>
                </div>

                <h5 className='mt-4'>Details</h5>
                <hr className='mt-0' />
                <div className="row gy-2">
                    <div className="col-6">
                        <p className="hstack justify-content-between">
                            <span>High/Low</span>
                            <span>{data.main.temp_max}°C / {data.main.temp_min}°C</span>
                        </p>
                        <hr className='m-0' />
                    </div>
                    <div className="col-6">
                        <p className="hstack justify-content-between">
                            <span>Wind Speed</span>
                            <span>{data.wind.speed} m/s</span>
                        </p>
                        <hr className='m-0' />
                    </div>
                    <div className="col-6">
                        <p className="hstack justify-content-between">
                            <span>Humidity</span>
                            <span>{data.main.humidity}%</span>
                        </p>
                        <hr className='m-0' />
                    </div>
                    <div className="col-6">
                        <p className="hstack justify-content-between">
                            <span>Wind Degree</span>
                            <span>{data.wind.deg} deg</span>
                        </p>
                        <hr className='m-0' />
                    </div>
                    <div className="col-6">
                        <p className="hstack justify-content-between">
                            <span>Pressure</span>
                            <span>{data.main.pressure} hPa</span>
                        </p>
                        <hr className='m-0' />
                    </div>
                    <div className="col-6">
                        <p className="hstack justify-content-between">
                            <span>Visibility</span>
                            <span>{data.visibility/1000} km</span>
                        </p>
                        <hr className='m-0' />
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default WeatherDetails
