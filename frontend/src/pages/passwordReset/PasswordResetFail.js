import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PasswordResetFail = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const pageTitle = "Reset Password | SimplyArt";
        document.title = pageTitle;
    }, []);

    return (
        <div>
            <h1>Ohh no</h1>
            <p>Something went wrong while trying to reset your paassword.</p>
            <button onClick={() => navigate("/login")}>
                Back to login page
            </button>
        </div>
    );
};

export default PasswordResetFail;
