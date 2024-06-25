import React from "react";

const Container = ({ children }: { children: JSX.Element }) => {
  return <div className="w-[95%] m-auto">{children}</div>;
};

export default Container;
