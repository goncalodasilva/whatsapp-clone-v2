'use client'

import { InsertEmoticon } from "@mui/icons-material"
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { chat_footer_class, chat_footer_form_button_class, chat_footer_form_class, chat_footer_form_input_class } from "./styles";
import { Message, MessageStatus } from "../api/database";
import { v4 } from 'uuid'
import { useGlobalContext } from "../Context/store";

interface MessageCreatorAreaProps {
    msgState: [Message[], Dispatch<SetStateAction<Message[]>>]
}

const MessageCreatorArea: React.FC<MessageCreatorAreaProps> = ({ msgState }) => {
    const { userId } = useGlobalContext();
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = msgState;

    const sendMessage = (event: FormEvent) => {
        event.preventDefault();
        //console.log('Not implemented yet', `Message is ${input}`);
        const newMessage: Message = {
            id: v4() as string,
            content: input,
            sender: userId,
            sent: new Date(),
            status: MessageStatus.NON_SYNCED
        }
        setMessages([...messages, newMessage])
        setInput('');
    }

    return (
        <div className={chat_footer_class}>
            <form className={chat_footer_form_class} onSubmit={sendMessage}>
                <input
                    className={chat_footer_form_input_class}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    type="text" />
                <button className={chat_footer_form_button_class} type="submit">Send</button>
            </form>
        </div>

    )
}

export default MessageCreatorArea