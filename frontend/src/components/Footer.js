import FooterList from "./FooterList";

export const Footer = () => {
    const about = [
        { itemName: "JOIN US", link: "/" },
        { itemName: "SIGN UP", link: "/register" },
        { itemName: "SIGN UP AS AN ARTIST", link: "/register" },
    ];
    const events = [
        { itemName: "EVENTS", link: "/" },
        { itemName: "ONGOING EVENTS", link: "/events" },
        { itemName: "UPCOMMING EVENTS", link: "/events" },
    ];
    const shop = [
        { itemName: "SHOP", link: "/" },
        { itemName: "BROWSE STORE", link: "/events" },
        { itemName: "SELL YOUR ART", link: "/register" },
    ];

    const artists = [
        { itemName: "SHOP", link: "/" },
        { itemName: "BROWSE ARTISTS", link: "/artists" },
        { itemName: "SIGN UP AS AN ARTIST", link: "/register" },
    ];
    return (
        <footer className="flex flex-col py-[30px] shadow-inner font-slab">
            <div className="grid grid-rows-2 grid-cols-2 gap-6 sm:grid-cols-4 px-[50px] items-center sm:justify-items-center ">
                <FooterList items={about} />
                <FooterList items={events} />
                <FooterList items={shop} />
                <FooterList items={artists} />
            </div>
            <p className="text-[12px] mt-7 sm:mt-0 font-medium text-center">
                @SimplyArt, All rights reserved.
            </p>
        </footer>
    );
};
