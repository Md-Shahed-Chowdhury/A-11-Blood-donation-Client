import React from "react";
import { Outlet, useNavigation } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { GridLoader } from "react-spinners";

const Root = () => {
    const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
    return (
        <div className="bg-base-200 min-h-screen max-w-[1550px] mx-auto ">
      <Nav></Nav>
      <main className="min-h-[calc(100vh-285px)]">
        {isNavigating ? (
          <div className="w-full min-h-[calc(100vh-285px)] flex justify-center items-center">
            <GridLoader color="#9F62F2" size={30} />
          </div>
        ) : (
          <Outlet></Outlet>
        )}
        
      </main>
      <Footer></Footer>
    </div>
    );
};

export default Root;