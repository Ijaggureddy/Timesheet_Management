import { useParams, useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const location = useLocation();
  // var user = location.state; // use this in case of Student & Teacher

  const [user, setUser] = useState(location.state);

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setUser(allUsers.users[0]);
      }
    };

    // Run the effect only on mount (empty dependency array)
    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/user-id?userId=" + user?.id
      // ,
      // {
      //   headers: {
      //     Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
      //   },
      // }
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <div>
      {/* User Profile Card */}
      <div className="d-flex align-items-center justify-content-center ms-5 mt-1 me-5 mb-3">
        <div
          className="card rounded-card h-100 shadow-lg"
          style={{
            width: "900px",
          }}
        >
          <div className="card-body">
            <h4 className="card-title text-color-second text-center">
              Personal Detail
            </h4>
            <div>
              <p className="mb-2">
                <b>
                  Role: <span className="text-color-second"> {user.role}</span>
                </b>
              </p>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>First Name:</b> {user.firstName}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Last Name:</b> {user.lastName}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Email Id:</b> {user.emailId}
                </p>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Contact:</b> {user.phoneNo}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Address:</b>{" "}
                  {user.address.street +
                    " " +
                    user.address.city +
                    " " +
                    user.address.pincode}
                </p>
              </div>

              {(() => {
                if (user.role === "Student") {
                  return (
                    <div className="col-md-4">
                      <p className="mb-2">
                        <b>Batch:</b> {user.batch.grade.name}
                      </p>
                    </div>
                  );
                }
              })()}
            </div>
          </div>

          <h4 className="card-title text-color-second text-center mt-5">
            User Profile
          </h4>
          {(() => {
            if (user.userProfile === null) {
              return (
                <div>
                  <h5 className="text-center mt-5">Profile Not Updated</h5>

                  <Link
                    to="/employee/profile/update"
                    class="nav-link active text-center mt-1"
                    aria-current="page"
                  >
                    <b className="text-color-second">
                      Click here to update the profile
                    </b>
                  </Link>
                </div>
              );
            } else {
              return (
                <div>
                  <div className="d-flex align-items-center justify-content-cente">
                    <img
                      src={
                        "http://localhost:8080/api/user/" +
                        user?.userProfile?.profilePic
                      }
                      className="rounded-circle profile-photo"
                      alt="Profile Pic"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "20px auto 10px", // Adjust margins as needed
                      }}
                    />
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <p className="mb-2">
                        <b>Bio:</b> {user?.userProfile?.bio}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="mb-2">
                        <b>Github:</b>
                        <br />
                        <Link
                          to={`${user?.userProfile?.githubProfileLink}`}
                          className="text-color-second"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user?.userProfile?.githubProfileLink}
                        </Link>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="mb-2">
                        <b>LinkedIn:</b>
                        <br />
                        <Link
                          to={`${user?.userProfile?.linkedlnProfileLink}`}
                          className="text-color-second"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user?.userProfile?.linkedlnProfileLink}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <p className="mb-2">
                        <b>SSN Number:</b> {user?.userProfile?.aadharNumber}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
