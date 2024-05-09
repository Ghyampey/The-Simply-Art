import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EmailVerificationSuccess from "./EmailVerificationSuccess";
import EmailVerificationFail from "./EmailVerificationFail";
import { useToken } from "../../service/useToken";

const EmailVerificationPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();
    const [, setToken] = useToken();

    useEffect(() => {
        const pageTitle = "Verify Your Email | SimplyArt";
        document.title = pageTitle;
    }, []);

    useEffect(() => {
        const loadVerification = async () => {
          
                const response = await axios.put(
                    "http://localhost:5000/api/verify-email",
                    {
                        verificationString,
                    }
                );
                console.log(response);
                const { token } = response.data;
                setToken(token);

                setIsSuccess(true);

                setIsLoading(false);
          
        };
        loadVerification();
    }, [setToken, verificationString]);

    if (isLoading) {
        return <p>Loading ...</p>;
    }
    console.log("after loading");
    if (!isSuccess) {
        return <EmailVerificationFail />;
    }
    return <EmailVerificationSuccess />;
};

export default EmailVerificationPage;
