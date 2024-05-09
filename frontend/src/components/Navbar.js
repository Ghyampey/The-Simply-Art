import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../service/useUser";
import { SuccessToast } from "../helpers/Toast";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import Headroom from "react-headroom";
import {  RxCross1 } from "react-icons/rx";
import { VscMenu } from "react-icons/vsc";
import "../styles/navbar.css";

export const Navbar = () => {
    const items = [
        { itemName: "HOME", link: "/" },
        { itemName: "STORE", link: "/store" },
        { itemName: "ARTISTS", link: "/artists" },
        { itemName: "EVENTS", link: "/events" },
        { itemName: "CART", link: "/cart" },
    ];

    const user = useUser();

    const [loggedIn, setLoggedIn] = useState(user === null ? false : true);

    const [showNavbar, setShowNavbar] = useState(false);

    const navigate = useNavigate();

    const toggleNavbar = () => {
        if (window.innerWidth > 1024) {
            setShowNavbar(false);
        } else {
            setShowNavbar(!showNavbar);
        }
    };

    const LogOut = () => {
        localStorage.removeItem("token");
        SuccessToast("Logged out.");
        setLoggedIn(!loggedIn);
        navigate("/");
    };

    return (
        <header className={`bg-[#fdfdfd] z-[9999999999] ${showNavbar ? "fixed w-full" :""}`}>
            <Headroom disable={showNavbar}>
                <div className={`bg-[#fdfdfd]`}>
                    <nav
                        className={` grid grid-rows-1 grid-cols-2 px-5 sm:px-[50px] h-[80px] shadow-lg items-center transition-all duration-300 ease-in `}
                    >
                        <p className="font-medium text-2xl text-[#9F7E7E] font-libre">
                            SimplyArt
                        </p>

                        <ul
                            className={`  text-[12px] justify-end  font-slab lg:flex ${
                                showNavbar ? "flex" : "hidden"
                            }`}
                        >
                            <div
                                className={`${
                                    showNavbar
                                        ? "absolute flex items-center justify-center flex-col gap-5 text-[20px] h-[100vh] bg-[#fefefe] right-0 top-0 w-[100%]"
                                        : "flex gap-[20px]"
                                } `}
                            >
                                <button
                                    className="absolute top-5 right-5 lg:hidden"
                                    onClick={toggleNavbar}
                                >
                                    <RxCross1 size={30} />
                                </button>
                                {items.map((item, i) => (
                                    <li key={i}>
                                        <NavLink
                                            to={item.link}
                                            onClick={toggleNavbar}
                                            exact
                                            className={({ isActive }) => {
                                                return isActive
                                                    ? "border-b-2 pb-1 border-[#9F7E7E] "
                                                    : "hover:border-b-2 pb-1 border-[#9F7E7E]";
                                            }}
                                        >
                                            {item.itemName}
                                        </NavLink>
                                    </li>
                                ))}
                                {user?.role === "artist" && loggedIn && (
                                    <li>
                                        <NavLink
                                            to="/artist-dashboard"
                                            onClick={toggleNavbar}
                                            exact
                                            className={({ isActive }) => {
                                                return isActive
                                                    ? "border-b-2 pb-1 border-[#9F7E7E] "
                                                    : "hover:border-b-2 pb-1 border-[#9F7E7E]";
                                            }}
                                        >
                                            DASHBOARD
                                        </NavLink>
                                    </li>
                                )}
                                {user && loggedIn ? (
                                    <button onClick={LogOut}>
                                        <span className="hover:border-b-2 pb-1 border-[#9F7E7E]">
                                            {" "}
                                            LOGOUT
                                        </span>
                                    </button>
                                ) : (
                                    <li>
                                        <NavLink
                                            to="/login"
                                            exact
                                            onClick={toggleNavbar}
                                            className={({ isActive }) => {
                                                return isActive
                                                    ? "border-b-2 pb-1 border-[#9F7E7E] "
                                                    : "hover:border-b-2 pb-1 border-[#9F7E7E]";
                                            }}
                                        >
                                            LOG IN
                                        </NavLink>
                                    </li>
                                )}

                                <li>
                                    <NavLink
                                        to="/user-profile"
                                        exact
                                        onClick={toggleNavbar}
                                        className={({ isActive }) => {
                                            return isActive
                                                ? "border-b-2 pb-1 border-[#9F7E7E] "
                                                : "hover:border-b-2 pb-1 border-[#9F7E7E]";
                                        }}
                                    >
                                        <CgProfile size={18} color="" />
                                    </NavLink>
                                </li>
                            </div>
                        </ul>
                        <button className="lg:hidden" onClick={toggleNavbar}>
                            <VscMenu className="ml-auto" size={30} />
                        </button>
                    </nav>
                </div>
            </Headroom>
        </header>
    );
};
