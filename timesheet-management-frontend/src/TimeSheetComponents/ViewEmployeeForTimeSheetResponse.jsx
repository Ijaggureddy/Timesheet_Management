import { useParams, useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";

const ViewEmployeeForTimeSheetResponse = () => {
  const location = useLocation();
  var request = location.state;

  console.log(request);

  const [responses, setResponses] = useState([]);
  const [employeeId, setEmployeeId] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [allemployee, setAllemployee] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllemployee(allUsers.users);
      }
    };

    if (employeeId !== 0) {
      const getAllRequestResponses = async () => {
        const res = await retrieveAllResponsesForRequest();
        if (res) {
          setResponses(res.employeeResponses);
        }
      };
      getAllRequestResponses();
    }

    getAllUsers();
  }, [employeeId]);

  const retrieveAllResponsesForRequest = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/timesheet/fetch/employee/response?requestId=${request.id}&employeeId=${employeeId}`
    );
    return response.data;
  };

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Employee"
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

  const viewEmployeeResponse = (employeeId) => {
    setEmployeeId(employeeId);
    handleShow();
  };

  const submitAdminResponse = (status, e) => {
    fetch(
      "http://localhost:8080/api/timesheet/verify/employee/response?requestId=" +
        request.id +
        "&employeeId=" +
        employeeId +
        "&status=" +
        status,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + seller_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setResponses(res.employeeResponses);
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  return (
    <div>
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>Employees TimeSheet Response</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allemployee.map((employee) => {
                  return (
                    <tr>
                      <td>
                        <b>{employee.firstName}</b>
                      </td>
                      <td>
                        <b>{employee.lastName}</b>
                      </td>
                      <td>
                        <b>{employee.emailId}</b>
                      </td>
                      <td>
                        <b>{employee.phoneNo}</b>
                      </td>

                      <td>
                        <button
                          onClick={() => viewEmployeeResponse(employee.id)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          View Response
                        </button>
                        <ToastContainer />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>View Employee Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <h2 className="text-color">
              Employee Response: {responses[0]?.status || "Pending"}
            </h2>
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th>Work Day</th>
                    <th>Total Working Hours</th>
                    <th>Work Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response, index) => (
                    <tr key={index}>
                      <td>
                        <b>{response.workDate}</b>
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={response.totalWorkingHours}
                          onChange={(e) => {
                            if (responses[0]?.status === "Pending") {
                              const newResponses = [...responses];
                              newResponses[index].totalWorkingHours =
                                e.target.value;
                              setResponses(newResponses);
                            }
                          }}
                          disabled={true}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={response.workDetail}
                          onChange={(e) => {
                            if (responses[0]?.status === "Pending") {
                              const newResponses = [...responses];
                              newResponses[index].workDetail = e.target.value;
                              setResponses(newResponses);
                            }
                          }}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {responses[0]?.status === "Submitted" && (
            <>
              <Button
                variant="btn btn-success"
                onClick={() => submitAdminResponse("Approved")}
              >
                Approve Timesheet
              </Button>
              <ToastContainer />

              <Button
                variant="btn btn-danger"
                onClick={() => submitAdminResponse("Rejected")}
              >
                Reject Timesheet
              </Button>
              <ToastContainer />
            </>
          )}

          <ToastContainer />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewEmployeeForTimeSheetResponse;
