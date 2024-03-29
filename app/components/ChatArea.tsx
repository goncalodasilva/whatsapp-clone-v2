import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Chat, Message, MessageStatus, getLatestMessages, postMessageToServer } from "../api/database";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from "@mui/icons-material";
import MessageCreatorArea from "./MessageCreatorArea";
import { chat_body_class, chat_class, chat_footer_class, chat_headerInfo_class, chat_headerInfo_h3_class, chat_headerInfo_p_class, chat_header_buttons_class, chat_header_class, chat_message_class, chat_name_class, chat_reciever_class, chat_sender_class, chat_timestamp_class } from "./styles";
import { useGlobalContext } from "../Context/store";
import WelcomeInbox from "./WelcomeInbox";
import UserOptions from "./UserOptions";

interface ChatAreaProps {
  selectedId: string | null;
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedId: selectedId }) => {
  const { userId, chats, chatMessagesMap, setChatMessagesMap } = useGlobalContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [bindedChannel, setBindedChannel] = useState<string>('');
  
  useEffect(() => {
    setMessages(() => {
      if (selectedId && chatMessagesMap.has(selectedId)) {
        console.log('setting messages')
        return chatMessagesMap.get(selectedId) as Message[];
      }
      console.log('resetting messages')
      return [] as Message[];
    });
  }, [selectedId])

  useEffect(() => {
    if (messages.length < 1 || !selectedId) { return; }
    const msg = [...messages].pop() as Message;
    if (msg.status === MessageStatus.SYNCED) { return; }
    postMessageToServer(msg, selectedId);
  }, [messages])


  return (
    <div className={chat_class}>
      {!selectedId ?
        <WelcomeInbox /> :
        <>
          {!chatMessagesMap.has(selectedId) ?
            <>
              {(selectedId as string) === userId ?
                <UserOptions /> :
                <div>Error</div>
              }
            </> :
            <div className={chat_class}>
              <div className={chat_header_class}>
                <Avatar />
                <div className={chat_headerInfo_class}>
                  <h3 className={chat_headerInfo_h3_class}>Room name</h3>
                  <p className={chat_headerInfo_p_class}>Last seen at...</p>
                </div>
                <div className={chat_header_buttons_class}>
                  <IconButton>
                    <SearchOutlined />
                  </IconButton>
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </div>
              </div>

              <div className={chat_body_class}>
                {messages.map((msg: Message) => (
                  <p key={msg.id} className={`${chat_message_class} ${msg.sender === userId ? chat_sender_class : chat_reciever_class}`}>
                    <span className={chat_name_class}>{msg.sender}</span>
                    {msg.content}
                    <span className={chat_timestamp_class}>{msg.sent.toUTCString()}</span>
                  </p>
                ))}
              </div>
              <MessageCreatorArea msgState={[messages, setMessages]} />
            </div>
          }
        </>
      }
    </div>
  )
}

export default ChatArea