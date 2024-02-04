import { SearchOutlined } from "@mui/icons-material"
import ChatSpine from "./ChatSpine"
import { Avatar, IconButton } from "@mui/material"
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useGlobalContext } from "../Context/store";
import { sidebar, sidebar_chats, sidebar_header, sidebar_headerRight, sidebar_search, sidebar_searchContainer, sidebar_searchContainer_icon, sidebar_searchContainer_input } from "./styles";
import { Chat } from "../api/database";
import React, { Dispatch, SetStateAction } from "react";

interface SidebarProps {
    setSelected: Dispatch<SetStateAction<string | null>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelected }) => {
    const { userId, data, chats } = useGlobalContext();



    return (
        <div className={sidebar}>
            <div className={sidebar_header}>
                <Avatar
                    onClick={() => setSelected(userId)}
                    src={data?.user?.photoURL || ''} />
                <div className={sidebar_headerRight}>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className={sidebar_search}>
                <div className={sidebar_searchContainer}>
                    <SearchOutlined className={sidebar_searchContainer_icon} />
                    <input className={sidebar_searchContainer_input} placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className={sidebar_chats}>
                {chats.map((chat: Chat) => (
                    <div
                        key={chat.id}
                        onClick={() => setSelected(chat.id)}
                    >
                        <ChatSpine
                            chatId={'PentqdTlzC3kUdAzeSSn'}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar

function useStateValue(): [{ user: any; }, any] {
    throw new Error("Function not implemented.");
}
