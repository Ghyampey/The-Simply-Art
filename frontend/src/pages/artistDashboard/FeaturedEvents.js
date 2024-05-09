import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/Input";
import { Label } from "../../components/Label";
import { UpdateButton } from "../../components/Button";
import { useUser } from "../../service/useUser";
import { useParams } from "react-router-dom";
import {
    addExhibition,
    updateExhibition,
    getSingleExhibition,
} from "../../helpers/Exhibition";
import { PromiseToast, SuccessToast } from "../../helpers/Toast";
import { DashboardHeading, Heading2 } from "../../components/Heading";

const FeaturedEvents = () => {
    const user = useUser();

    const { id } = useParams();

    const [eventToEdit, setEventToUpdate] = useState();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();
    watch("image");

    useEffect(() => {
        const fetchData = async () => {
            const event = await getSingleExhibition(id);
            setEventToUpdate(event);
        };
        fetchData();
    }, [id]);

    const ExhibitionAction = async (data) => {
        if (id) {
            PromiseToast(
                "Event has been updated.",
                updateExhibition(data, user.id, eventToEdit._id)
            );
        } else {
            PromiseToast("Event has been Added.", addExhibition(data, user.id));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-[20px]">
            <Heading2>  {eventToEdit ? "Update Event Details" : "Add Featured Events"}</Heading2>
            <form
                className="flex flex-col gap-[20px] my-[20px]"
                onSubmit={handleSubmit(ExhibitionAction)}
            >
                <div className="grid grid-rows-1 grid-cols-1 gap-[30px] font-slab">
                    <div className="flex flex-col gap-[20px]">
                        <Label>Event Name</Label>
                        <Input
                            type="text"
                            placeholder="Name"
                            defaultValue={eventToEdit?.name}
                            register={{
                                ...register("name", {
                                    required: "Please enter your name.",
                                }),
                            }}
                        />
                        <p>{errors.name?.message}</p>
                        <Label>Image</Label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Please enter an image.",
                            })}
                        />
                        <p>{errors.image?.message}</p>
                        <label>Start Date</label>
                        <Input
                            type="date"
                            value={eventToEdit?.startDate}
                            register={{
                                ...register("startDate", {
                                    required: "Please enter your password.",
                                }),
                            }}
                        />
                        <p>{errors.startDate?.message}</p>
                        <label>End Date</label>
                        <Input
                            type="date"
                            defaultValue={eventToEdit?.endDate}
                            register={{
                                ...register("endDate", {
                                    required: "Please enter your password.",
                                }),
                            }}
                        />
                        <p>{errors.endDate?.message}</p>
                        <p>{errors.name?.message}</p>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            placeholder="Location"
                            defaultValue={eventToEdit?.location}
                            register={{
                                ...register("location", {
                                    required: "Please enter the location.",
                                }),
                            }}
                        />
                        <p>{errors.location?.message}</p>
                    </div>
                </div>

                <UpdateButton>
                    {eventToEdit ? "Update Event" : "Add Event"}
                </UpdateButton>
            </form>
        </div>
    );
};

export default FeaturedEvents;
