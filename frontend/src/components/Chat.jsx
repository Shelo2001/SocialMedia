import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import { AiOutlinePlus } from "react-icons/ai";

const Chat = ({ selectedUser }) => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setMessages([...messages, { type: "text", content: message }]);
            setMessage("");
            setFile(null);
        }
    };

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
                        <div className="my-2"></div>
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
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-grow px-4 py-2 bg-gray-200 mx-4 rounded-lg"
                                placeholder="Type your message..."
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
