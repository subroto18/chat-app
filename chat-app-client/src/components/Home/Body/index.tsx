import React from "react";
import Header from "./Header";
import Mbody from "./Mbody";
import Footer from "./Footer";

const index = () => {
  return (
    <div className="bg-[url('https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?cs=srgb&dl=pexels-pixabay-235985.jpg&fm=jpg')] bg-auto			relative h-[100vh]">
      <Header />
      <Mbody />
      <Footer />
    </div>
  );
};

export default index;
