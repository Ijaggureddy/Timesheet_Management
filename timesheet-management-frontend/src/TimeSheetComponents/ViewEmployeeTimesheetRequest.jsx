import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";

const ViewEmployeeTimesheetRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [requests, setRequests] = useState([]);
  const [responses, setResponses] = useState([
    {
      status: "",
      timesheetRequest: {
        status: "",
      },
    },
  ]);
  const [requestId, setRequestId] = useState(0);
  const employee_jwtToken = sessionStorage.getItem("employee-jwtToken");
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));

  useEffect(() => {
    const getAllRequests = async () => {
      const allRequests = await retrieveAllRequest();
      if (allRequests) {
        setRequests(allRequests.requests);
      }
    };

    if (requestId !== 0) {
      const getAllRequestResponses = async () => {
        const res = await retrieveAllResponsesForRequest();
        if (res) {
          setResponses(res.employeeResponses);
        }
      };
      getAllRequestResponses();
    }

    getAllRequests();
  }, [requestId]);

  const retrieveAllResponsesForRequest = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/timesheet/fetch/employee/response?requestId=${requestId}&employeeId=${employee.id}`
    );
    return response.data;
  };

  const retrieveAllRequest = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/timesheet/fetch/requests"
    );
    return response.data;
  };

  const viewEmployeeResponse = (requestId) => {
    setRequestId(requestId);
    handleShow();
  };

  const submitResponses = (e) => {
    const payload = responses.map((response) => ({
      id: response.id,
      totalWorkingHours: response.totalWorkingHours,
      workDetail: response.workDetail,
    }));

    fetch("http://localhost:8080/api/timesheet/employee/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + seller_jwtToken,
      },
      body: JSON.stringify(payload),
    })
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

            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
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
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
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
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{ height: "45rem" }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{ borderRadius: "1em", height: "50px" }}
        >
          <h2>Timesheet Requests</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th>Request Id</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.requestId}>
                    <td>
                      <b>{request.requestId}</b>
                    </td>
                    <td>
                      <b>{request.startDate}</b>
                    </td>
                    <td>
                      <b>{request.endDate}</b>
                    </td>
                    <td>
                      <b>{request.status}</b>
                    </td>
                    <td>
                      <button
                        onClick={() => viewEmployeeResponse(request.id)}
                        className="btn btn-sm bg-color custom-bg-text"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))}
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
                          disabled={responses[0]?.status !== "Pending"}
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
                          disabled={responses[0]?.status !== "Pending"}
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
          {responses[0]?.status === "Pending" && (
            <Button
              variant="btn bg-color custom-bg-text"
              onClick={submitResponses}
            >
              Submit Responses
            </Button>
          )}

          <ToastContainer />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewEmployeeTimesheetRequest;
