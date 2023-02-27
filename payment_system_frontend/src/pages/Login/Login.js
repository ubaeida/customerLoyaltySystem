import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const Login = () => {
  const passwordref = useRef();
  const emailref = useRef();
  const navigate = useNavigate();

  const login = async () => {
    const email = emailref.current.value;
    const password = passwordref.current.value;
    const paymentLoginIn = await fetch(`${process.env.REACT_APP_API_LOGIN}`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "Content-Type": "application/json" },
    });
    const paymentResponse = await paymentLoginIn.json();

    if (paymentResponse.success) {
      localStorage.setItem("token", paymentResponse.token);
      const loyaltyLoginIn = await fetch(
        `${process.env.REACT_APP_API_LOGIN_TO_LOYALTY_APPLICATION}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password:
              process.env.REACT_APP_API_LOGIN_TO_LOYALTY_APPLICATION_PASSWORD,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const loyaltyResponse = await loyaltyLoginIn.json();
      console.log(loyaltyResponse);
      if (loyaltyResponse.success) {
        localStorage.setItem("accessToken", loyaltyResponse.data.token);
        alert(`Payment system ${paymentResponse.messages}`);
        alert(`loyalty system: ${loyaltyResponse.messages}`);
        navigate("/");
      } else {
        alert(
          "You did not logged in the loytay system, May the password is worong or you are not registerd yet"
        );
        navigate("/");
      }
    } else {
      alert(paymentResponse.messages);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className={`col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3`}
          >
            <div className={`${classes.loginContainer} p-5 my-5`}>
              <div className={`${classes.img} mt-4`}>
                <img src="logo512.png" width={'60px'} height={'50px'} alt="logo" />
              </div>
              <h1 className="mb-4">Login</h1>
              <div className="form-field mb-3">
                <label htmlFor="email" className="mb-2">
                  Email Address
                </label>
                <input
                  ref={emailref}
                  type="email"
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
                  ref={passwordref}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
              </div>
              <div className="row mt-5 align-items-center">
                <div className="col-5">
                  <Link to={`/register`}>Register</Link>
                </div>
                <div className="col-7">
                  <input
                    type="button"
                    onClick={() => {
                      login();
                    }}
                    value={"Login"}
                    className="btn btn-primary w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
