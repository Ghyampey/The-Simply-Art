import { useEffect } from "react";
import { ArtistList } from "./ArtistList";
import { useForm } from "react-hook-form";
import {  Heading1 } from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArtists } from "../../redux-store/artistSlice";
import { Loader } from "../../components/LoaderWrapper";

const ArtistPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Featured Artist'; 
      }, []);

    const { artist } = useSelector((state) => state);

    const { data, fetchStatus } = artist;

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm();

    const getArtists = async () => {
        

        dispatch(
            fetchAllArtists({ page: "", limit: "" })
        );
    };

    useEffect(() => {
        getArtists();
    }, []);


    return (
        <div className="max-w-[1800px] m-auto px-[5%] sm:px-[10%]">
            <div
                className="md:my-7 my-3"
                
            >
                <Heading1 color="black">Artists</Heading1>
              
            
            </div>

            <div className="flex flex-col justify-center max-w-[1440px] m-auto mt-3 md:mt-6 sm:mt-0">
                <hr className="bg-[#65635F] mb-3 md:mb-7" />
                {fetchStatus !== "success" ? (
                    <Loader />
                ) : data.artist.length > 0 ? (
                    <>
                        <ArtistList artists={data.artist} />
                        <ArtistList artists={data.artist} />
                        <ArtistList artists={data.artist} />
                        <ArtistList artists={data.artist} />
                    </>
                ) : (
                    <div className=" h-[50vh] flex items-center justify-center">
                    <Heading1> Artist Not Found.</Heading1>
                </div>
                )}
            </div>
        </div>
    );
};

export default ArtistPage;
