import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosNotifications } from "react-icons/io";
import pusher from "../services/pusher";
import { useNotifications } from "../services/notifications";
import axios from "axios";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const { setNotificationsToSeen, deleteNotifications } = useNotifications();
    console.log(notifications);

    Pusher.logToConsole = true;
    useEffect(() => {
        const channel = pusher.subscribe(`useractions.${user.id}`);

        const fetchNotifications = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/notifications/${user.id}`
            );
            const notificationsFromDatabase = data.notifications;
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                ...notificationsFromDatabase,
            ]);
        };

        fetchNotifications();

        channel.bind(`new-action`, function (data) {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data,
            ]);
        });

        return () => {
            pusher.unsubscribe("new-comments");
            pusher.disconnect();
        };
    }, []);

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
                        {notifications.length == 0 ? (
                            <>No notifications yet</>
                        ) : (
                            notifications.map((notification) => (
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to={`/profile/${notification.action_user_id}/${notification.username}`}
                                        >
                                            <button
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block w-full text-left px-4 py-2 text-sm"
                                                )}
                                            >
                                                {notification.username}{" "}
                                                {notification.action} you
                                            </button>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
