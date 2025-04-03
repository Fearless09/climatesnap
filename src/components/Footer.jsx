import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-4">
      <div className="container py-4">
        <div className="row">
          {/* About US */}
          <div className="col-md">
            <h5>About Us</h5>
            <p>
              Learn more about ClimateSnap, our mission, and our team dedicated
              to providing accurate and reliable weather forecasts for cities
              worldwide.{" "}
              <Link to={"/about"} title="About US" className="text-light">
                Click here
              </Link>{" "}
              to know more about ClimateSnap
            </p>
          </div>

          {/* Contact US */}
          <div className="col-md mt-3 mt-md-0">
            <h5>Contact Us</h5>
            <p>
              Get in touch with our team for support, feedback, or inquiries.
              You can reach us by email at{" "}
              <a
                href="mailto:toheebopeyemi9@gmail.com"
                title="Email US"
                className="text-light"
              >
                via email
              </a>
            </p>
          </div>

          {/* Follow US */}
          <div className="col-md mt-3 mt-md-0">
            <h5>Social Media</h5>
            <p>
              Connect with us on social media platforms to stay updated on the
              latest weather news, forecasts, and special announcements. Follow
              us on{" "}
              <a
                href="https://github.com/Fearless09/climatesnap"
                target="_blank"
                title="Follow US on GitHub"
                className="text-light"
              >
                GitHub
              </a>
              ,{" "}
              <a
                href="#"
                target="_blank"
                title="Follow US on Twitter"
                className="text-light"
              >
                Twitter
              </a>
              , and
              <a
                href="#"
                target="_blank"
                title="Follow US on LinkedIn"
                className="text-light ms-2"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>
        <div className="text-md-center mt-4 mt-md-2">
          <h5>Copyright</h5>
          <p className="lead mb-0">
            &copy; 2023 ClimateSnap. All rights reserved. Any unauthorized use
            or reproduction of the content on this website is strictly
            prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
