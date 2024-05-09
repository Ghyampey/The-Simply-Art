export const Event = ({ events, date,type }) => {
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };

    var startDateTime = new Date(events.startDate);
    const newStartDate = startDateTime.toLocaleDateString("en-US", dateOptions);

    var endDateTime = new Date(events.endDate);
    const newEndDate = endDateTime.toLocaleDateString("en-US", dateOptions);

    const today = new Date();
    var datebool;
    if (date === "ongoing") {
        datebool = startDateTime < today;
    }
    if (date === "upcomming") {
        datebool = startDateTime > today;
    }
    return (
        <div className={`mx-5 font-playfair ${type==="carousel" ? "mb-5" :""}`}>
            <div className="flex justify-center w-[80%] sm:w-full m-auto  ">
                <img
                    src={events.url}
                    alt="events"
                    className=" h-[auto] max-h-[300px] sm:max-h-[none] w-[80%] sm:h-[500px] sm:w-full  object-cover"
                />
            </div>
            <div className=" text-[14px] sm:text-[16px] w-[500px] m-auto mt-5 text-[#3C3737] ">
                <h3 className=" text-[23px] sm:text-[30px] font-cinzel mb-1 ">{events.name}</h3>

                <span className="flex justify-center gap-2 ">
                    <p className="whitespace-pre">
                        {newStartDate} - {newEndDate}
                    </p>
                </span>
                <hr className="h-[1px]  my-[5px]"></hr>
                <span className="flex justify-center gap-2 ">
                    <p>{events.location}</p>
                </span>
                <span className="flex justify-center gap-2  mb-5">
                    <p>{events.place}</p>
                </span>
            </div>
           
        </div>
    );
};
