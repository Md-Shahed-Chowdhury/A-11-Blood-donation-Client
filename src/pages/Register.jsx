import { use, useEffect, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { MyContext } from "../provider/ContextProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { toast } from "react-toastify";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const { emailRegister, setUser } = use(MyContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [myDistrict, setMyDistrict] = useState(null);
  const [confirmPass, setConfirmPass] = useState("");
  const axiosInstance = useAxios();

  // const handleGoogleLogin = () => {
  //   googleLogin()
  //     .then((res) => {
  //       const CurrentUser = res.user;
  //       toast("Login Successful");
  //       setUser(CurrentUser);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       toast(error.message);
  //     });
  // };
  const handleRegister = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/;

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    let photoUrl = form.photoUrl;
    const file = photoUrl.files[0];
    const password = form.password.value;
    let result;
    try {
      result = await axios.post(
        "https://api.imgbb.com/1/upload?key=70b53b2348bb8f3f317563c7b7814e63",
        { image: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log("error in imgbb", error);
    }

    photoUrl = result.data.data.display_url;
    console.log(photoUrl);

    setError("");
    if (password != confirmPass) {
      setError("Password should be same in both fields");
      return;
    }
    const upazila = form.upazila.value;
    const district = districts.find(
      (district) => myDistrict == district.id
    ).name;
    const bloodGroup = form.bloodGroup.value;
    if (!regex.test(password)) {
      setError(
        "Password should have atleast 6 characters,1 lowercase,1 uppercase letter,1 special character!"
      );
      return;
    }

    const newUser = {
      name,
      email,
      photoUrl,
      password,
      upazila,
      district,
      bloodGroup,
    };
    console.log("new", newUser);

    emailRegister(email, password)
      .then((user) => {
        axiosInstance
          .post("/newUser", newUser)
          .then((data) => console.log(data.data));
        const CurrentUser = user.user;
        toast("Registered Successfully");
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            console.log("Profile Updated");
            setUser({ ...CurrentUser, displayName: name, photoURL: photoUrl });
            navigate("/");
          })
          .catch((error) => toast(error.message));
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  //district
  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts([...data]);
      });
  }, []);
  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilas([...data]);
      });
  }, []);
  

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-primary max-w-md md:w-120 shrink-0 shadow-2xl p-3 md:p-6 lg:p-8">
            <h2 className="text-center text-2xl md:text-4xl font-bold">
              Welcome To{" "}
              <h2 className="text-2xl font-bold text-red-600">
                Blood<span className="text-gray-800">Care</span>
              </h2>
            </h2>
            <p className="text-center mt-2">A blood donation community</p>
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    name="name"
                    required
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    name="email"
                    required
                  />
                  <label className="label">Photo URL</label>
                  <input
                    type="file"
                    className="input"
                    placeholder="Photo"
                    name="photoUrl"
                    required
                  />
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <select
                    id="bloodGroup"
                    className="input"
                    name="bloodGroup"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  <label className="label">District</label>
                  <select
                    name="district"
                    className="input"
                    defaultValue=""
                    onChange={(e) => setMyDistrict(e.target.value)}
                  >
                    <option value="" disabled>
                      District
                    </option>

                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <label className="label">Upazila</label>
                  <select name="upazila" className="input" defaultValue="">
                    <option value="" disabled>
                      Upazila
                    </option>

                    {upazilas
                      .filter((upazila) => upazila.district_id == myDistrict)
                      .map((upa) => (
                        <option key={upa.id} value={upa.name}>
                          {upa.name}
                        </option>
                      ))}
                  </select>

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
                  <label className="label">Confirm password</label>
                  <div className=" relative">
                    <input
                      type={visible ? "text" : "password"}
                      className="input"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                      }}
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
                  <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
              </form>
            </div>
            <p>
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-600">
                login Now
              </NavLink>
            </p>
            {/* <hr />
            <button onClick={handleGoogleLogin} className="btn btn-accent mt-4">
              <FaGoogle /> Continue with Google
            </button> */}
            {error && (
              <div className="font-semibold text-red-600 text-lg">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
