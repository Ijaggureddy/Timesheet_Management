import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TimeSheetRequestForm = () => {
  const [request, setRequest] = useState({
    startDate: "",
    endDate: "",
  });

  const handleUserInput = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const requestTimeSheet = (e) => {
    fetch(
      "http://localhost:8080/api/timesheet/request?startDate=" +
        request.startDate +
        "&endDate=" +
        request.endDate,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //  body: JSON.stringify(loginRequest),
      }
    )
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            console.log("Got the success response");

            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
      });

    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="form-card border-color" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h4 className="card-title">Request TimeSheet</h4>
            </div>
            <div className="card-body mt-3">
              <form>
                <div className="mb-3 text-color">
                  <label for="emailId" class="form-label">
                    <b>Start Date</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    onChange={handleUserInput}
                    value={request.startDate}
                  />
                </div>

                <div className="mb-3 text-color">
                  <label for="emailId" class="form-label">
                    <b>End Date</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    onChange={handleUserInput}
                    value={request.endDate}
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={requestTimeSheet}
                  >
                    Request
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheetRequestForm;
