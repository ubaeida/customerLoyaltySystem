import classes from "./Payment.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const Payment = () => {
  const amountref = useRef();
  const phoneref = useRef();
  const navigate = useNavigate();
  const addBill = async () => {
    const token = localStorage.getItem("token");
    const amount = amountref.current.value;
    const phoneNumber = phoneref.current.value;
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${process.env.REACT_APP_API_ADD_BILL}`, {
      method: "POST",
      body: JSON.stringify({ amount, phoneNumber }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        accessToken: `${accessToken}`,
      },
    });
    const json = await response.json();
    if (json.success) {
      alert(json.messages);
      amountref.current.value = "";
      phoneref.current.value = "";
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
            <h1 className="mb-4">Add new Bill</h1>
            <div className="form-field mb-3">
              <label htmlFor="amount" className="mb-2">
                Bill Amount
              </label>
              <input
                ref={amountref}
                type="amount"
                name="amount"
                id="amount"
                className="form-control"
              />
            </div>
            <div className="form-field mb-3">
              <label htmlFor="password" className="mb-2">
                Member phone Number
              </label>
              <input
                ref={phoneref}
                type="phone"
                name="phone"
                id="phone"
                className="form-control"
              />
            </div>
            <div className="row mt-5 align-items-center">
              <div className="col-7">
                <input
                  type="button"
                  onClick={() => {
                    navigate("/deleteBill");
                  }}
                  value={"Go to remove payment"}
                  className="btn btn-danger w-100"
                />
              </div>
              <div className="col-5">
                <input
                  type="button"
                  onClick={() => {
                    addBill();
                  }}
                  value={"Add payment"}
                  className="btn btn-primary w-100"
                />
              </div>
            </div>
            <div
              className="col-5 mt-3"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("accessToken");
              }}
            >
              <Link to={`/login`}>Logout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
