export const EventList = ({ events, date }) => {
    // const [formattedStartDate,setStartDate] = useState();
    // const [formattedEndDate,setEndDate] = useState();
    // const [formattedStartTime,setStartTime] = useState();
    // const [formattedEndTime,setEndTime] = useState();

    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    return (
        <div className="my-[50px]">
           
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
                               
                                    <div className="grid grid-rows-1 xl:grid-cols-2 sm:grid-cols-1 xl:gap-[80px] gap-8 justify-center items-center font-slab mb-[70px] "  data-aos="fade-up">
                                        <div className="flex justify-center">
                                            <img
                                                src={events.url}
                                                alt="events"
                                                className=" aspect-w-16 aspect-h-9 md:aspect-w-9 md:aspect-h-16"
                                            />
                                        </div>
                                        <div className="text-[20px] sm:w-[500px] m-auto  text-[#3C3737] ">
                                            <h3 className=" text-[23px] md:text-[34px] font-cinzel md:mb-5 ">
                                                {events.name}
                                            </h3>
                                          
                                            <span className="flex gap-2 text-[14px] md:text-[16px]">
                                                <p className="whitespace-pre">
                                                    {newStartDate} -{" "}
                                                    {newEndDate}
                                                </p>
                                            </span>
                                            <hr className="h-[1px] bg-[#0a0a0a] my-[15px]"></hr>
                                            <span className="flex gap-2 text-[14px] md:text-[16px]">
                                                
                                                <p>{events.location}</p>
                                            </span>
                                            <span className="flex gap-2 text-[14px] md:text-[16px] mb-5">
                                                
                                                <p>{events.place}</p>
                                            </span>
                                            <p className="text-[12px] md:text-[14px]">
                                                Pangolin London are delighted to
                                                present a major exhibition of
                                                Royal Academician Nigel Hall’s
                                                drawings and wall-reliefs which
                                                will take place on the B-1
                                                public gallery of Kings Place.
                                                Spanning the past six decades
                                                this impressive exhibition
                                                explores the integral role
                                                drawing plays in Hall’s making
                                                process. 
                                            </p>
                                        </div>
                                    </div>
                               
                            ) : (
                                ""
                            )}
                        </>
                    );
                })}
           
        </div>
    );
};
