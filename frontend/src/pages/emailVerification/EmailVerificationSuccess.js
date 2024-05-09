import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmailVerificationSuccess = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const pageTitle = "Verify Your Email | SimplyArt";
        document.title = pageTitle;
    }, []);
    return (
        <div className="w-full h-full">
            <h1>Success</h1>
            <p>Thank you for verfying your email</p>
            <button onClick={() => navigate("/")}>Go to Home page</button>
        </div>
    );
};

export default EmailVerificationSuccess;
