import React, { memo } from "react";

const Container = ({ children }: { children: JSX.Element }) => {
  return <div className="w-[95%] m-auto">{children}</div>;
};

export default memo(Container);
