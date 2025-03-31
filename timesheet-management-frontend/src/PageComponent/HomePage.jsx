import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import { Link } from "react-router-dom";
import timetable1 from "../images/timetable_1.png";
import timetable2 from "../images/timetable_2.png";

const HomePage = () => {
  return (
    <div className="container-fluid mb-2">
      {/* <Carousel /> */}

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 text-color">
            <h1>TimeSheet Management System</h1>
            <p>
              Welcome to the TimeSheet Management System, where efficiency meets
              accuracy. Our platform simplifies time tracking, work hour
              logging, and project management for organizations. Whether you're
              an employee recording your daily tasks or a manager overseeing
              project progress, our system ensures transparency and
              accountability in workforce management.
            </p>
            <p>
              Say goodbye to manual timekeeping and paperwork. With real-time
              tracking, automated approvals, and insightful reports, our system
              streamlines the process, allowing businesses to enhance
              productivity and make data-driven decisions effortlessly.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text">
              Get Started
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src={timetable1}
              alt="Timesheet Management"
              width="400"
              height="auto"
              className="home-image"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <img
              src={timetable2}
              alt="Time Tracking"
              width="350"
              height="auto"
              className="home-image"
            />
          </div>
          <div className="col-md-8 text-color">
            <h1 className="ms-5">Smart Time Tracking & Reporting</h1>
            <p className="ms-5">
              Efficient time tracking is crucial for workforce management. Our
              system enables employees to log their working hours effortlessly
              while allowing managers to monitor project timelines and resource
              allocation. With real-time data, businesses can optimize
              productivity and streamline payroll processing.
            </p>
            <p className="ms-5">
              Designed to eliminate inefficiencies, our TimeSheet Management
              System offers powerful analytics, automated approvals, and
              seamless integrations. Stay on top of your time logs, improve
              accountability, and ensure accurate work-hour calculations with
              our user-friendly platform.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text ms-5">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
