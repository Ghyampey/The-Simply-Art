import axios from "axios";

export const getSingleExhibition = async (id) => {
    const viewData = await axios.get(
        `http://localhost:5000/api/exhibitions/${id}`
    );
    console.log("view event", viewData.data.exhibition);
    return viewData.data.exhibition;
};

export const addExhibition = async (data, userID) => {
    console.log("1");

    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("location", data.location);
    formData.append("name", data.name);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);

    formData.append("image", data.image[0]);

    console.log(data.name, data.startDate, data.endDate);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/add-artist-event",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log(response.data);
        // const { token } = response.data;
        // console.log(token);
    } catch (err) {
        console.log(`err:${err}`);
    }
};

export const updateExhibition = async (data, userID, id) => {
    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("location", data.location);
    formData.append("name", data.name);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);

    formData.append("image", data.image[0]);

    console.log(data.name, data.startDate, data.endDate);

    try {
        console.log(data.name);
        const response = await axios.patch(
            `http://localhost:5000/api/update-artist-event/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("updated data", response.data);

        //
    } catch (err) {
        console.log(`err:${err}`);
    }
};
