import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Container from "../../../Common/Container";
import {
  allChatsAtom,
  userMessagesAtom,
  userSelectedChatId,
} from "../../../../recoil/atoms/chat";
import { useEffect } from "react";
import { profileAtom } from "../../../../recoil/atoms/profile";
import { GET_ALL_CHATS, GET_MESSAGES_BY_ID } from "../../../../service/chats";
import Shimmer from "../../../Common/Shimmer";
import { userMessagesSelector } from "../../../../recoil/selectors/chat";

const index = () => {
  const [chatList, setChatList] = useRecoilState(allChatsAtom);
  const [messageData, setMessageData] = useRecoilState(userMessagesSelector);
  const [selectedChatId, setSelectedChatId] =
    useRecoilState(userSelectedChatId);

  const { chats, loading } = chatList;

  const loggedInUserData = useRecoilValue(profileAtom);

  const loggedInUserId = loggedInUserData?.user?._id;

  useEffect(() => {
    performChatListApi();
  }, [loggedInUserId]);

  const performChatListApi = async () => {
    // loading api

    setChatList({
      ...chatList,
      loading: true,
    });

    try {
      let response = await GET_ALL_CHATS(loggedInUserId);
      setChatList({
        ...chatList,
        loading: false,
        chats: response?.data,
      });
    } catch (error: any) {
      setChatList({
        ...chatList,
        loading: false,
        error:
          error?.response?.data?.message ||
          "Something went wrong while fetching chat list",
      });
    }
  };

  const performUserMessageApi = async () => {
    // loading
    setMessageData({
      ...messageData,
      loading: true,
      error: "",
    });

    try {
      let response = await GET_MESSAGES_BY_ID(selectedChatId);
      setMessageData({
        ...messageData,
        messages: response?.data,
        loading: false,
        error: "",
      });
    } catch (error: any) {
      setMessageData({
        ...messageData,
        loading: false,
        error:
          error?.response?.data?.message ||
          "Something went wrong while fetching messages",
      });
    }
  };

  // fetch messages when id changes
  useEffect(() => {
    performUserMessageApi();
  }, [selectedChatId]);

  // set chat id to fetch messages based on that
  const onHandleSelectdChatId = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className=" w-full  bg-slate-50 ">
      {loading ? (
        <>
          {[...Array(10)].map((item) => {
            return (
              <div key={item}>
                <Container>
                  <div className="flex py-2 ">
                    <Shimmer />
                  </div>
                </Container>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {chats?.map((item, index) => {
            const { chatName, isGroupChat, latestMessage, _id } = item || {};
            const { content, sender } = latestMessage || {};
            const { name } = sender || {};
            const chatTitle = isGroupChat ? chatName : name;

            return (
              <div
                key={index}
                className="hover:bg-slate-300 hover:cursor-pointer border-b-2 overflow-y-auto "
              >
                <Container>
                  <div
                    onClick={() => onHandleSelectdChatId(_id)}
                    className="flex py-2 "
                  >
                    <div className="flex items-center w-[12%]">
                      <img
                        className="h-[50px] rounded-full"
                        src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                      />
                    </div>
                    <div className="ml-2 flex justify-between w-[90%]">
                      <div className="">
                        <h1 className="font-semibold">{chatTitle}</h1>
                        <p className="text-sm text-slate-600">
                          {isGroupChat ? `${name}:${content}` : content}
                        </p>
                      </div>
                      <div className="">
                        <p className="text-sm text-slate-600 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default index;
