import { useNavigate } from "react-router-dom";
import { ViewAllButton } from "./Button";

export const Artist = ({ artist, type }) => {
    const navigate = useNavigate();

    const getArtist = async (id) => {
        navigate(`/artist-profile/biography/${id}`);
    };
    return (
        <div
            className={`relative cursor-pointer 
        ${type === "carousel" ? "mx-5 w-[100%] sm:w-[450px]" : ""} `}
            onClick={() => getArtist(artist._id)}
            data-aos={type !== "carousel" ? "fade-up" : null}
        >
            <img
                src={artist.profilePhoto}
                className={` mb-[10px] w-[100%]  sm:h-[450px] object-cover m-auto rounded-md ${type==="carousel" ? "h-[350px]" :"h-[50vw]"} `}
                alt="product"
            />
            <ul className="flex flex-col gap-[2px] relative px-[10px] py-[10px] font-montserrat">
                <li className={` sm:text-[30px] font-cinzel flex  gap-4  mb-2 text-[#3C3737] ${type==="carousel" ? "text-[25px]" :"text-[18px]"} `}>
                    
                    {artist.name}
                </li>
                {type === "carousel" && (
                    <>
                        <li>
                            <div
                                className="mb-4  text-[#3C3737] text-[14px] text-justify myHtmlStyles"
                                dangerouslySetInnerHTML={{
                                    __html: artist.aboutArtist,
                                }}
                            />
                        </li>
                        <li>
                            <ViewAllButton
                                border="black"
                                link={`/artist-profile/biography/${artist._id}`}
                                align="left"
                            >
                                View Artist
                            </ViewAllButton>{" "}
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};
