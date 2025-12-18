import React, { use } from 'react';
import { MyContext } from '../provider/ContextProvider';
import UserHome from './UserHome';
import AdminHome from './AdminHome';

const DashboardHome = () => {
  const {role} = use(MyContext)
  if(role=="donor")
  {
    return <UserHome></UserHome>
  }
  else if(role=="admin" || role=="volunteer")
  {
    return <AdminHome></AdminHome>
  }
  
};

export default DashboardHome;