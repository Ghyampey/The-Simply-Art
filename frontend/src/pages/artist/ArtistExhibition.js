import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ExhibitionList } from "./ExhibitionList";
import { ArtistNavbar } from "../../components/ArtistNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchExhibition } from "../../redux-store/exhibitionSlice";
import { Loader } from "../../components/LoaderWrapper";

const ArtistExhibition = () => {
    const { id } = useParams();

    const links = [
        { itemName: "BIOGRAPHY", link: `/artist-profile/biography/${id}` },
        { itemName: "PORTFOLIO", link: `/artist-profile/portfolio/${id}` },
        { itemName: "EXHIBITION", link: `/artist-profile/exhibition/${id}` },
    ];

    const dispatch = useDispatch();

    const exhibition = useSelector((state) => state.exhibition);

    const { fetchStatus, data } = exhibition;

    useEffect(() => {
        dispatch(fetchExhibition({ id }));
        const pageTitle = "Featured Artist Exhibition | SimplyArt";
        document.title = pageTitle;
    }, []);

    return (
        <div className=" max-w-[1340px] m-auto px-5">
            <div className="flex flex-col-reverse md:flex-col mt-6">
                <h2
                    className=" text-[26px] px-5 font-cinzel mt-6 md:mt-11 text-[#3C3737]"
                    data-aos="fade-down"
                >
                    Featured Exibitions
                </h2>
                <ArtistNavbar id={id} links={links} />
            </div>
           
            {fetchStatus !== "success" ? (
                <Loader />
            ) : (
                <ExhibitionList exhibition={data.exhibitions} />
            )}
        </div>
    );
};

export default ArtistExhibition;
