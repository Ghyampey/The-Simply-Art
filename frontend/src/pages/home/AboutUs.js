import { Heading } from "../../components/Heading";

export const AboutUs = () => {
    return (
        <div className="h-[75%] py-9  border-black border-b-[1px] border-t-[1px] text-center text-[#4d4d57] flex flex-col items-center justify-center">
            <h2 className="font-playfair text-[16px] lg:text-[25px] xl:text-[27px] ">About Us</h2>
            <p className="font-playfair text-[20px] sm:text-[25px] md:text-[30px] lg:text-[42px] xl:text-[55px] md:w-[75vw] px-5 m-auto">
                Our gallery features original works by{" "}
                <span className="font-libre border-black border-b">
                    {" "}
                    CONTEMPORARY ARTISTS,
                </span>{" "}
                transforming your spaces with beauty and inspiration. Explore{" "}
                <span className="font-libre border-black border-b">
                    {" "}
                    CAPTIVATING EXHIBITIONS
                </span>{" "}
                and find the perfect piece in our{" "}
                <span className="font-libre border-black border-b">
                    {" "}
                    ART STORE
                </span>
                .
            </p>
        </div>
    );
};
