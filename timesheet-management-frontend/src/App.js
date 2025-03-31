import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import AboutUs from "./PageComponent/AboutUs";
import ContactUs from "./PageComponent/ContactUs";
import HomePage from "./PageComponent/HomePage";
import UserProfile from "./UserComponent/UserProfile";
import ViewAllEmployee from "./UserComponent/ViewAllEmployee";
import TimeSheetRequestForm from "./TimeSheetComponents/TimeSheetRequestForm";
import ViewEmployeeTimesheetRequest from "./TimeSheetComponents/ViewEmployeeTimesheetRequest";
import ViewTimesheetRequests from "./TimeSheetComponents/ViewTimesheetRequests";
import ViewEmployeeForTimeSheetResponse from "./TimeSheetComponents/ViewEmployeeForTimeSheetResponse";
import UpdateUserProfileForm from "./UserComponent/UpdateUserProfileForm";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/employee/register" element={<UserRegister />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/admin/employee/all" element={<ViewAllEmployee />} />
        <Route path="/user/profile/detail" element={<UserProfile />} />
        <Route
          path="/admin/timesheet/request"
          element={<TimeSheetRequestForm />}
        />
        <Route
          path="/employee/timesheet/request/view"
          element={<ViewEmployeeTimesheetRequest />}
        />
        <Route
          path="/admin/timesheet/request/view"
          element={<ViewTimesheetRequests />}
        />
        <Route
          path="/admin/timesheet/employee/response"
          element={<ViewEmployeeForTimeSheetResponse />}
        />
        <Route
          path="/employee/profile/update"
          element={<UpdateUserProfileForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
