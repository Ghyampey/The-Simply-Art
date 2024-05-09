import { useState, useEffect } from "react";
import axios from "axios";
import { Heading2, ModalHeading } from "../../components/Heading";
import { ModalPara } from "../../components/Paragraph";
import { useNavigate } from "react-router-dom";
import { ViewButton, EditButton, DeleteButton } from "../../components/Button";
import { Modal, LargeModal } from "../../components/Modal";
import { useUser } from "../../service/useUser";
import { DashboardHeading } from "../../components/Heading";
import { SuccessToast } from "../../helpers/Toast";

export const ManageEvents = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const [viewEvents, setViewEvents] = useState();
    const navigate = useNavigate();

    const user = useUser();

    const getExhibitions = async () => {
        const exhibitionsData = await axios.get(
            `http://localhost:5000/api/artist-exhibitions/${user.id}`
        );

        const data = await exhibitionsData.data.exhibitions;
        setExhibitions(data);
        console.log("getEvents", data);
    };

    const deleteExhibition = async (id) => {
        const deleteData = await axios.delete(
            `http://localhost:5000/api/artist-exhibitions/${id}`
        );
        SuccessToast("Event has been deleted.");
        getExhibitions();
    };

    const updateEvent = (id) => {
        navigate(`/artist-dashboard/edit-event/${id}`);
    };

    useEffect(() => {
        getExhibitions();
        document.title = "Manage Exhibitions | Artist Dashboard"; 

    }, []);

    const dateOptions = { day: "numeric", month: "long", year: "numeric" };

    return (
        <div className="flex flex-col gap-[40px] h-[100%] ">
            <Heading2>Featured Events</Heading2>
            <div className="flex flex-col gap-[20px] h-[90%] py-[30px] px-[20px]">
                <div className="overflow-hidden">
                    <table className=" w-[100%] text-[#252733]">
                        <thead className="text-left top-0">
                            <tr className="text-[#A4A6B3] mx-[0px] my-[0px]">
                                <th className="font-extralight">SN</th>
                                <th className="font-extralight">Exhibition</th>
                                <th className="font-extralight">Location</th>
                                <th className="font-extralight">Start Date</th>
                                <th className="font-extralight">End Date</th>
                                <th className="font-extralight">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-scroll">
                            {exhibitions.map((exhibition, index) => {
                                var startDateTime = new Date(
                                    exhibition.startDate
                                );
                                const newStartDate =
                                    startDateTime.toLocaleDateString(
                                        "en-US",
                                        dateOptions
                                    );

                                var endDateTime = new Date(exhibition.endDate);
                                const newEndDate =
                                    endDateTime.toLocaleDateString(
                                        "en-US",
                                        dateOptions
                                    );
                                return (
                                    <tr className="border-b divide-slate-400/25 h-[60px] first:border-t">
                                        <td>{index + 1}</td>
                                        <td>{exhibition.name}</td>
                                        <td>{exhibition.location}</td>
                                        <td>{newStartDate}</td>
                                        <td>{newEndDate}</td>
                                        <td className="">
                                            <EditButton
                                                onClick={() =>
                                                    updateEvent(exhibition._id)
                                                }
                                            />

                                            <Modal
                                                onClick={() =>
                                                    deleteExhibition(
                                                        exhibition._id
                                                    )
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
