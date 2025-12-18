import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PendingRequest from "../pages/PendingRequest";
import Dashboard from "../layouts/Dashboard";
import MyDonation from "../pages/MyDonation"
import CreateDonation from "../pages/CreateDonation";
import Profile from "../pages/Profile";
import PrivateRoute from "../pages/PrivateRoute";
import PendingDetails from "../pages/PendingDetails";
import SearchDonors from "../pages/SearchDonors";
import DashboardHome from "../pages/DashboardHome";
import EditMyRequest from "../pages/EditMyRequest";
import AllUsers from "../pages/AllUsers";


const router  = createBrowserRouter([
    {
        path:"/",
        element:<Root></Root>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/pendingRequest",
                element:<PendingRequest></PendingRequest>
            },
            {
                path:"/pendingDetails/:id",
               element:<PrivateRoute><PendingDetails></PendingDetails></PrivateRoute>,

            },
            {
                path:"/searchDonors",
                element:<SearchDonors></SearchDonors>
            },
        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                index:true,
                element:<DashboardHome></DashboardHome>
            },
            {
                path:"/dashboard/my-donation",
                element:<MyDonation></MyDonation>
            },
            {
                path:"/dashboard/create-donation",
                element:<CreateDonation></CreateDonation>
            },
            {
                path:"/dashboard/profile",
                element:<Profile></Profile>
            },
            {
                path:"/dashboard/edit-my-request/:id",
                element:<EditMyRequest></EditMyRequest>
            },
            {
                path:"/dashboard/all-users",
                element:<AllUsers></AllUsers>
            }
            
        ]
    }
])
export default router;