import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSearch } from "../services/search";
import Loader from "../components/Loader";
import ModalUsers from "../components/ModalUsers";

const UserProfile = () => {
    const { id } = useParams();
    const { getUserById, userProfile, loading } = useSearch();

    useEffect(() => {
        getUserById(id);
    }, [id]);

    return (
        <div>
            {loading ? (
                <div className="h-[94.5vh] flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="h-[94.5vh] flex items-center justify-center">
                    <div className="bg-white w-[450px] h-[200px] rounded-xl">
                        <div className=" justify-center flex gap-2">
                            <h1>{userProfile.fullname}</h1>
                            <h1>{userProfile.email}</h1>
                        </div>
                        <h1>{userProfile.created_at}</h1>
                        <ModalUsers
                            follUsers={userProfile.followers}
                            title={"Followers"}
                        />
                        <ModalUsers
                            follUsers={userProfile.following}
                            title={"Following"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
