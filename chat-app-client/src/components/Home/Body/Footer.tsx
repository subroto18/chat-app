import React from "react";
import Input from "../../Common/Input";

const Footer = () => {
  return (
    <div className="bg-slate-200 absolute bottom-0 left-0 right-0 w-full py-3">
      <form>
        <Input className="w-[90%] m-auto bg-slate-50 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs" />
      </form>
    </div>
  );
};

export default Footer;
