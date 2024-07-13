import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, List } from "antd";
import { FaBell } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";
import { notificationSelector } from "../../../recoil/selectors/notification";
import { selectedUserProfileSelector } from "../../../recoil/selectors/profile";
import { userSelectedChatId } from "../../../recoil/atoms/chat";

const NotificationBadge = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const [notifiactionData, setNotificationData] =
    useRecoilState(notificationSelector);

  const selectedChatId = useSetRecoilState(userSelectedChatId);

  const { notificationMessages } = notifiactionData || {};

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (chatId) => {
    setNotificationData({
      type: "remove",
      chatId: chatId,
    });

    // select that chat
    selectedChatId(chatId);
  };

  return (
    <div className="relative">
      {/* <button
          onClick={toggleNotifications}
          className="bg-red-500 text-white rounded-full p-2"
        > */}
      <div className="mt-5 relative top-1">
        <FaBell
          onClick={toggleNotifications}
          className="text-2xl cursor-pointer text-slate-500"
        />
        {notificationMessages?.length > 0 && (
          <Badge className="absolute bg-red-500 px-2 py-1  text-white rounded-full top-2 left-3">
            {notificationMessages?.length}
          </Badge>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
          <List
            className="px-4 py-2"
            dataSource={notificationMessages}
            renderItem={(notification) => {
              return (
                <List.Item
                  key={notification?.chat?._id}
                  onClick={() =>
                    handleNotificationClick(notification?.chat?._id)
                  }
                  className="cursor-pointer px-4 hover:bg-gray-200  "
                >
                  Message Received from{" "}
                  <span className="font-bold">
                    {notification?.sender?.name}
                  </span>
                </List.Item>
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationBadge;
