import { useState,useEffect } from "react";

const ViewEvents = ({ events, date }) => {
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    var startDateTime = new Date(events.startDate);
    const newStartDate = startDateTime.toLocaleDateString("en-US", dateOptions);

    var endDateTime = new Date(events.endDate);
    const newEndDate = endDateTime.toLocaleDateString("en-US", dateOptions);
    useEffect(()=>{
        document.title = "View Events | Admin Dashboard"; 

    },[])
    return (
        <div className="my-[50px]">
            <div className="grid grid-rows-1 grid-cols-2 gap-[0px] justify-center items-center font-slab">
                <div className="text-[18px] w-[80%]">
                    <h3 className="text-[35px]">{events.name}</h3>
                    <hr className="h-[2px] bg-black mb-3"></hr>
                    <span className="flex gap-2">
                        <p>At:</p> <p>{events.place}</p>
                    </span>
                    <span className="flex gap-2">
                        <p>Location:</p> <p>{events.location}</p>
                    </span>

                    <span className="flex gap-2">
                        <p>Date:</p>{" "}
                        <p className="whitespace-pre">
                            {newStartDate} to{"  "}
                            {newEndDate}
                        </p>
                    </span>
                    <span className="flex gap-2">
                        <p>Time:</p>
                        <p className="whitespace-pre">
                            {events.startTime} - {events.endTime}
                        </p>
                    </span>
                </div>
                <div className="flex justify-center">
                    <img
                        src={events.url}
                        alt="events"
                        className=" h-[400px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewEvents;
