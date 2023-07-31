import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/auth";
import { AiFillSetting } from "react-icons/ai";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <Menu as="div" className=" relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center outline-none w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 ">
                    <AiFillSetting size={20} />
                </Menu.Button>
            </div>

            <Transition as={Fragment}>
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/profile"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Profile
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => logout()}
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block w-full text-left px-4 py-2 text-sm"
                                    )}
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
