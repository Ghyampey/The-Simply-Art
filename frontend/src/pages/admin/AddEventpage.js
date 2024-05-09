import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/Input";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { SuccessToast, PromiseToast } from "../../helpers/Toast";
import { DashboardActionButton } from "../../components/Button";
import { Heading2 } from "../../components/Heading";
import { addEvents, updateEvents,fetchEvent } from "../../redux-store/eventSlice";
import { useDispatch, useSelector } from "react-redux";

const AddEventPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    watch("image");

    const { id } = useParams();

    const dispatch = useDispatch();

    const event = useSelector((state) => state.event);
    const { eventUpdateID,eventData,getStatus } = event   

    useEffect(() => {
        dispatch(fetchEvent({id}))
        document.title = "Events | Admin Dashboard";   
    }, []);

    const EventAction = (data) => {
        if (id) {
            PromiseToast(
                "Event has been updated.",
                dispatch(updateEvents({ data, id:eventUpdateID }))
            );
            console.log(eventUpdateID, "updatei");
        } else {
            PromiseToast(
                "Event has been added.",
                dispatch(addEvents({ data }))
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-[20px] font-slab">
            <Heading2> {eventData ? "Update Event" : "Add Event"}</Heading2>
            {getStatus === "success" ?
            <form
                className="flex flex-col gap-[20px] my-[20px]"
                onSubmit={handleSubmit(EventAction)}
            >
                <div className="grid grid-rows-1 grid-cols-2 gap-[30px]">
                    <div className="flex flex-col gap-[20px]">
                        <label>Event Name</label>
                        <Input
                            type="text"
                            placeholder="Name"
                            defaultValue={eventData.event?.name}
                            register={{
                                ...register("name", {
                                    required: "Please enter the event name.",
                                }),
                            }}
                        />
                        <p>{errors.name?.message}</p>
                        <label>Place</label>
                        <Input
                            type="text"
                            placeholder="Place"
                            defaultValue={eventData.event?.place}
                            register={{
                                ...register("place", {
                                    required: "Please enter the event venue.",
                                }),
                            }}
                        />
                        <p>{errors.place?.message}</p>
                        <label>Location</label>
                        <Input
                            type="text"
                            placeholder="Location"
                            defaultValue={eventData.event?.location}
                            register={{
                                ...register("location", {
                                    required: "Please enter event location.",
                                }),
                            }}
                        />
                        <p>{errors.location?.message}</p>
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Please enter an image.",
                            })}
                        />
                        <p>{errors.image?.message}</p>
                    </div>
                    <div className="flex flex-col  gap-[20px]">
                        <label>Start Date</label>
                        <Input
                            type="date"
                            defaultValue={eventData.event?.startDate}
                            register={{
                                ...register("startDate", {
                                    required: "Please enter the start date.",
                                }),
                            }}
                        />
                        <p>{errors.startDate?.message}</p>
                        <label>End Date</label>
                        <Input
                            type="date"
                            defaultValue={eventData.event?.endDate}
                            register={{
                                ...register("endDate", {
                                    required: "Please enter the end date.",
                                }),
                            }}
                        />
                        <p>{errors.endDate?.message}</p>
                        <label>Start Time</label>
                        <Input
                            type="time"
                            defaultValue={eventData.event?.startTime}
                            register={{
                                ...register("startTime", {
                                    required: "Please enter the start time.",
                                }),
                            }}
                        />
                        <p>{errors.startTime?.message}</p>
                        <label>End Time</label>
                        <Input
                            type="time"
                            defaultValue={eventData.event?.endTime}
                            register={{
                                ...register("endTime", {
                                    required: "Please enter the end time.",
                                }),
                            }}
                        />
                        <p>{errors.endTime?.message}</p>
                    </div>
                </div>

                <DashboardActionButton>
                    {eventData ? "Update Event" : "Add Event"}
                </DashboardActionButton>
            </form>
            :""}
        </div>
    );
};

export default AddEventPage;
