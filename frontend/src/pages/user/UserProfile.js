import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Input from "../../components/Input";
import { SuccessToast, InfoToast } from "../../helpers/Toast";
import { DashboardActionButton } from "../../components/Button";
import { useUser } from "../../service/useUser";
import { Heading2 } from "../../components/Heading";
import { ArtistNavbar } from "../../components/ArtistNavbar";

const UserProfilePage = () => {
    useEffect(() => {
        document.title = 'Your Profile | View Your Profile'; 
      }, []);
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm();

    const user = useUser();

    
    const isToastShownRef = useRef(false);

    useEffect(() => {
        if (!user && !isToastShownRef.current) {
            InfoToast("Please Log In to view your profile and orders.")
            isToastShownRef.current = true; // Update the ref value
        }
    }, [user]);

    const links = [
        { itemName: "PROFILE", link: `/user-profile/` },
        { itemName: "ORDERS", link: `/orders` },
    ];

    const [userInfo, setUserInfo] = useState();
    const [artistCheck, setartistCheck] = useState();

    const validateConfirmPassword = (value) => {
        let error;
        if (value !== watch("password")) {
            error = "Passwords do not match";
        }
        return error || true;
    };

    const getUser = async () => {
        if(user){
        const response = await axios.get(
            `http://localhost:5000/api/users/${user.id}`
        );
        setUserInfo(response.data.user);
        setartistCheck(response.data.user.role === "artist" ? true : false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const updateUserInfo = async ({ confirmPassword, receiveEmail, role }) => {
        console.log(confirmPassword, receiveEmail, role);
        if (confirmPassword || receiveEmail || role) {
            try {
                const response = await axios.patch(
                    `http://localhost:5000/api/users/${user.id}`,
                    {
                        confirmPassword,
                        receiveEmail,
                        role,
                    }
                );

                SuccessToast("Your information has been updated.");
            } catch (err) {
                console.log(`err:${err}`);
            }
        } else {
            InfoToast(
                "Please change the details before updating your profile."
            );
        }
    };

    return (
        <div className=" max-w-[1340px] m-auto ">
            <br/><br/>
             <ArtistNavbar links={links}/>
        <div className="flex flex-col items-center justify-center gap-[20px] py-[50px] font-slab">
                       

            <Heading2>Profile</Heading2>

            <form
                className="flex flex-col gap-[20px] my-[20px]"
                onSubmit={handleSubmit(updateUserInfo)}
            >
                <div className="grid grid-rows-1 justify-center gap-[30px] w-[90%] m-auto">
                    <div className="flex flex-col gap-[20px] ">
                        <label>Username</label>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={userInfo?.username}
                            register={{
                                ...register("username"),
                            }}
                            disabled={true}
                        />
                        <p>{errors.username?.message}</p>
                        <label>Email</label>
                        <Input
                            type="text"
                            placeholder="Email"
                            disabled={true}
                            value={userInfo?.email}
                            register={{
                                ...register("email"),
                            }}
                        />
                        <p>{errors.email?.message}</p>
                        <label>New Password</label>
                        <Input
                            type="text"
                            placeholder="Password"
                            disabled={userInfo?.password ===undefined}
                            register={{
                                ...register("password"),
                            }}
                        />
                        <p>{errors.password?.message}</p>

                        <label>Confirm Password</label>
                        <Input
                            type="text"
                            placeholder="Confirm Password"
                            disabled={userInfo?.password ===undefined}
                            register={{
                                ...register("confirmPassword", {
                                    validate: validateConfirmPassword,
                                }),
                            }}
                        />
                        <p>{errors.confirmPassword?.message}</p>

                        <Controller
                            name="receiveEmail"
                            control={control}
                            defaultValue={userInfo?.receiveEmail}
                            render={({ field }) => (
                                <label>
                                    <input
                                        className="mr-2"
                                        type="checkbox"
                                        defaultChecked={userInfo?.receiveEmail}
                                        {...field}
                                    />
                                    Receive email alerts about upcomming art
                                    events?
                                </label>
                            )}
                        />

                        <Controller
                            name="role"
                            control={control}
                            defaultValue={artistCheck}
                            render={({ field }) => (
                                <label className="">
                                    <input
                                        className="mr-2"
                                        type="checkbox"
                                        defaultChecked={artistCheck}
                                        {...field}
                                    />
                                    Sign up as an artist?
                                </label>
                            )}
                        />
                    </div>
                </div>
                
                <button className="w-[200px] py-4 border-2 rounded-lg"> Update Information</button>
            </form>
        </div>
        </div>
    );
};

export default UserProfilePage;
