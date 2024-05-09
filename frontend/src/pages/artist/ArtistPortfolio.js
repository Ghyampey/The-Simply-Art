import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductList } from "../store/ProductList";
import { ArtistNavbar } from "../../components/ArtistNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistProduct } from "../../redux-store/artistProductSlice";
import { fetchArtistBio } from "../../redux-store/artistBioSlice";
import { Loader } from "../../components/LoaderWrapper";

const ArtistPortfolio = () => {
    const dispatch = useDispatch();

    const artistProduct = useSelector((state) => state.artistProduct);

    const artistBio = useSelector((state) => state.artistBio);

    const { fetchStatus: bioStatus, data: bioData } = artistBio;

    const { fetchStatus, data } = artistProduct;

    const { id } = useParams();

    const links = [
        { itemName: "BIOGRAPHY", link: `/artist-profile/biography/${id}` },
        { itemName: "PORTFOLIO", link: `/artist-profile/portfolio/${id}` },
        { itemName: "EXHIBITION", link: `/artist-profile/exhibition/${id}` },
    ];

    useEffect(() => {
        dispatch(fetchArtistBio({ id }));  
    }, [dispatch,id]);

    

    useEffect(() => {
        const name = bioData?.artist?.name;
        const pageTitle = name + " - Artist Works | SimplyArt";
        document.title = pageTitle;
        dispatch(fetchArtistProduct({ name }));
    }, [dispatch, bioData]);

    return (
        <div className=" max-w-[1340px] m-auto px-6">
            <div className="flex flex-col-reverse md:flex-col mt-6">
                <h2
                    className=" text-[26px] px-5 font-cinzel mt-6 md:mt-11 text-[#3C3737]"
                    data-aos="fade-down"
                >
                    Featured Works
                </h2>
                <ArtistNavbar id={id} links={links} />
            </div>
            { bioStatus === "success" && fetchStatus === "success" ?(
                <ProductList
                products={data?.product}
                gridSize={1}
                type={"gallery"}
            />
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ArtistPortfolio;
