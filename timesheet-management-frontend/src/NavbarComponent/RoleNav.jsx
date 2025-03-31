import AdminHeader from "./AdminHeader";
import HeaderEmployee from "./HeaderEmployee";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));

  if (admin != null) {
    return <AdminHeader />;
  } else if (employee != null) {
    return <HeaderEmployee />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
