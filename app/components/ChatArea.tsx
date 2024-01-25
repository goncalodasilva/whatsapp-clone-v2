import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Message, MessageStatus, postMessageToServer } from "../api/database";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from "@mui/icons-material";
import MessageCreatorArea from "./MessageCreatorArea";
import { chat_body_class, chat_class, chat_footer_class, chat_headerInfo_class, chat_headerInfo_h3_class, chat_headerInfo_p_class, chat_header_buttons_class, chat_header_class, chat_message_class, chat_name_class, chat_reciever_class, chat_sender_class, chat_timestamp_class } from "./styles";
import { useGlobalContext } from "../Context/store";

interface ChatAreaProps {
  chatId: string | null;
  chatMessagesMap: [Map<string, Message[]>, Dispatch<SetStateAction<Map<string, Message[]>>>];
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatId, chatMessagesMap }) => {
  const { userId } = useGlobalContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMessages, setChatMessages] = chatMessagesMap;
  useEffect(() => {
    setMessages(() => {
      if (chatId && chatMessages.has(chatId)) {
        console.log('setting messages')
        return chatMessages.get(chatId) as Message[];
      }
      console.log('resetting messages')
      return [] as Message[];
    });
  }, [chatId, chatMessages])

  useEffect(() => {
    if (messages.length < 1 || !chatId) {return;}
    const msg = [...messages].pop() as Message;
    if (msg.status === MessageStatus.SYNCED) {return;}
    postMessageToServer(msg, chatId);    
  }, [messages])

  return (
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
  )
}

export default ChatArea