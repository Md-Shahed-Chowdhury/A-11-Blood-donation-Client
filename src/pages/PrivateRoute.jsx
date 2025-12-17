import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { MyContext } from "../provider/ContextProvider";
import { GridLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  //   const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, role } = use(MyContext);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-285px)] w-full flex justify-center items-center">
        <GridLoader />
      </div>
    );
  }
  if (!user || !role) {
    // navigate("/login");
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  } else {
    return children;
  }
};

export default PrivateRoute;