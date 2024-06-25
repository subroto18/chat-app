import React from "react";
import Container from "../../../Common/Container";
import Input from "../../../Common/Input";

const index = () => {
  return (
    <Container>
      <form>
        <Input className="bg-slate-200 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs" />
      </form>
    </Container>
  );
};

export default index;
