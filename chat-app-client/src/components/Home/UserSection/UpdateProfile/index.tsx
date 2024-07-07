import { useRecoilState, useRecoilValue } from "recoil";
import Container from "../../../Common/Container";
import ModalComponent from "../../../Common/Modal";
import { modalAtom, profileAtom } from "../../../../recoil/atoms/profile";

import { selectedUserProfileSelector } from "../../../../recoil/selectors/profile";

const index = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalAtom);

  const selectedUserProfile = useRecoilValue(selectedUserProfileSelector);

  const { name, email } = selectedUserProfile || {};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {};

  return (
    <ModalComponent
      modalOpen={isModalOpen}
      handleCancel={handleCancel}
      loading={false}
      title="Contact Info"
      handleOk={handleOk}
    >
      <Container>
        <div>
          <div className="w-auto max-h-[400px]">
            <img
              className="w-full h-auto rounded-lg shadow-lg mx-auto"
              src={
                "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
              }
            />
          </div>

          <div className="mt-2 text-center">
            <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
      </Container>
    </ModalComponent>
  );
};

export default index;
