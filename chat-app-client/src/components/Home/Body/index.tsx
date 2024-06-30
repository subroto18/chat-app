import Header from "./Header";
import Mbody from "./Mbody";
import Footer from "./Footer";
import { useRecoilValue } from "recoil";
import { userSelectedChatId } from "../../../recoil/atoms/chat";
import { FaLock } from "react-icons/fa";

const index = () => {
  const selectedChatId = useRecoilValue(userSelectedChatId);

  let backgroundImage = Boolean(selectedChatId)
    ? "https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?cs=srgb&dl=pexels-pixabay-235985.jpg&fm=jpg"
    : "https://i.redd.it/qwd83nc4xxf41.jpg";

  return (
    <div
      className="bg-cover bg-no-repeat h-screen		relative "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {selectedChatId ? (
        <>
          {" "}
          <Header />
          <Mbody />
          <Footer />
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="flex absolute bottom-10">
            <FaLock className="mr-2 text-slate-400 text-sm" />
            <p className="text-slate-400 text-sm">
              Your personal mesages are end to end enctrypted
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
