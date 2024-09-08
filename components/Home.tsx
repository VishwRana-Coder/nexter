import React from "react";
//Importing Components
import Feed from "./Feed";
import SideBar from "./SideBar";
const Home = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[25%] w-full md:mt-5 md:fixed md:left-0 md:top-0 md:h-full">
          <SideBar />
        </div>
        <div className="md:w-[60%] text-center w-full mt-5 md:ml-[25%]">
          <Feed />
        </div>
      </div>
    </>
  );
};

export default Home;
