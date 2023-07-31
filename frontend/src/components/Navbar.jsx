import React from "react";
import Dropdown from "./Dropdown";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
    return (
        <div className="flex mx-5 items-center justify-between">
            <div className="flex items-center gap-[20px]">
                <Link to="/home">
                    <img className="w-[50px] h-[50px]" src={logo} />
                </Link>
                <form>
                    <label
                        for="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <AiOutlineSearch />
                        </div>
                        <input
                            type="search"
                            className="block w-[100px] md:w-[350px] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-opacity-80 bg-gray-50 focus:outline-none font-thin"
                            placeholder="Explore Users Here..."
                            required
                        />
                    </div>
                </form>
            </div>
            <div>
                <Dropdown />
            </div>
        </div>
    );
};

export default Navbar;
