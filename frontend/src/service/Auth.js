import { Redirect, Route } from "react-router-dom";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./useUser";
import Login from "../pages/login/Login";
import Page404 from "../pages/404page";

const PrivateRoutes = (props) => {
    const { component } = props;
    const user = null;
    if (!user) return redirect("/login");
    return <Route {...props} />;
};

const PrivateRoute = (props) => {
    const { Component,userType } = props;
    const navigate = useNavigate();
    const user = useUser();
    useEffect(() => {
        if (user == null) {
            navigate("/login");
        }
    }, []);
    if(userType){
        return <Component userType={userType}/>
    }
    return <Component />;
};

export const PrivateRouteArtist = (props) => {
    const { Component,userType } = props;
    const navigate = useNavigate();
    const user = useUser();
    useEffect(() => {
        if (user == null) {
            navigate("/access-denied");
        }
    }, []);
    if(user.role==="artist" && userType){
        return <Component userType={userType}/>
    }
    return <Component />;
};


export const PrivateRouteAdmin = (props) => {
    const { Component } = props;
    const navigate = useNavigate();
    const user = useUser();
    useEffect(() => {
        if (user?.role !== "admin") {
            navigate("/access-denied");
        }
    }, []);

    return <Component />;
};

export default PrivateRoute;
