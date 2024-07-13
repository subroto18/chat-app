import { useRecoilState, useRecoilValue } from "recoil";
import Container from "../../../Common/Container";
import ModalComponent from "../../../Common/Modal";
import { modalAtom, profileAtom } from "../../../../recoil/atoms/profile";

import { selectedUserProfileSelector } from "../../../../recoil/selectors/profile";
import { AVATAR } from "../../../../utils/helper";

const index = () => {
  const [modalData, setModalData] = useRecoilState(modalAtom);

  const selectedUserProfile = useRecoilValue(selectedUserProfileSelector);

  const { name, email } = selectedUserProfile || {};

  const handleCancel = () => {
    setModalData({
      ...modalData,
      profile: false,
    });
  };

  const handleOk = () => {};

  return (
    <ModalComponent
      modalOpen={modalData?.profile}
      handleCancel={handleCancel}
      loading={false}
      title="Contact Info"
      handleOk={handleOk}
    >
      <Container>
        <div>
          <div className="w-auto h-[400px]">
            <img
              className="w-full h-full rounded-lg shadow-lg mx-auto"
              src={AVATAR}
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
