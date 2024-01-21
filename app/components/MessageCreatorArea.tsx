'use client'

import { InsertEmoticon } from "@mui/icons-material"
import { FormEvent, useState } from "react";
import { chat_footer_class, chat_footer_form_button_class, chat_footer_form_class, chat_footer_form_input_class } from "./styles";

const MessageCreatorArea = () => {
    const [input, setInput] = useState<string>('');

    const sendMessage = (event: FormEvent) => {
        event.preventDefault();
        console.log('Not implemented yet', `Message is ${input}`);
        setInput('');
    }

    return (
        <div>
            <form className={chat_footer_form_class} onSubmit={sendMessage}>
                <input
                    className={chat_footer_form_input_class}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder=""
                    type="text" />
                <button className={chat_footer_form_button_class} type="submit">Send</button>
            </form>
        </div>

    )
}

export default MessageCreatorArea