import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const { login, errorAuth, loading, success } = useAuth();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        login(data);
    };

    useEffect(() => {
        if (success) {
            navigate("/home");
        }
    }, [success]);

    return (
        <div className="bg-cover bg-center h-screen">
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
                <div className="bg-white w-[300px] h-[400px] md:w-[400px] md:h-[430px] rounded-[50px] flex flex-col items-center justify-center">
                    <h1 className="text-center text-3xl font-bold text-gray-800 mt-[40px]">
                        Login
                    </h1>
                    {errorAuth && (
                        <p className="text-center w-[90%] p-2  bg-red-300 rounded-lg">
                            {errorAuth}
                        </p>
                    )}
                    <form
                        className="flex flex-col gap-6 w-[80%] m-auto mt-[30px]"
                        onSubmit={submitHandler}
                    >
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
                            {loading ? "Loading..." : "Login"}
                        </button>
                        <hr></hr>
                        <p className="text-center">
                            Don't have an account?{" "}
                            <Link to="/signup">
                                <span className="text-blue-400 hover:underline">
                                    Sign Up
                                </span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
