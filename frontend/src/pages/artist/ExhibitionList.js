
export const ExhibitionList = ({ exhibition }) => {
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    return (
        <div className="grid grid-row-auto grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  justify-center items-center gap-[80px] my-[50px]">
            {exhibition.map((exhibition) => {
                var startDateTime = new Date(exhibition.startDate);
                const newStartDate = startDateTime.toLocaleDateString(
                    "en-US",
                    dateOptions
                );

                var endDateTime = new Date(exhibition.endDate);
                const newEndDate = endDateTime.toLocaleDateString(
                    "en-US",
                    dateOptions
                );
                return (
                    <div className="relative" data-aos="fade-up">
                        <img
                            src={exhibition.image}
                            className=" mb-[10px] sm:w-[400px] sm:h-[450px] object-cover m-auto"
                            alt="product"
                        />
                        <ul className="flex flex-col text-[14px] gap-[2px] relative px-[10px] py-[10px] font-slab">
                            <li className="font-medium font-cinzel text-[20px] text-center">
                                {exhibition.name}
                            </li>
                            <hr></hr>
                            <li className="font-medium text-center">
                                {exhibition.location}
                            </li>
                            <li className="font-medium text-center">
                                {newStartDate} - {newEndDate}
                            </li>
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};
