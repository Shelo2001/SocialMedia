import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import pusher from "../services/pusher";
import InputEmoji from "react-input-emoji";
import Pusher from "pusher-js";
import { useMessages } from "../services/messages";

const Chat = ({ selectedUser }) => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const { sendMessage } = useMessages();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const user = JSON.parse(localStorage.getItem("user"));

    const handleSendMessage = () => {
        let data = {
            message,
            sender_id: user.id,
            recipient_id: selectedUser?.following_user?.id,
        };

        sendMessage(data);
    };

    Pusher.logToConsole = true;

    useEffect(() => {
        if (selectedUser) {
            const channel = pusher.subscribe(
                `chat${Math.min(
                    user.id,
                    selectedUser?.following_user?.id
                )}${Math.max(user.id, selectedUser?.following_user?.id)}`
            );
            channel.bind(`sendmessage`, function (data) {
                console.log(data);
                setMessages((prevMessages) => [...prevMessages, data]);
            });
        }

        return () => {
            setMessages([]);
        };
    }, [selectedUser]);

    return (
        <div className="bg-opacity-70 h-full bg-white rounded-lg">
            {selectedUser == null ? (
                <p className=" text-lg text-gray-700 text-center pt-20">
                    Tap on a chat to start conversation
                </p>
            ) : (
                <div>
                    <div className="flex p-4 items-center border-b-2">
                        <img
                            className=" mx-7  w-[50px] h-[50px] border-2 border-black rounded-full p-1"
                            src={avatar}
                        />
                        <h1 className="text-2xl text-gray-700">
                            {selectedUser.following_user.fullname}
                        </h1>
                    </div>

                    <div className="p-4 border-t-2 flex-grow max-h-[calc(100vh-300px)] overflow-auto">
                        {messages.map((m) => (
                            <div className="my-2">{m.message}</div>
                        ))}
                    </div>

                    <div className="fixed bottom-[5vh] left-[24.7vh] right-[4vh] md:bottom-[5vh] md:left-[45.7vh] md:right-[4vh] p-4 ">
                        <div className="flex items-center">
                            <input
                                type="file"
                                className="hidden"
                                id="fileInput"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg"
                            >
                                {file ? file.name : <AiOutlinePlus />}
                            </label>

                            <InputEmoji
                                value={message}
                                onChange={setMessage}
                                placeholder="Type a message"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 text-gray-100 font-semibold rounded-lg mr-4"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
