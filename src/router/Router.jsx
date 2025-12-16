import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PendingRequest from "../pages/PendingRequest";
import Dashboard from "../layouts/Dashboard";
import DashHome from "../pages/DashHome"
import MyDonation from "../pages/MyDonation"
import CreateDonation from "../pages/CreateDonation";
import Profile from "../pages/Profile";
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
            }
        ]
    },
    {
        path:"/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
            {
                index:true,
                element:<DashHome></DashHome>
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
            }
        ]
    }
])
export default router;