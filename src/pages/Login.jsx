import { NavLink, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { MyContext } from "../provider/ContextProvider";
import { use, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  // const [email, setEmail] = useState(null);
  const { emailLogin, setUser } = use(MyContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    emailLogin(email, password)
      .then((res) => {
        const CurrentUser = res.user;
        setUser(CurrentUser);
        toast("Login Successful");
        state ? navigate(state) : navigate("/");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  // const handleGoogleLogin = () => {
  //   googleLogin()
  //     .then((res) => {
  //       const CurrentUser = res.user;
  //       toast("Login Successful");
  //       setUser(CurrentUser);
  //       state ? navigate(state) : navigate("/");
  //     })
  //     .catch((error) => {
  //       toast(error.message);
  //     });
  // };
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">
              Login to{" "}
              <h2 className="text-2xl font-bold text-red-600">
                Blood<span className="text-gray-800">Care</span>
              </h2>
            </h1>
          </div>
          <div className="card bg-primary max-w-md md:w-120 shrink-0 shadow-2xl p-3 md:p-6 lg:p-8">
            <h2 className="text-center text-2xl md:text-4xl font-bold">
              Welcome Back!
            </h2>
            <p className="text-center mt-2">A blood donation community</p>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    name="email"
                    required
                    // onChange={(e) => setEmail(e.target.value)}
                  />

                  <label className="label">Password</label>
                  <div className=" relative">
                    <input
                      type={visible ? "text" : "password"}
                      className="input"
                      placeholder="Password"
                      name="password"
                      required
                    />

                    <button
                      onClick={() => setVisible(!visible)}
                      type="button"
                      className="absolute top-2 right-2 md:right-10 lg:right-5  text-lg"
                    >
                      {visible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {/* <div>
                    <NavLink
                      className="link link-hover"
                      to="/forget-password"
                      state={email}
                    >
                      Forgot password?
                    </NavLink>
                  </div> */}
                  <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
              </form>
            </div>
            <p>
              Don't have an account?{" "}
              <NavLink to="/register" className="text-blue-600">
                Register Now
              </NavLink>
            </p>
            {/* <hr />
            <button onClick={handleGoogleLogin} className="btn mt-4 btn-accent">
              <FaGoogle /> Continue with Google
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
