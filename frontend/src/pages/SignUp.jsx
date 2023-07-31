import React, { useState } from "react";
import bg from "../assets/bg.webp";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [data, setData] = useState({ email: "", password: "", fullname: "" });

    const submitHandler = (e) => {
        e.preventDefault();
    };

    console.log(data);

    return (
        <div
            className="bg-cover bg-center h-screen"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="flex items-center justify-center h-screen gap-10 flex-col md:flex-row">
                <div className="flex items-center">
                    <img
                        className="w-[50px] h-[50px] md:w-[150px] md:h-[150px]"
                        src={logo}
                        alt="Logo"
                    />
                    <div className="text-center">
                        <h1 className="text-2xl md:text-4xl font-bold mb-5 bg-gradient-to-r from-cyan-600 via-sky-400 to-blue-600 bg-clip-text text-transparent">
                            Social Media
                        </h1>
                        <p className="text-lg md:text-xl font-bold text-gray-800">
                            Explore the ideas throughout the world!
                        </p>
                    </div>
                </div>
                <div className="bg-white w-[300px] h-[450px] md:w-[400px] md:h-[450px] rounded-[50px] flex flex-col items-center justify-center">
                    <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mt-[40px]">
                        Create an account
                    </h1>
                    <form
                        className="flex flex-col gap-6 w-[80%] m-auto mt-[30px]"
                        onSubmit={submitHandler}
                    >
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Fullname"
                            className="h-10 w-full rounded-md bg-gray-100 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="h-10 w-full rounded-md bg-gray-100 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="h-10 w-full rounded-md bg-gray-100 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />

                        <button
                            type="submit"
                            className=" px-4 py-2 bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-200 text-gray-100 font-semibold text-lg rounded-lg"
                        >
                            Sign up
                        </button>
                        <hr></hr>
                        <p className="text-center">
                            Already have an account?{" "}
                            <Link to="/login">
                                <span className="text-blue-400 hover:underline">
                                    Login
                                </span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
