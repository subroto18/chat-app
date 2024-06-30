import React, { useState } from "react";
import Container from "../../Common/Container";
import { Button, message } from "antd";
import { LOGOUT } from "../../../service/auth";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const onHandleLogOut = async () => {
    try {
      setLoadingBtn(true);
      await LOGOUT(); // logout
      navigate("/login"); // revigate to login after logout
      setLoadingBtn(false);
      message.success("Logout successfully");
    } catch (error: any) {
      setLoadingBtn(false);
      message.error(
        error?.response?.data?.message || "Something went wrong while logout"
      );
    }
  };

  return (
    <div className="bg-slate-200 dark:bg-customDark w-full">
      <Container>
        <div className="flex justify-between">
          <div className="py-3 flex">
            <img
              className="h-[40px] w-[40px] rounded-full"
              src="https://media-del2-2.cdn.whatsapp.net/v/t61.24694-24/399607423_1580911949419963_806394204675479546_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaILmudOHg5Syj2jClsrBTLiGw3_TGp7fPn4HjCswkNJQA&oe=6687E04F&_nc_sid=e6ed6c&_nc_cat=104"
            />
            <h1 className="ml-3 mt-2">Swpno</h1>
          </div>
          <div>
            <Button
              onClick={onHandleLogOut}
              loading={loadingBtn}
              className="mt-4"
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
