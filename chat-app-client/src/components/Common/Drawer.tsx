import React from "react";
import { Drawer, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useRecoilState } from "recoil";

import { drawerSelector } from "../../recoil/selectors";

const DrawerComponent: React.FC = React.memo(
  ({ children, title, placement, width, handleBackClick, backButton }: any) => {
    const [drawerData, setDrawerData] = useRecoilState(drawerSelector);

    const onClose = () => {
      setDrawerData({
        ...drawerData,
        isDrawerActive: false,
      });
    };

    return (
      <Drawer
        placement={placement || "left"}
        width={width || 500}
        open={true}
        onClose={onClose}
        closable={backButton ? false : true}
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
