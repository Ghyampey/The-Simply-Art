import { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

export const EventsList = ({ events, date }) => {
    // const [formattedStartDate,setStartDate] = useState();
    // const [formattedEndDate,setEndDate] = useState();
    // const [formattedStartTime,setStartTime] = useState();
    // const [formattedEndTime,setEndTime] = useState();
    const options = {
        type: "loop",
        perPage: 1,
        perMove: 1,
        gap: "1rem",
        autoplay: false,
        pauseOnHover: false,
        pagination: true,
        arrows: false,
    };
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    return (
        <div className="my-[50px]">
            <Splide options={options}>
                {events.map((events) => {
                    var startDateTime = new Date(events.startDate);
                    const newStartDate = startDateTime.toLocaleDateString(
                        "en-US",
                        dateOptions
                    );

                    var endDateTime = new Date(events.endDate);
                    const newEndDate = endDateTime.toLocaleDateString(
                        "en-US",
                        dateOptions
                    );

                    const today = new Date();
                    var datebool;
                    if (date === "ongoing") {
                        datebool = startDateTime < today;
                    }
                    if (date === "upcomming") {
                        datebool = startDateTime > today;
                    }
                    return (
                        <>
                            {" "}
                            {datebool ? (
                                <SplideSlide key={newStartDate}>
                                    <div className="grid grid-rows-1 grid-cols-2 gap-[0px] justify-center items-center">
                                        <div className="text-[20px] w-[500px] ml-auto mr-0">
                                            <h3 className="text-[34px]">
                                                {events.name}
                                            </h3>
                                            <hr className="h-[2px] bg-black my-[15px]"></hr>
                                            <span className="flex gap-2">
                                                <p className="font-medium">At:</p> <p>{events.place}</p>
                                            </span>
                                            <span className="flex gap-2">
                                                <p className="font-medium">Location:</p>{" "}
                                                <p>{events.location}</p>
                                            </span>

                                            <span className="flex gap-2">
                                                <p className="font-medium">Date:</p>{" "}
                                                <p className="whitespace-pre">
                                                    {newStartDate} to{"  "}
                                                    {newEndDate}
                                                </p>
                                            </span>
                                            <span className="flex gap-2">
                                                <p className="font-medium">Time:</p>
                                                <p className="whitespace-pre">
                                                    {events.startTime} -{" "}
                                                    {events.endTime}
                                                </p>
                                            </span>
                                            <p> </p>
                                        </div>
                                        <div className="flex justify-center">
                                            <img
                                                src={events.url}
                                                alt="events"
                                                className="w-[430px] h-[600px]"
                                            />
                                        </div>
                                    </div>
                                </SplideSlide>
                            ) : (
                                ""
                            )}
                        </>
                    );
                })}
            </Splide>
        </div>
    );
};
