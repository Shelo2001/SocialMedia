import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosNotifications } from "react-icons/io";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Notifications() {
    return (
        <Menu as="div" className=" relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center outline-none w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 ">
                    <IoIosNotifications size={20} />
                </Menu.Button>
            </div>

            <Transition as={Fragment}>
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block w-full text-left px-4 py-2 text-sm"
                                    )}
                                >
                                    a.name
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
