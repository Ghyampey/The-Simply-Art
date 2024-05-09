import { WhiteButton, ViewAllButton } from "./Button";
export const Banner2 = () => {
    return (
        <div className="font-playfair text-[#fefefe] h-[55vh] lg:h-[90vh] w-[100%] flex justify-center items-center mb-9 bg-cover bg-center bg-[url('https://res.cloudinary.com/djuzpmqlp/image/upload/v1688291407/assets/dannie-jing-3GZlhROZIQg-unsplash_zeyvsp.jpg')]">
 
            <div className=" absolute lg:bottom-[7%] bottom-[38%]  text-center w-[80%]  lg:w-[60%] m-auto bg-opacity-50" data-aos="fade-up">
                <p className=" text-[40px] lg:text-[55px] border-b-2">
                    Art that inspires
                </p>

                <p className=" text-[16px] lg:text-[25px] mb-4">
                    Our website features artworks from some of the most talented
                    artists around the world. These artworks are sure to inspire
                    you and bring beauty into your life.
                </p>
                <div className="flex gap-12 justify-center" >
                    <ViewAllButton link="/store">Browse Artwork</ViewAllButton>
                    <ViewAllButton link="/artists">View Artists</ViewAllButton>
                    <ViewAllButton link="/events">Explore Events</ViewAllButton>
                </div>
            </div>
        </div>
    );
};
