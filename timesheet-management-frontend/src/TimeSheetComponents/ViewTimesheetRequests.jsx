import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ViewTimesheetRequests = () => {
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [requests, setRequests] = useState([]);
  const [responses, setResponses] = useState([
    {
      status: "",
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
      "http://localhost:8080/api/timesheet/fetch/employee/response?requestId=" +
        requestId +
        "&employeeId=" +
        employee.id
      // ,
      // {
      //   headers: {
      //     Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
      //   },
      // }
    );
    return response.data;
  };

  const retrieveAllRequest = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/timesheet/fetch/requests"
      // ,
      // {
      //   headers: {
      //     Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
      //   },
      // }
    );
    return response.data;
  };

  const viewEmployeeResponse = (request) => {
    navigate("/admin/timesheet/employee/response", { state: request });
  };

  const closeRequest = (requestId, e) => {
    fetch(
      "http://localhost:8080/api/timesheet/admin/update/status?requestId=" +
        requestId +
        "&status=Closed",
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

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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
    <div className="mt-3">
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
          <h2>Timesheet Requests</h2>
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
                  <th scope="col">Request Id</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => {
                  return (
                    <tr>
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
                          onClick={() => viewEmployeeResponse(request)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          View Detail
                        </button>

                        {request.status === "Open" && (
                          <>
                            <button
                              onClick={() => closeRequest(request.id)}
                              className="btn btn-sm btn-danger"
                            >
                              Close Request
                            </button>
                            <ToastContainer />
                          </>
                        )}
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
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            View Employee Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <h2 className="text-color text-left">
              Employee Response: {responses[0].status}
            </h2>

            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">Work Day</th>
                    <th scope="col">Totak Working Hours</th>
                    <th scope="col">Work Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response) => {
                    return (
                      <tr>
                        <td>
                          <b>{response.workDate}</b>
                        </td>

                        <td>
                          <b>{response.totalWorkingHours}</b>
                        </td>
                        <td>
                          <b>
                            {response.workDetail === ""
                              ? "Pending"
                              : response.workDetail}
                          </b>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewTimesheetRequests;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { Button, Modal, Form } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const ViewTimesheetRequests = () => {
//   const [showModal, setShowModal] = useState(false);
//   let navigate = useNavigate();
//   const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

//   const [requests, setRequests] = useState([]);
//   const [responses, setResponses] = useState([]);
//   const [requestId, setRequestId] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null); // NEW STATE FOR IMAGE
//   const employee_jwtToken = sessionStorage.getItem("employee-jwtToken");
//   const employee = JSON.parse(sessionStorage.getItem("active-employee"));

//   useEffect(() => {
//     const getAllRequests = async () => {
//       const allRequests = await retrieveAllRequest();
//       if (allRequests) {
//         setRequests(allRequests.requests);
//       }
//     };

//     if (requestId !== 0) {
//       const getAllRequestResponses = async () => {
//         const res = await retrieveAllResponsesForRequest();
//         if (res) {
//           setResponses(res.employeeResponses);
//         }
//       };
//       getAllRequestResponses();
//     }

//     getAllRequests();
//   }, [requestId]);

//   const retrieveAllResponsesForRequest = async () => {
//     const response = await axios.get(
//       `http://localhost:8080/api/timesheet/fetch/employee/response?requestId=${requestId}&employeeId=${employee.id}`
//     );
//     return response.data;
//   };

//   const retrieveAllRequest = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/api/timesheet/fetch/requests"
//     );
//     return response.data;
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const submitResponses = async () => {
//     const formData = new FormData();
//     formData.append("requestId", requestId);
//     formData.append("employeeId", employee.id);
//     formData.append("totalWorkingHours", responses[0]?.totalWorkingHours);
//     formData.append("workDetail", responses[0]?.workDetail);
    
//     if (selectedFile) {
//       formData.append("image", selectedFile);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/timesheet/employee/update",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success(response.data, {
//         position: "top-center",
//         autoClose: 1000,
//       });
//     } catch (error) {
//       toast.error("Error submitting response");
//     }
//   };

//   return (
//     <div className="mt-3">
//       <div className="card form-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "45rem" }}>
//         <div className="card-header custom-bg-text text-center bg-color" style={{ borderRadius: "1em", height: "50px" }}>
//           <h2>Timesheet Requests</h2>
//         </div>
//         <div className="card-body" style={{ overflowY: "auto" }}>
//           <div className="table-responsive">
//             <table className="table table-hover text-color text-center">
//               <thead className="table-bordered border-color bg-color custom-bg-text">
//                 <tr>
//                   <th scope="col">Work Day</th>
//                   <th scope="col">Total Working Hours</th>
//                   <th scope="col">Work Detail</th>
//                   <th scope="col">Upload Image</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {responses.map((response, index) => (
//                   <tr key={index}>
//                     <td><b>{response.workDate}</b></td>
//                     <td>
//                       <Form.Control type="number" value={response.totalWorkingHours} onChange={(e) => {
//                         let updatedResponses = [...responses];
//                         updatedResponses[index].totalWorkingHours = e.target.value;
//                         setResponses(updatedResponses);
//                       }} />
//                     </td>
//                     <td>
//                       <Form.Control type="text" value={response.workDetail} onChange={(e) => {
//                         let updatedResponses = [...responses];
//                         updatedResponses[index].workDetail = e.target.value;
//                         setResponses(updatedResponses);
//                       }} />
//                     </td>
//                     <td>
//                       <Form.Control type="file" onChange={handleFileChange} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={handleClose} size="xl">
//         <Modal.Body>
//           <Button variant="btn btn-primary" onClick={submitResponses}>
//             Submit Responses
//           </Button>
//           <ToastContainer />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ViewTimesheetRequests;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { Button, Modal } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const ViewTimesheetRequests = () => {
//   const [showModal, setShowModal] = useState(false);
//   let navigate = useNavigate();
//   const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

//   const [requests, setRequests] = useState([]);
//   const [responses, setResponses] = useState([
//     {
//       status: "",
//     },
//   ]);
//   const [requestId, setRequestId] = useState(0);
//   const employee_jwtToken = sessionStorage.getItem("employee-jwtToken");
//   const employee = JSON.parse(sessionStorage.getItem("active-employee"));

//   useEffect(() => {
//     const getAllRequests = async () => {
//       const allRequests = await retrieveAllRequest();
//       if (allRequests) {
//         setRequests(allRequests.requests);
//       }
//     };

//     if (requestId !== 0) {
//       const getAllRequestResponses = async () => {
//         const res = await retrieveAllResponsesForRequest();
//         if (res) {
//           setResponses(res.employeeResponses);
//         }
//       };
//       getAllRequestResponses();
//     }

//     getAllRequests();
//   }, [requestId]);

//   const retrieveAllResponsesForRequest = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/api/timesheet/fetch/employee/response?requestId=" +
//         requestId +
//         "&employeeId=" +
//         employee.id
//       // ,
//       // {
//       //   headers: {
//       //     Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
//       //   },
//       // }
//     );
//     return response.data;
//   };

//   const retrieveAllRequest = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/api/timesheet/fetch/requests"
//       // ,
//       // {
//       //   headers: {
//       //     Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
//       //   },
//       // }
//     );
//     return response.data;
//   };

//   const viewEmployeeResponse = (request) => {
//     navigate("/admin/timesheet/employee/response", { state: request });
//   };

//   const closeRequest = (requestId, e) => {
//     fetch(
//       "http://localhost:8080/api/timesheet/admin/update/status?requestId=" +
//         requestId +
//         "&status=Closed",
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           //    Authorization: "Bearer " + seller_jwtToken,
//         },
//       }
//     )
//       .then((result) => {
//         result.json().then((res) => {
//           if (res.success) {
//             toast.success(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000); // Redirect after 3 seconds
//           } else if (!res.success) {
//             toast.error(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000); // Redirect after 3 seconds
//           }
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("It seems server is down", {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setTimeout(() => {
//           window.location.reload(true);
//         }, 1000); // Redirect after 3 seconds
//       });
//   };

//   return (
//     <div className="mt-3">
//       <div
//         className="card form-card ms-2 me-2 mb-5 shadow-lg"
//         style={{
//           height: "45rem",
//         }}
//       >
//         <div
//           className="card-header custom-bg-text text-center bg-color"
//           style={{
//             borderRadius: "1em",
//             height: "50px",
//           }}
//         >
//           <h2>Timesheet Requests</h2>
//         </div>
//         <div
//           className="card-body"
//           style={{
//             overflowY: "auto",
//           }}
//         >
//           <div className="table-responsive">
//             <table className="table table-hover text-color text-center">
//               <thead className="table-bordered border-color bg-color custom-bg-text">
//                 <tr>
//                   <th scope="col">Request Id</th>
//                   <th scope="col">Start Date</th>
//                   <th scope="col">End Date</th>
//                   <th scope="col">Status</th>
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((request) => {
//                   return (
//                     <tr>
//                       <td>
//                         <b>{request.requestId}</b>
//                       </td>
//                       <td>
//                         <b>{request.startDate}</b>
//                       </td>
//                       <td>
//                         <b>{request.endDate}</b>
//                       </td>
//                       <td>
//                         <b>{request.status}</b>
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => viewEmployeeResponse(request)}
//                           className="btn btn-sm bg-color custom-bg-text"
//                         >
//                           View Detail
//                         </button>

//                         {request.status === "Open" && (
//                           <>
//                             <button
//                               onClick={() => closeRequest(request.id)}
//                               className="btn btn-sm btn-danger"
//                             >
//                               Close Request
//                             </button>
//                             <ToastContainer />
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={handleClose} size="xl">
//         <Modal.Header closeButton className="bg-color custom-bg-text">
//           <Modal.Title
//             style={{
//               borderRadius: "1em",
//             }}
//           >
//             View Employee Status
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="ms-3 mt-3 mb-3 me-3">
//             <h2 className="text-color text-left">
//               Employee Response: {responses[0].status}
//             </h2>

//             <div className="table-responsive">
//               <table className="table table-hover text-color text-center">
//                 <thead className="table-bordered border-color bg-color custom-bg-text">
//                   <tr>
//                     <th scope="col">Work Day</th>
//                     <th scope="col">Totak Working Hours</th>
//                     <th scope="col">Work Detail</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {responses.map((response) => {
//                     return (
//                       <tr>
//                         <td>
//                           <b>{response.workDate}</b>
//                         </td>

//                         <td>
//                           <b>{response.totalWorkingHours}</b>
//                         </td>
//                         <td>
//                           <b>
//                             {response.workDetail === ""
//                               ? "Pending"
//                               : response.workDetail}
//                           </b>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ViewTimesheetRequests;
