import React from "react";
import Profile from "./Profile";
import Search from "./Search";
import Filter from "./Filter";
import Messages from "./Messages";
const index = () => {
  return (
    <div className="w-[100%] h-[100vh] bg-white overflow-hidden border-r-2 border-customDark-light  relative ">
      <div className="absolute w-full  h-auto ">
        <Profile />
        <div className="shadow-sm mb-10">
          <Search />
          <Filter />
        </div>
      </div>
      <div className="absolute w-full top-[24%] h-[67vh]  overflow-scroll">
        <Messages />
      </div>
    </div>
  );
};

export default index;
