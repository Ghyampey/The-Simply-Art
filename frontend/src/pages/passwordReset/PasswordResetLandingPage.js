import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PasswordResetFail from "./PasswordResetFail";
import PasswordResetSuccess from "./PasswordResetSuccess";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";

const PasswordResetLandingPage = () => {
    const {
        register,
        watch,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();
    watch();

    const values = getValues();

    useEffect(() => {
        const pageTitle = "Reset Password | SimplyArt";
        document.title = pageTitle;
    }, []);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    const { passwordResetCode } = useParams();

    const validateConfirmPassword = (value) => {
        let error;
        if (!value) {
            error = "Confirm Password is required";
        } else if (value !== watch("password")) {
            error = "Passwords do not match";
        }
        return error || true;
    };

    const onResetClick = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/users/${passwordResetCode}/reset-password`,
                { newPassword: values.confirmPassword }
            );
            setIsSuccess(true);
        } catch (err) {
            console.log(`password reset error`, err);
            setIsFailure(true);
        }
    };

    if (isFailure) return <PasswordResetFail />;
    if (isSuccess) return <PasswordResetSuccess />;

    return (
        <div>
            <h1>Reset Password</h1>
            <p>Please enter a new password</p>
            <form onSubmit={handleSubmit(onResetClick)}>
                <Input
                    type="password"
                    placeholder="Password"
                    register={{
                        ...register("password", {
                            required: "Please enter your password.",
                            minLength: {
                                value: 8,
                                message:
                                    "Password length should be at least 8 characters.",
                            },
                        }),
                    }}
                />
                <p>{errors.password?.message}</p>

                <Input
                    type="password"
                    placeholder="Confirm Password"
                    register={{
                        ...register("confirmPassword", {
                            validate: validateConfirmPassword,
                        }),
                    }}
                />
                <p>{errors.confirmPassword?.message}</p>

                <button>Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordResetLandingPage;
