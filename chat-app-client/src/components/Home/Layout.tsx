import UserSection from "./UserSection";
import Body from "./Body";
const Layout = () => {
  return (
    <div className="grid  grid-cols-3  h-[100vh]">
      <div>
        <UserSection />
      </div>
      <div className="col-span-2 ">
        <Body />
      </div>
    </div>
  );
};

export default Layout;
