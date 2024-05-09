import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const pageTitle = "Verify Your Email | SimplyArt";
        document.title = pageTitle;
    }, []);
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, [navigate]);
    
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="h-[200px] w-[500px] text-center ">
                <h1>Thanks for signing up!</h1>
                <p>
                    A verification message has been sent to your email address.
                    <br></br>
                    Please verify your email to continue.
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
