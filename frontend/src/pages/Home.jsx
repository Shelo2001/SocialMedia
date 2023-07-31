import React from "react";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";

const Home = () => {
    return (
        <div className="flex h-[86.5vh] m-10 gap-10">
            <div className="w-1/5 ">
                <FriendsList />
            </div>
            <div className="w-4/5 ">
                <Chat />
            </div>
        </div>
    );
};

export default Home;
