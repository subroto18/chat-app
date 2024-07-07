import React from "react";
import { Drawer, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useRecoilState } from "recoil";

import { drawerSelector } from "../../recoil/selectors";
import { DRAWER } from "../../utils/drawer";

const DrawerComponent: React.FC = React.memo(
  ({ children, title, placement, width, handleBackClick, backButton }: any) => {
    const [drawerData, setDrawerData] = useRecoilState(drawerSelector);

    const onClose = () => {
      setDrawerData({
        ...drawerData,
        isDrawerActive: "",
      });
    };

    return (
      <Drawer
        placement={placement || "left"}
        width={width || 500}
        open={drawerData?.isDrawerActive}
        onClose={onClose}
        closable={backButton ? "" : DRAWER[0]}
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            {backButton && (
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBackClick}
                style={{ marginRight: "8px" }}
              />
            )}

            <span>{title}</span>
          </div>
        }
      >
        {children}
      </Drawer>
    );
  }
);

export default DrawerComponent;
