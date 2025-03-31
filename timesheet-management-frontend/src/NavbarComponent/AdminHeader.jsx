import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");

    setTimeout(() => {
      navigate("/home");
      window.location.reload(true);
    }, 2000); // Redirect after 3 seconds
  };
  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link
          to="/user/employee/register"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Employee</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/admin/employee/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">View Employees</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/admin/timesheet/request"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Request Timesheet</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/admin/timesheet/request/view"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color"> Timesheets</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
