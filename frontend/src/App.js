import {  useLocation, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Login from "./pages/login/Login";
import AdminLogin from "./pages/login/AdminLogin";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import PrivateRoute from "./service/Auth";
import VerifyEmailPage from "./pages/emailVerification/VerifyEmailPage";
import EmailVerificationPage from "./pages/emailVerification/EmailVerificationLandingPage";
import ForgotPasswordPage from "./pages/passwordReset/ForgotPasswordPage";
import PasswordResetLandingPage from "./pages/passwordReset/PasswordResetLandingPage";
import Store from "./pages/store/Store";
import { ProductDetails } from "./pages/store/ProductDesc";
import ArtistPage from "./pages/artist/ArtistPage";
import Events from "./pages/events/Events";
import ArtistBiography from "./pages/artist/ArtistBiography";
import ArtistPortfolio from "./pages/artist/ArtistPortfolio";
import ArtistExhibition from "./pages/artist/ArtistExhibition";
import CheckoutPage from "./pages/store/Checkout";
import Page404 from "./pages/404page";
import { Cart } from "./pages/store/Cart";
import { OrderSummary } from "./pages/store/OrderSummary";
import UserProfilePage from "./pages/user/UserProfile";
import { ManageOrders } from "./pages/artistDashboard/Order";

import ArtistDashboard from "./pages/artistDashboard/ArtistDashboard";
import SplitScreen from "./components/SplitScreen";
import AddProductPage from "./pages/artistDashboard/AddProductsPage";
import { ArtistSidebar } from "./pages/artistDashboard/ArtistSidebar";
import Biography from "./pages/artistDashboard/Biography";
import FeaturedEvents from "./pages/artistDashboard/FeaturedEvents";
import { ManageProducts } from "./pages/artistDashboard/ManageProducts";
import { ManageEvents } from "./pages/artistDashboard/ManageEvents";
import { PrivateRouteArtist } from "./service/Auth";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddEventPage from "./pages/admin/AddEventpage";
import AdminEventPage from "./pages/admin/AdminEvents";
import UserList from "./pages/admin/UsersList";
import ArtistList from "./pages/admin/ArtistList";
import { AdminSidebar } from "./pages/admin/AdminSidebar";
import { PrivateRouteAdmin } from "./service/Auth";



function App() {
    useEffect(() => {
        Aos.init({ duration: 1500, once: true });
    }, []);

    const location = useLocation();

    // Define an array of paths where Navbar and Footer should not appear
    const excludedPaths = [
        "/login",
        "/register",
        "/admin",
        "/artist-dashboard",
        "/artist-dashboard/edit-product/*",
    ];

    // Check if the current location matches any excluded path

    const shouldHide = excludedPaths.some(
        (path) =>
            typeof location.pathname === "string" &&
            location.pathname.match(path)
    );

    const includedPaths = ["/artist-dashboard/*"];

    // Check if the current location matches any included path
    const shouldDisplayDashboard = includedPaths.some(
        (path) =>
            typeof location.pathname === "string" &&
            location.pathname.match(path)
    );

    const includedPathsAdmin = ["/admin-dashboard/*"];
    const shouldDisplayAdminDashboard = includedPathsAdmin.some(
        (path) =>
            typeof location.pathname === "string" &&
            location.pathname.match(path)
    );

    return (
        <>
            {!shouldHide && <Navbar />}
            <SplitScreen>
                {shouldDisplayDashboard ? <ArtistSidebar /> : shouldDisplayAdminDashboard ? <AdminSidebar /> :<></>}
                
                <Routes>
                  
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin" element={<AdminLogin />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/verify-email"
                                element={<VerifyEmailPage />}
                            />
                            <Route
                                path="/verify-email/:verificationString"
                                element={<EmailVerificationPage />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPasswordPage />}
                            />
                            <Route
                                path="/reset-password/:passwordResetCode"
                                element={<PasswordResetLandingPage />}
                            />
                            <Route path="/store" element={<Store />} />
                            <Route path="/artists" element={<ArtistPage />} />
                            <Route path="/artist-profile">
                                <Route
                                    path="biography/:id"
                                    element={<ArtistBiography />}
                                />
                                <Route
                                    path="portfolio/:id"
                                    element={<ArtistPortfolio />}
                                />
                                <Route
                                    path="exhibition/:id"
                                    element={<ArtistExhibition />}
                                />
                            </Route>
                            <Route path="/events" element={<Events />} />
                            <Route
                                path="/product/:id"
                                element={<ProductDetails />}
                            />
                            <Route
                                path="/cart"
                                element={<PrivateRoute Component={Cart} />}
                            />
                            <Route
                                path="/checkout/:id"
                                element={
                                    <PrivateRoute Component={CheckoutPage} />
                                }
                            />
                            <Route
                                path="/order-summary/:id"
                                element={
                                    <PrivateRoute Component={OrderSummary} />
                                }
                            />
                            <Route
                                path="/user-profile"
                                element={
                                    <PrivateRoute Component={UserProfilePage} />
                                }
                            />
                            <Route
                                path="/orders"
                                element={
                                    <PrivateRoute
                                        Component={ManageOrders}
                                        userType={"user"}
                                    />
                                }
                            />
                          
                        </>
                   
                  
                        <>
                         
                                <Route path="/artist-dashboard">
                                    <Route
                                        index
                                        element={<PrivateRouteArtist Component={ArtistDashboard} />}
                                    />
                                    <Route
                                        path="add-product"
                                        element={<PrivateRouteArtist Component={AddProductPage} />}
                                    />
                                    <Route
                                        path="edit-product/:id"
                                        element={<PrivateRouteArtist Component={AddProductPage} />}
                                    />
                                    <Route
                                        path="manage-products"
                                        element={<PrivateRouteArtist Component={ManageProducts} />}
                                    />
                                    <Route
                                        path="biography"
                                        element={<PrivateRouteArtist Component={Biography} />}
                                    />
                                    <Route
                                        path="add-event"
                                        element={<PrivateRouteArtist Component={FeaturedEvents} />}
                                    />
                                    <Route
                                        path="edit-event/:id"
                                        element={<PrivateRouteArtist Component={FeaturedEvents} />}
                                    />
                                    <Route
                                        path="manage-events"
                                        element={<PrivateRouteArtist Component={ManageEvents} />}
                                    />
                                    <Route
                                        path="orders"
                                        element={
                                            <PrivateRouteArtist  Component={ManageOrders}
                                            userType={"artist"} />
                                        }
                                    />
                                </Route>
                        
                        </>
                    
                  
                        <>
                          
                                <Route path="/admin-dashboard">
                                    <Route index element={<PrivateRouteAdmin Component={AdminDashboard} />} />
                                    <Route
                                        path="add-event"
                                        element={<PrivateRouteAdmin Component={AddEventPage} />}
                                    />
                                    <Route
                                        path="update-event/:id"
                                        element={<PrivateRouteAdmin Component={AddEventPage} />}
                                    />

                                    <Route
                                        path="events"
                                        element={<PrivateRouteAdmin Component={AdminEventPage} />}
                                    />
                                    <Route
                                        path="users"
                                        element={<PrivateRouteAdmin Component={UserList} />}
                                    />
                                    <Route
                                        path="artists"
                                        element={<PrivateRouteAdmin Component={ArtistList} />}
                                    />
                                  
                                </Route>
                          
                        </>
                  
                      <Route path="/*" element={<Page404 />} />
                      <Route path="/access-denied" element={<Page404 error={"notAuthorized"}/>} />
                </Routes>
            </SplitScreen>
            {!shouldHide && <Footer />}
        </>
    );
}

export default App;
