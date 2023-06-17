import React from 'react'

function FAQ() {
    return (
        <div className='container mt-4'>
            <h3>Frequently Asked Questions</h3>

            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            How accurate are the weather forecasts on ClimateSnap?
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body"><code>Our weather forecasts strive for accuracy and are based on advanced meteorological models and data sources. However, it's important to note that weather forecasting is a complex science, and some level of variability is inherent. We continuously work to improve our accuracy and provide the most reliable forecasts possible.</code></div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            How often are the forecasts updated?
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body"><code>
                            We update our forecasts regularly to ensure you have the most current and relevant weather information. The frequency of updates depends on various factors, including the region and the availability of new data. In most cases, you can expect forecasts to be updated multiple times per day.
                        </code></div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            How far in advance can I see the weather forecast?
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body"><code>
                            ClimateSnap offers both current and extended forecasts. The extended forecasts typically provide weather information for up to 7 days ahead. However, please note that forecast accuracy tends to decrease the further into the future you go.
                        </code></div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                            Can I receive personalized weather alerts?
                        </button>
                    </h2>
                    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body"><code>
                            Yes, you can customize weather alerts on ClimateSnap. Whether it's severe weather conditions, temperature thresholds, or specific events, you can set up personalized alerts to receive notifications via email or push notifications on our mobile app.
                        </code></div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                            How do you gather weather data for forecasts?
                        </button>
                    </h2>
                    <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body"><code>
                            We utilize a combination of data sources, including meteorological satellites, weather stations, and global weather models. These sources provide a wide range of weather parameters, which our algorithms analyze to generate forecasts tailored to specific locations.
                        </code></div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse6" aria-expanded="false" aria-controls="flush-collapse6">
                            Is ClimateSnap available for international locations?
                        </button>
                    </h2>
                    <div id="flush-collapse6" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body"><code>
                            Yes, ClimateSnap offers weather forecasts for cities and locations worldwide. Simply enter your desired location in the search bar, and you will be provided with the relevant weather information.
                        </code></div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse7" aria-expanded="false" aria-controls="flush-collapse7">
                            How can I provide feedback or report issues?
                        </button>
                    </h2>
                    <div id="flush-collapse7" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body"><code>
                            We value your feedback and encourage you to reach out to our support team. You can contact us via email at [contact email] or by using the contact form on our website. We appreciate any feedback or bug reports you provide, as they help us improve our service.
                        </code></div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse8" aria-expanded="false" aria-controls="flush-collapse8">
                            Is there a mobile app available for ClimateSnap?
                        </button>
                    </h2>
                    <div id="flush-collapse8" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body"><code>
                            Yes, we have a mobile app available for download on iOS and Android devices. The app offers a seamless user experience and allows you to access weather forecasts, personalized alerts, and other features on the go.
                        </code></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FAQ
