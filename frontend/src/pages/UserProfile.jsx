import React from "react";
import { useParams } from "react-router";

const UserProfile = () => {
    const { id, fullname } = useParams();
    return (
        <div>
            {id} - {fullname}
        </div>
    );
};

export default UserProfile;
