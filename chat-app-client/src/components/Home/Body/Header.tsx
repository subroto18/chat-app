import React from "react";
import Container from "../../Common/Container";

const Header = () => {
  return (
    <div className="bg-slate-200 dark:bg-customDark w-full">
      <Container>
        <div>
          <div className="py-3 flex">
            <img
              className="h-[40px] w-[40px] rounded-full"
              src="https://media-del2-2.cdn.whatsapp.net/v/t61.24694-24/399607423_1580911949419963_806394204675479546_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaILmudOHg5Syj2jClsrBTLiGw3_TGp7fPn4HjCswkNJQA&oe=6687E04F&_nc_sid=e6ed6c&_nc_cat=104"
            />
            <h1 className="ml-3 mt-2">Swpno</h1>
          </div>
          <div></div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
