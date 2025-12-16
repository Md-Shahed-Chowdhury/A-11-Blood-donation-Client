import { Link, NavLink, useNavigate } from "react-router";
import "../App.css";
import { use, useState } from "react";
import { MyContext } from "../provider/ContextProvider";
import { toast } from "react-toastify";
import { MdLogin, MdLogout } from "react-icons/md";

const Nav = () => {
  const { user, logOut } = use(MyContext);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast("Logged Out Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  return (
    <div className="navbar   shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm route dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-bold text-md"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/pendingRequest">Donation Request</NavLink>
            </li>
            
          </ul>
        </div>
        <div className="flex items-center">
          <img
            src="https://img.pikbest.com/png-images/20250317/black-red-hand-drawn-blood-donation-care_11603312.png!sw800"
            alt=""
            className="w-12"
          />
          <a className="btn btn-ghost text-xl">Blood Donation</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal route px-1 font-bold text-md">
          <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/pendingRequest">Donation Request</NavLink>
            </li>
        </ul>
      </div>
      <div className="navbar-end">
        
        {hover && (
          <div className="absolute top-5 right-35 bg-gray-800 text-white px-2 py-1 rounded-md">
            {user.displayName}
          </div>
        )}
        {user ? (
          
          <>
            <div className="rounded-full w-10 mr-2 relative">
              <img
                src={user.photoURL}
                alt=""
                className="overflow-hidden rounded-full"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              />
            </div>
            <div className="dropdown dropdown-end z-10">
              <div tabIndex={0} role="button" className="btn m-1">
                Profile
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm font-semibold"
              >
                <li>
                  <a>Name:{user.displayName}</a>
                </li>
                
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <Link
                    onClick={handleLogOut}
                    className="btn flex items-center"
                  >
                    <MdLogout />
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <NavLink to="/login" className="btn flex items-center">
            <MdLogin />
            Login
          </NavLink>
        )}
        
      </div>
    </div>
  );
};

export default Nav;