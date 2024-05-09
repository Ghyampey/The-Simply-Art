import axios from "axios";
import { Box } from "../../components/DashboardBox";
import { Heading2 } from "../../components/Heading";
import { useUser } from "../../service/useUser";
import { useState, useEffect } from "react";
import { Piechart, VerticalBar } from "../../components/Charts";
import { ManageOrders } from "./Order";
import { formatDataForCharts } from "../../helpers/FormatChartData";

const ArtistDashboard = () => {
    const user = useUser();
    const [name, setName] = useState("");
    const [totalProducts, setTotalProducts] = useState("");
    const [totalEvents, setTotalEvents] = useState("");
    const [pieChartData, setPieChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [verticalBarData, setVerticalBarData] = useState({
        labels: [],
        datasets: [],
    });

    const getBio = async () => {
        const productsData = await axios.get(
            `http://localhost:5000/api/biography/${user.id}`
        );

        const data = await productsData.data.artist;
        setName(data.name);
        console.log("getBio", data);
    };

    const getProducts = async () => {
        const productsData = await axios.get(
            `http://localhost:5000/api/artist-products/${name}`
        );

        const data = await productsData.data.product;
        setTotalProducts(data.length);
        const productData = formatDataForCharts(data);

        const labels1 = productData.map((dataPoint) => dataPoint.monthYear);
        const dataCounts = productData.map((dataPoint) => dataPoint.data);
        setVerticalBarData({
            labels: labels1,
            datasets: [
                {
                    label: "No of Products",
                    data: dataCounts,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Customize the colors as needed
                },
            ],
        });
        const labels = data.map((dataPoint) => dataPoint.category);
        const productCounts = data.map((dataPoint) => dataPoint.quantity);
        setPieChartData({
            labels: labels,
            datasets: [
                {
                    label: "No of Products",
                    data: productCounts,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Customize the colors as needed
                },
            ],
        });

        console.log("products", data);
    };

    console.log(verticalBarData, "vdata");

    const getEvents = async () => {
        const exhibitionsData = await axios.get(
            `http://localhost:5000/api/artist-exhibitions/${user.id}`
        );

        const data = await exhibitionsData.data.exhibitions;
        setTotalEvents(data.length);
        console.log("getEvents", data);
    };

    useEffect(() => {
        getBio();
        getEvents();
        document.title = "Artist Dashboard | SimplyArt"; 

    }, []);

    useEffect(() => {
        getProducts();
    }, [name]);

   

    return (
        <>
            <Heading2>Dashboard</Heading2>

            <div className="grid grid-cols-3  gap-11 justify-center mt-9">
                <div className="w-[80%] h-[99%] m-auto bg-white shadow-lg p-11 col-span-2 rounded-lg">
                <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold mb-6 text-center">
                        Painting Uploaded
                    </h2>
                    <VerticalBar data={verticalBarData} />{" "}
                </div>
                <div className="bg-white h-[99%] col-span-1 row-span-1 p-9 shadow-lg rounded-lg">
                    <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold mb-6 text-center">
                        Painting Categories
                    </h2>
                    <Piechart data={pieChartData} />
                </div>
               
                <div className="col-span-3 bg-white shadow-lg rounded-lg">
                    {" "}
                    <ManageOrders userType={"artist"} />{" "}
                </div>
            </div>
        </>
    );
};

export default ArtistDashboard;
