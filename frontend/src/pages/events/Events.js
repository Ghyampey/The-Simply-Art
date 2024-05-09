import { useEffect } from "react";
import { Heading1,Heading2 } from "../../components/Heading";
import { EventList } from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../../redux-store/eventSlice";
import { Loader } from "../../components/LoaderWrapper";
const Events = () => {
    useEffect(() => {
        document.title = 'Featured Events | Ongoing and Upcomming Events'; 
      }, []);
    const dispatch = useDispatch();

    const event = useSelector((state) => state.event);

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
     
            <div className=" py-[30px] px-6">
                <div className="max-w-[1400px] m-auto">
                    <Heading1 color="black">Exhibitions</Heading1>
                    <div className="flex gap-5 mt-10 items-center ">
                        <h3 className="text-[#3C3737] text-[18px] font-slab">
                            Current
                        </h3>
                        <hr className="  my-[20px] w-[100%] m-auto"></hr>
                    </div>
                    {fetchStatus !== "success" ? (
                       <Loader/>
                       
                    ) : (
                        <EventList events={data.event} date="ongoing" />
                    )}

                    <div className="flex gap-5 mt-10 items-center ">
                        <h3 className="text-[#3C3737] text-[18px] font-slab">
                            Upcomming
                        </h3>
                        <hr className="  my-[20px] w-[100%] m-auto"></hr>
                    </div>
                    {fetchStatus !== "success" ? (
                      <Loader/>
                    ) : (
                        <EventList events={data.event} date="upcomming" />
                    )}
                </div>
            </div>
      
    );
};

export default Events;
