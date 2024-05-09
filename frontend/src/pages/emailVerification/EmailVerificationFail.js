import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmailVerificationFail = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const pageTitle = "Verify Your Email | SimplyArt";
        document.title = pageTitle;
    }, []);
    return (
        <div>
            <h1>Ohh no</h1>
            <p>Something went wrong while trying to verify your email</p>
            <button onClick={()=> navigate('/register')}>Back to Sign up</button>
        </div>
    );
};

export default EmailVerificationFail;
