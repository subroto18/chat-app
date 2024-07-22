import React from "react";
import { Button, Popconfirm } from "antd";

const Confirm: React.FC = ({
  title,
  description,
  okText,
  cancelText,
  btnText,
  onClick,
  children,
  placement,
  onConfirm,
}) => (
  <Popconfirm
    title={title ? title : "Remove from  Group"}
    description={
      description ? description : "Are you sure you want to remove from group?"
    }
    onConfirm={onConfirm}
    okText={okText ? okText : "Yes"}
    cancelText={cancelText ? cancelText : "No"}
    placement={placement ? placement : "topLeft"}
  >
    {children}
  </Popconfirm>
);

export default Confirm;
