import React, { useState } from "react";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";

const Home = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserCardClick = (u) => {
        setSelectedUser(u);
    };

    return (
        <div className="flex h-[86.5vh] m-10 gap-10">
            <div className="w-1/5 ">
                <FriendsList onUserCardClick={handleUserCardClick} />
            </div>
            <div className="w-4/5 ">
                <Chat selectedUser={selectedUser} />
            </div>
        </div>
    );
};

export default Home;
