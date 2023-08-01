import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearch } from "../services/search";
import Loader from "../components/Loader";
import ModalUsers from "../components/ModalUsers";
import { getTimeDifference } from "../services/getTimeDifference";
import { useFollowing } from "../services/following";

const UserProfile = () => {
    const { id } = useParams();
    const { getUserById, userProfile, loading } = useSearch();
    const { follow, unfollow } = useFollowing();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getUserById(id);
    }, [id]);

    const date = new Date(userProfile?.created_at);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const hasFollowed = () => {
        return userProfile?.followers?.some(
            (follower) => follower.follower_id == user.id
        );
    };

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        setIsFollowing(hasFollowed());
    }, [userProfile]);

    const unfollowHandler = async () => {
        let data = {
            following_id: userProfile.id,
            follower_id: user.id,
        };

        await unfollow(data);
        setIsFollowing(false);
    };

    const followHandler = async () => {
        let data = {
            follower_id: user.id,
            following_id: userProfile.id,
        };
        await follow(data);
        setIsFollowing(true);
    };

    return (
        <div>
            {loading ? (
                <div className="h-[94.5vh] flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="h-[94.5vh] flex items-center justify-center">
                    <div className="bg-white w-[450px]  h-[200px] rounded-xl p-3">
                        <div className="justify-center flex gap-2">
                            <h1 className=" font-semibold text-lg">
                                {userProfile.fullname} -{" "}
                            </h1>
                            <h1 className=" font-semibold text-lg">
                                {userProfile.email}
                            </h1>
                        </div>
                        <h1 className="text-center">
                            {getTimeDifference(
                                userProfile.created_at,
                                "Registered"
                            )}
                        </h1>
                        <div className="flex mt-16 gap-5 justify-center">
                            <ModalUsers
                                follUsers={userProfile.followers}
                                title={"Followers"}
                            />
                            <ModalUsers
                                follUsers={userProfile.following}
                                title={"Following"}
                            />
                            {user?.id !== userProfile.id && (
                                <div>
                                    {isFollowing ? (
                                        <button
                                            onClick={unfollowHandler}
                                            className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 text-gray-100 font-semibold text-md rounded-lg"
                                        >
                                            unfollow
                                        </button>
                                    ) : (
                                        <button
                                            onClick={followHandler}
                                            className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 text-gray-100 font-semibold text-md rounded-lg"
                                        >
                                            follow
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
