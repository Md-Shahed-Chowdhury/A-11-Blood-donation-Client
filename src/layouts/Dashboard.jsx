// import { use } from "react";
import DashboardAside from "../components/DashboardAside"

import { Outlet } from "react-router";
import { MyContext } from "../provider/ContextProvider";

const Dashboard = () => {
  // const {role} = use(MyContext);
  return (
    <div className="flex min-h-screen">
     <DashboardAside></DashboardAside>
      <main className="flex-1 px-4 md:px-8 pt-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
