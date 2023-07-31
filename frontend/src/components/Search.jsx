import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearch } from "../services/search";
import { Link } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const { searchUsers, users } = useSearch();

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value); // Update the query state
        searchUsers(value); // Pass the query to the searchUsers function
    };

    return (
        <form>
            <label
                htmlFor="default-search"
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
                    onChange={handleSearch}
                    value={query} // Bind the value of the input to the query state
                    className="block w-[100px] md:w-[350px] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-opacity-80 bg-gray-50 focus:outline-none font-thin"
                    placeholder="Explore Users Here..."
                    required
                />
                {users.length > 0 && query !== "" && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg w-[350px] shadow-lg z-10 max-h-[200px] block overflow-auto custom-scrollbar">
                        <ul className="py-2">
                            {users.map((user) => (
                                <Link
                                    key={user.id}
                                    to={`/profile/${user.id}/${user.fullname}`}
                                    onClick={() => setQuery("")} // Clear the query when clicking on a link
                                >
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        {user.fullname}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
};

export default Search;
