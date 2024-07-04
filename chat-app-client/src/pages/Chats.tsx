// DrawerComponent.jsx
import React, { useEffect, useState } from "react";

import { Drawer, Button, AutoComplete } from "antd";

import { useRecoilState } from "recoil";
import { searchTextAtom } from "../recoil/atoms/user";
import useSearchApi from "../useHook/useSearchApi";
import useDebounce from "../useHook/useDebounce";
import { DEBOUNCE_DELAY_TIME } from "../utils";

const Chat = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useRecoilState(searchTextAtom);
  const performUserSearchApi = useSearchApi();
  const debouncedInputValue = useDebounce(searchText, DEBOUNCE_DELAY_TIME);

  useEffect(() => {
    if (debouncedInputValue && Boolean(searchText)) {
      performUserSearchApi();
    }
  }, [searchText, debouncedInputValue]);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  useEffect(() => {}, [searchText]);

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open Drawer
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerOpen}
      >
        <AutoComplete
          style={{
            width: "100%",
          }}
          onSearch={(e) => setSearchText(e)}
          placeholder={""}
        />
      </Drawer>
    </>
  );
};

export default Chat;
