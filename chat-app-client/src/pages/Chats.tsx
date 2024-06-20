import React, { useEffect, useState } from "react";
import { GET_ALL_CHATS } from "../service/chats";

const Chats = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    performApi();
  }, []);

  const performApi = async () => {
    let data = await GET_ALL_CHATS();
    console.log(data);
  };

  return (
    <div>
      <ul></ul>
    </div>
  );
};

export default Chats;
