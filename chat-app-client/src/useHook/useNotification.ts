import React from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const alert = (type: NotificationType) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  return [alert, contextHolder];
};

export default useNotification;
