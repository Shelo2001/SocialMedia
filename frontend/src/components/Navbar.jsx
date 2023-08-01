import React, { useState } from "react";
import Dropdown from "./Dropdown";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import Notifications from "./Notifications";

const Navbar = () => {
    return (
        <div className="flex mx-5 items-center justify-between">
            <div className="flex items-center gap-[20px]">
                <Link to="/home">
                    <img className="w-[50px] h-[50px]" src={logo} />
                </Link>
                <Search />
            </div>
            <div className="flex gap-[20px]">
                <Notifications />
                <Dropdown />
            </div>
        </div>
    );
};

export default Navbar;
