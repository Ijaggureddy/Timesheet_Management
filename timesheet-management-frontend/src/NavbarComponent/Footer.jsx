import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="container my-5">
        <footer className="text-center text-lg-start text-color">
          <div className="container-fluid p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-second">
                    TimeSheet Management System
                  </h5>
                  <p>
                    Welcome to the TimeSheet Management System, where tracking
                    work hours and productivity is effortless. Our platform
                    streamlines time tracking, project management, and reporting
                    for businesses and professionals.
                  </p>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-second">About Us</h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Our Mission
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-second">
                    Contact Us
                  </h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Feedback
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Email Us
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-second">Careers</h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Join Us
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Internships
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Open Positions
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Culture
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase text-color-second">
                    Quick Links
                  </h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#!" className="text-color">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Reports
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="text-color">
                        Help
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="mb-4" />

            <section className="">
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3 text-color">Login to Your Account</span>
                <Link to="/user/login" className="active">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-rounded bg-color custom-bg-text"
                  >
                    Log in
                  </button>
                </Link>
              </p>
            </section>

            <hr className="mb-4" />
          </div>

          <div className="text-center">
            © 2025 Copyright:
            <a className="text-color-3" href="#">
              timesheetmanagement.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
