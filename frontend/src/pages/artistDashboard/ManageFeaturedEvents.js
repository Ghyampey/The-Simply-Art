import { useState, useEffect } from "react";
import axios from "axios";
import {
    AdminHeading,
    AdminHeading2,
    ModalHeading,
} from "../../components/Heading";
import { ModalPara } from "../../components/Paragraph";
import { useNavigate } from "react-router-dom";
import { ViewButton, EditButton, DeleteButton } from "../../components/Button";
import { Modal, LargeModal } from "../../components/Modal";
import ViewEvents from "./ViewEvent";

export const ArtistEvent = () => {
    const [events, setEvents] = useState([]);
    const [viewEvents, setViewEvents] = useState([]);
    const navigate = useNavigate();

    const getEvents = async () => {
        const productsData = await axios.get(
            `http://localhost:5000/api/events`
        );

        const data = await productsData.data.event;
        setEvents(data);
        console.log("getEvents", data);
    };

    const viewEvent = async (id) => {
        const viewData = await axios.get(
            `http://localhost:5000/api/events/${id}`
        );
        console.log("view event", viewData.data.event);
        setViewEvents(viewData.data.event);
    };

    const deleteEvent = async (id) => {
        const deleteData = await axios.delete(
            `http://localhost:5000/api/events/${id}`
        );
        getEvents();
       
    };

    useEffect(() => {
        getEvents();
    }, []);

    const dateOptions = { day: "numeric", month: "long", year: "numeric" };

    return (
        <div className="flex flex-col gap-[40px] h-[100%] ">
            <AdminHeading> Events</AdminHeading>
            <div className="flex flex-col gap-[20px] border rounded-[10px] h-[90%] py-[30px] px-[20px] bg-white">
                <AdminHeading2> All Events </AdminHeading2>
                <div className="overflow-scroll">
                    <table className=" w-[100%] text-[#252733]">
                        <thead className="text-left top-0">
                            <tr className="text-[#A4A6B3] mx-[0px] my-[0px]">
                                <th className="font-extralight">SN</th>
                                <th className="font-extralight">Event Name</th>
                                <th className="font-extralight">Place</th>
                                <th className="font-extralight">Start Date</th>
                                <th className="font-extralight">End Date</th>
                                <th className="font-extralight">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-scroll">
                            {events.map((events, index) => {
                                var startDateTime = new Date(events.startDate);
                                const newStartDate =
                                    startDateTime.toLocaleDateString(
                                        "en-US",
                                        dateOptions
                                    );

                                var endDateTime = new Date(events.endDate);
                                const newEndDate =
                                    endDateTime.toLocaleDateString(
                                        "en-US",
                                        dateOptions
                                    );
                                return (
                                    <tr className="border-b divide-slate-400/25 h-[60px] first:border-t">
                                        <td>{index + 1}</td>
                                        <td>{events.name}</td>
                                        <td>{events.place}</td>
                                        <td>{newStartDate}</td>
                                        <td>{newEndDate}</td>
                                        <td className="">
                                            <LargeModal
                                                onClick={() =>
                                                    viewEvent(events._id)
                                                }
                                            >
                                                <ViewEvents
                                                    events={viewEvents}
                                                />
                                            </LargeModal>
                                            <EditButton />

                                            <Modal
                                                onClick={() =>
                                                    deleteEvent(events._id)
                                                   
                                                }
                                            >
                                                <ModalHeading>
                                                    Confirm Delete?
                                                </ModalHeading>
                                                <ModalPara>
                                                    Are you sure you want to
                                                    delete the following event?
                                                </ModalPara>
                                            </Modal>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
