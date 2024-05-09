import { useState, useEffect } from "react";
import axios from "axios";
import { Heading2 } from "../../components/Heading";
import { ArtistList } from "../artist/ArtistList";
import { BlackButton, BrownButton } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { ViewAllButton } from "../../components/Button";
import { fetchAllEvents } from "../../redux-store/eventSlice";
import { Loader } from "../../components/LoaderWrapper";

import { Carousel } from "../../components/Carousel";

export const HomeEvents = () => {
    const event = useSelector((state) => state.event);

    const dispatch = useDispatch();

    const { fetchStatus, data } = event;

    const today = new Date();
    const dateToday = today.toDateString();

    const getEvents = async () => {
        dispatch(fetchAllEvents());
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="px-[0px] mt-[30px] text-center">
            <Heading2>Exhibitions</Heading2>
            <br></br>
            <ViewAllButton border="black" link="/artists" align="center">
                View All
            </ViewAllButton>
            <br></br>
            <br></br>
            <div className="w-[500px] text-center m-auto">
                {/* <hr className="h-[2.5px] bg-black my-[20px]" /> */}
            </div>
            {fetchStatus !== "success" ? (
                <Loader />
            ) : (
                <Carousel events={data.event} />
            )}
        </div>
    );
};
