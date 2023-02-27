import classes from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import React from "react";
const Register = () => {
  const passwordref = useRef();
  const emailref = useRef();
  const nameref = useRef();
  const phoneref = useRef();

  const navigate = useNavigate();

  const register = async () => {
    const name = nameref.current.value;
    const email = emailref.current.value;
    const password = passwordref.current.value;
    const phone = phoneref.current.value;
    // console.log(name, email, password);
    const response = await fetch(`${process.env.REACT_APP_API_REGISTER}`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (json.success) navigate("/");
    else {
      alert(json.messages);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className={`col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3`}
        >
          <div className={`${classes.registerContiner} p-5 my-5`}>
            <div className={`${classes.img} mt-4`}>
              <img
                src="logo512.png"
                width={"60px"}
                height={"50px"}
                alt="logo"
              />
            </div>
            <h1 className="mb-4">Create Account</h1>
            <div className="form-field mb-3">
              <label htmlFor="name" className="mb-2">
                Name
              </label>
              <input
                ref={nameref}
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </div>
            <div className="form-field mb-3">
              <label htmlFor="email" className="mb-2">
                Email Address
              </label>
              <input
                type="email"
                ref={emailref}
                name="email"
                id="email"
                className="form-control"
              />
            </div>
            <div className="form-field mb-3">
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <input
                type="password"
                ref={passwordref}
                name="password"
                id="password"
                className="form-control"
              />
            </div>
            <div className="form-field mb-3">
              <label htmlFor="phone" className="mb-2">
                Phone
              </label>
              <input
                type="phone"
                ref={phoneref}
                name="phone"
                id="phone"
                className="form-control"
              />
            </div>

            <div className="row mt-5 align-items-center">
              <div className="col-5">
                <Link to={`/login `}>Login</Link>
              </div>
              <div className="col-7">
                <button
                  type="submit"
                  onClick={register}
                  className="btn btn-primary w-100"
                >
                  Register{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
