import { selector } from "recoil";
import { notificationAtom } from "../atoms/notification";

export const notificationSelector = selector({
  key: "notificationState",
  get: async ({ get }: any) => {
    return get(notificationAtom);
  },
  set: ({ get, set }, updatedValue) => {
    // get all the user and push latest message

    let notificationData = get(notificationAtom);

    let notificationArr = [...notificationData.notificationMessages];

    // add into arry

    if (updatedValue?.type == "add") {
      // if message exist for same user, remove previous one and add the latest one

      let isUserMessageExist = notificationArr?.find(
        (item) => item.chat?._id === updatedValue?.message?.chat?._id
      );

      if (isUserMessageExist) {
        const updatedArr = notificationArr.filter(
          (item, index) => item?.chat?._id !== updatedValue?.message?.chat?._id
        );

        notificationArr = [...updatedArr, updatedValue?.message];
      } else {
        notificationArr = [...notificationArr, updatedValue?.message];
      }
    } else {
      // remove when click

      notificationArr = notificationArr.filter(
        (item, index) => item?.chat?._id !== updatedValue?.chatId
      );
    }

    // if notification more then 5, remove first one
    // if (notificationArr?.length > 5) {
    //   notificationArr.shift();
    // }

    let payload = {
      notificationMessages: notificationArr,
    };

    set(notificationAtom, payload);
  },
});
