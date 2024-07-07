import React, { Children, useState } from "react";
import { Button, Modal } from "antd";

const ModalComponent: React.FC = ({
  children,
  title,
  handleOk,
  btnTitle,
  buttonType,
  loading,
  modalOpen,
  handleCancel,
  footer,
}: any) => {
  return (
    <>
      <Modal
        open={modalOpen}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          footer
            ? [
                <Button
                  key="button"
                  type={buttonType || "primary"}
                  loading={loading || false}
                  onClick={handleOk}
                >
                  {btnTitle || "Submit"}
                </Button>,
              ]
            : null
        }
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
