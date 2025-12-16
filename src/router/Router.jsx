import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PendingRequest from "../pages/PendingRequest";
import Dashboard from "../layouts/Dashboard";

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
        element:<Dashboard></Dashboard>
    }
])
export default router;