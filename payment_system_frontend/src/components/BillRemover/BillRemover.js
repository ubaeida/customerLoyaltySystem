import classes from "./Bill.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const Billremover = () => {
  const billNumberRef = useRef();
  const navigate = useNavigate();

  const removeBill = async () => {
    const token = localStorage.getItem("token");
    const accessToken = localStorage.getItem("accessToken");

    const billNumber = billNumberRef.current.value;
    const response = await fetch(
      `${process.env.REACT_APP_API_REMOVE_BIll}?billNumber=${billNumber}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          accessToken: `${accessToken}`,
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      alert(json.messages);
      billNumberRef.current.value = "";
    } else {
      alert(json.messages);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className={`col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3`}
        >
          <div className={`${classes.billContainer} p-5 my-5`}>
            <div className={`${classes.img} mt-4`}>
              <img
                src="logo512.png"
                width={"60px"}
                height={"50px"}
                alt="logo"
              />
            </div>
            <h1 className="mb-4">Remove Bill</h1>
            <div className="form-field mb-3">
              <label htmlFor="password" className="mb-2">
                Bill Number
              </label>
              <input
                ref={billNumberRef}
                type="billNumber"
                name="billNumber"
                id="billNumber"
                className="form-control"
              />
            </div>
            <div className="row mt-5 align-items-center">
              <input
                className="col-6 btn btn-primary"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                value={"Go To add bill form"}
              />

              <div className="col-6">
                <input
                  type="button"
                  onClick={removeBill}
                  value={"Remove Bill"}
                  className="btn btn-danger w-100"
                />
              </div>
              <div
                className="col-12 mt-5"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                <Link to={`/login`}>Logout</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billremover;
