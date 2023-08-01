import React, { useEffect } from "react";
import { useSearch } from "../services/search";
import avatar from "../assets/avatar.png";
import Loader from "./Loader";

const FriendsList = ({ onUserCardClick }) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const { getUserById, userProfile, loading } = useSearch();

    useEffect(() => {
        getUserById(user.id);
    }, []);

    return (
        <div className="overflow-auto custom-scrollbar bg-opacity-70 h-full bg-white rounded-lg ">
            <h1 className="text-xl md:text-4xl font-bold p-5">Chats</h1>
            <hr></hr>
            {loading ? (
                <div className="h-[70vh] flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                userProfile?.following?.map((u) => (
                    <div
                        onClick={() => onUserCardClick(u)}
                        className="flex w-5/6 m-auto gap-3 mb-2 mt-2 items-center border-b-2  px-3 py-3 cursor-pointer hover:bg-gray-100"
                    >
                        <img
                            className="w-[50px] h-[50px] border-2 border-black rounded-full p-1"
                            src={avatar}
                        />
                        <div>
                            <p>{u?.following_user?.fullname}</p>
                            {u?.following_user?.is_online ? (
                                <p className=" text-green-300">Online</p>
                            ) : (
                                <p className=" text-red-300">Offline</p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default FriendsList;
