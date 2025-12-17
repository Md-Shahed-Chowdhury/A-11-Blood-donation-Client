import { NavLink } from "react-router";
import { FaHome, FaTint, FaPlusCircle, FaUser } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { use, useState } from "react";
import { MyContext } from "../provider/ContextProvider";

const DashboardAside = () => {
  const [open, setOpen] = useState(false);
  const {role} = use(MyContext);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
     ${
       isActive
         ? "bg-red-600 text-white"
         : "text-gray-700 hover:bg-red-100 hover:text-red-600"
     }`;

  return (
    <>
      {/* ✅ Mobile Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden fixed top-4 left-4 z-[100] p-2 rounded-lg bg-red-600 text-white shadow-lg"
      >
        <HiDotsVertical size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50
        w-64 min-h-screen bg-white border-r shadow-md p-4
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Blood<span className="text-gray-800">Care</span>
          </h2>
          <p className="text-sm text-gray-500">{`${role.toUpperCase()} Dashboard`}</p>
        </div>

        <nav className="space-y-2">
          <NavLink to="/dashboard" end className={linkClass} onClick={() => setOpen(false)}>
            <FaHome /> Home
          </NavLink>

          <NavLink to="/dashboard/my-donation" className={linkClass} onClick={() => setOpen(false)}>
            <FaTint /> My Donation
          </NavLink>

          <NavLink to="/dashboard/create-donation" className={linkClass} onClick={() => setOpen(false)}>
            <FaPlusCircle /> Create Donation
          </NavLink>

          <NavLink to="/dashboard/profile" className={linkClass} onClick={() => setOpen(false)}>
            <FaUser /> Profile
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default DashboardAside;
