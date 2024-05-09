import React, { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToken } from "../../service/useToken";
import Input from "../../components/Input";
import { LoginForm } from "./LoginForm";
function Login() {
    const [token, setToken] = useToken();

    const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {
        const response = await axios.post("http://localhost:5000/api/login", {
            email: email,
            password: password,
        });

        const { token } = response.data;
        setToken(token);
        navigate("/");
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return (
        <div className="grid grid-rows-1 xl:grid-cols-2 h-[100vh] text-[#9F7E7E] bg-[#F4F4F2]">
            <div className=" justify-center items-center overflow-hidden hidden xl:flex">
                <img src="https://res.cloudinary.com/djuzpmqlp/image/upload/v1678250024/assets/moodyfae_p9tpyd.jpg" alt="login" className="w-[50vw] h-[100vh] object-cover " />
            </div>
            <LoginForm formHeading="SimplyArt"/>
        </div>
    );
}

export default Login;
