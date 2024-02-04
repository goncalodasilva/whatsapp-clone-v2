import { Avatar } from "@mui/material"
import { sidebar_spine, sidebar_spine_info, sidebar_spine_info_h2 } from "./styles"
import React from "react";

interface ChatSpineProps {
  chatId: string | null;
} 

const ChatSpine: React.FC<ChatSpineProps> = ({ chatId }) => {
  const key = chatId;
  return (
    <div className={sidebar_spine}>
            <Avatar />
            <div className={sidebar_spine_info}>
                <h2 className={sidebar_spine_info_h2}>Room name</h2>
                <p>Last message</p>
            </div>
        </div>
  )
}

export default ChatSpine