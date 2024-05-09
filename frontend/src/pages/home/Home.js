import { AboutUs } from "./AboutUs";
import { HomeEvents } from "./HomeEvents";
import { NewProducts } from "./newProducts";
import { FeaturedArtists } from "./FeaturedArtists";
import { Banner2 } from "../../components/Banner2";
import { Services } from "../../components/ServicesGrid";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        document.title = "SimplyArt - Explore Artworks, Events and Artists";
    }, []);

    return (
        <>
            <Banner2 />

            <NewProducts />
            <br />
            <AboutUs />
            <HomeEvents />
            <Services
                heading="For Artists"
                para="Showcase, sell, and connect. Display your portfolio, feature exhibitions, and sell your artwork. Engage with a vibrant artist community and seize exciting opportunities. Join us and elevate your artistry."
                img="https://res.cloudinary.com/djuzpmqlp/image/upload/v1688373594/assets/frankie-cordoba-fPYJeMmYWM4-unsplash_dno2kd.jpg"
                button="Get Started"
            />
            <Services
                heading="For Individuals"
                para="Discover, connect, and be inspired. Browse artist products, explore portfolios, and stay notified about art events. Engage with a vibrant community of fellow art enthusiasts. Join us and unlock the world of art."
                img="https://res.cloudinary.com/djuzpmqlp/image/upload/v1688291397/assets/abbie-bernet-04X58d_hHv8-unsplash_w1mh2i.jpg"
                button="Sign Up"
            />
            <br />
            <FeaturedArtists />
        </>
    );
};

export default Home;
