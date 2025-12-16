import React from 'react';
import DashboardAside from '../components/DashboardAside';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
        <div className="bg-base-200 min-h-screen max-w-[1550px] mx-auto flex">
            <DashboardAside></DashboardAside>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;