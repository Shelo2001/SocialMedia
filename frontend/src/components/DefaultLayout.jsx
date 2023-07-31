import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const DefaultLayout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default DefaultLayout;