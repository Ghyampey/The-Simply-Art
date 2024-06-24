// import axios from "axios";
// import { Heading2 } from "../../components/Heading";
// import { useState, useEffect } from "react";
// import { LineChart, Piechart, VerticalBar } from "../../components/Charts";
// import { formatDataForCharts } from "../../helpers/FormatChartData";

// // const response = await axios.get('http://localhost:5000/api/admin/protected', {
// //     method: 'GET',
// //     headers: {
// //         'Content-Type': 'application/json',
// //         'x-auth-token': localStorage.getItem('token'),
// //     },
// // });
// // const data = await response.json();

// const AdminDashboard = () => {
    
  
//     const [setTotalAmount] = useState();
//     const [totalArtist, setTotalArtist] = useState("");
//     const [totalUser, setTotalUser] = useState();
//     const [pieChartData, setPieChartData] = useState({
//         labels: [],
//         datasets: [],
//     });
//     const [verticalBarData, setVerticalBarData] = useState({
//         labels: [],
//         datasets: [],
//     });

//     const [userData, setUserData] = useState({
//         labels: [],
//         datasets: [],
//     });

//     const getUsers = async () => {
//         const userData = await axios.get(`http://localhost:5000/api/User`);

//         const data = await userData.data.User;
//         setTotalUser(data.length);
//         console.log("getUser", data);
//     };

//     const getArtists = async () => {
//         const userData = await axios.get(
//             `http://localhost:5000/api/User?role=${"artist"}`
//         );

//         const data = await userData.data.User;
//         setTotalArtist(data.length);
     
//         const chartData = formatDataForCharts(data);
//         const labels = chartData.map((dataPoint) => dataPoint.monthYear);
//         const artistCounts = chartData.map((dataPoint) => dataPoint.data);
//         setUserData({
//             labels: labels,
//             datasets: [
//                 {
//                     label: "No of Artists",
//                     data: artistCounts,
//                     borderColor: "rgb(255, 99, 132)",
//                     backgroundColor: "rgba(255, 99, 132, 0.5)",
//                     fill: true,
//                     tension: 0.4,
//                 },
//             ],
//         });
//         console.log("getartists", data);
//     };

    



//     const getEvents = async () => {
//         const productsData = await axios.get(
//             `http://localhost:5000/api/events`
//         );
//         const data = await productsData.data.event;
       

//         const locationCounts = data.reduce((countMap, event) => {
//             const { location } = event;
//             countMap.set(location, (countMap.get(location) || 0) + 1);
//             return countMap;
//         }, new Map());

//         const locationLabels = Array.from(locationCounts.keys());
//         const locationData = Array.from(locationCounts.values());

//         setPieChartData({
//             labels: locationLabels,
//             datasets: [
//                 {
//                     label: "No of Events",
//                     data: locationData,
//                     backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Customize the colors as needed
//                 },
//             ],
//         });
//     };

//     const getOrders = async () => {
//         const orderData = await axios.get(`http://localhost:5000/api/orders`);

//         const data = await orderData.data.order;
//         const orderDas = formatDataForCharts(orderData.data.order);
//         const labels = orderDas.map((dataPoint) => dataPoint.monthYear);
//         const dataCounts = orderDas.map((dataPoint) => dataPoint.data);
//         setVerticalBarData({
//             labels: labels,
//             datasets: [
//                 {
//                     label: "No of Orders",
//                     data: dataCounts,
//                     backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Customize the colors as needed
//                 },
//             ],
//         });
//         let totalAmount = 0;

//         data.forEach((order) => {
//             totalAmount += order.total;
//         });
//         setTotalAmount(totalAmount);
//         console.log("order", data);
//     };

//     const barData = {
//         labels: ["Artists", "Users"],
//         datasets: [
//             {
//                 label: "Total Number",
//                 data: [totalArtist, totalUser],
//                 borderColor: "rgb(255, 99, 132)",
//                 backgroundColor: [
//                     "rgba(255, 99, 132, 0.2)",
//                     "rgba(54, 162, 235, 0.2)",

//                     "rgba(75, 192, 192, 0.2)",
//                     "rgba(255, 206, 86, 0.2)",
//                 ],
//             },
//         ],
//     };

    

//     useEffect(() => {
//         getUsers();
//         getEvents();
//         getArtists();
//         getOrders();
//         document.title = "Admin Dashboard | SimplyArt"; 

//     }, );

    

//     return (
//         <>
//             <Heading2>Dashboard</Heading2>

//             <div className="grid grid-cols-3 justify-center items-center mt-9 mb-[50px] gap-11">
//                 <div className=" h-[99%] w-full m-auto col-span-2 row-span-1 bg-white p-9 shadow-lg rounded-lg">
//                     <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold">
//                         User Growth
//                     </h2>
//                     <LineChart data={userData} />
//                 </div>
//                 <div className="bg-white h-[99%] col-span-1 row-span-1 p-9 shadow-lg rounded-lg">
//                     <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold mb-6 text-center">
//                         Analytics
//                     </h2>
//                     <Piechart data={barData} />
//                 </div>
//                 <div className="bg-white h-[99%] p-9 shadow-lg rounded-lg">
//                     <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold mb-6 text-center">
//                         Popular Event Locations
//                     </h2>
//                     <Piechart data={pieChartData} />
//                 </div>
//                 <div className="bg-white h-[99%] p-9 col-span-2 shadow-lg rounded-lg">
//                     <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold mb-6 text-center">
//                         Order Analytics
//                     </h2>
//                     <VerticalBar data={verticalBarData} />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminDashboard;


import axios from "axios";
import { Heading2 } from "../../components/Heading";
import { useState, useEffect } from "react";
import { LineChart, Piechart, VerticalBar } from "../../components/Charts";
import { formatDataForCharts } from "../../helpers/FormatChartData";
import { Chart as ChartJS, Filler } from "chart.js";

// Register the Filler plugin
ChartJS.register(Filler);

const AdminDashboard = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalArtist, setTotalArtist] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const [pieChartData, setPieChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [verticalBarData, setVerticalBarData] = useState({
        labels: [],
        datasets: [],
    });
    const [userData, setUserData] = useState({
        labels: [],
        datasets: [],
    });

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/User');
            const data = response.data.User;
            setTotalUser(data.length);
            console.log("getUsers:", data);
        } catch (error) {
            console.error("Error fetching User:", error);
        }
    };

    const getArtists = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/User?role=artist');
            const data = response.data.User;
            setTotalArtist(data.length);

            const chartData = formatDataForCharts(data);
            const labels = chartData.map(dataPoint => dataPoint.monthYear);
            const artistCounts = chartData.map(dataPoint => dataPoint.data);

            setUserData({
                labels,
                datasets: [
                    {
                        label: "No of Artists",
                        data: artistCounts,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        fill: true,
                        tension: 0.4,
                    },
                ],
            });
            console.log("getArtists:", data);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    const getEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            const data = response.data.event;

            const locationCounts = data.reduce((countMap, event) => {
                const { location } = event;
                countMap.set(location, (countMap.get(location) || 0) + 1);
                return countMap;
            }, new Map());

            const locationLabels = Array.from(locationCounts.keys());
            const locationData = Array.from(locationCounts.values());

            setPieChartData({
                labels: locationLabels,
                datasets: [
                    {
                        label: "No of Events",
                        data: locationData,
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                ],
            });
            console.log("getEvents:", data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const getOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            const data = response.data.order;
            const orderDas = formatDataForCharts(data);
            const labels = orderDas.map(dataPoint => dataPoint.monthYear);
            const dataCounts = orderDas.map(dataPoint => dataPoint.data);

            setVerticalBarData({
                labels,
                datasets: [
                    {
                        label: "No of Orders",
                        data: dataCounts,
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                ],
            });

            let totalAmount = 0;
            data.forEach(order => {
                totalAmount += order.total;
            });
            setTotalAmount(totalAmount);
            console.log("getOrders:", data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        getUsers();
        getEvents();
        getArtists();
        getOrders();
        document.title = "Admin Dashboard | SimplyArt";
    }, []);

    const barData = {
        labels: ["Artists", "Users"],
        datasets: [
            {
                label: "Total Number",
                data: [totalArtist, totalUser],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
            },
        ],
    };

    return (
        <>
            <Heading2>Dashboard</Heading2>
            <div className="grid grid-cols-3 justify-center items-center mt-9 mb-[50px] gap-11">
                <div className="h-[99%] w-full m-auto col-span-2 row-span-1 bg-white p-9 shadow-lg rounded-lg">
                    <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold">User Growth</h2>
                    <LineChart data={userData} />
                </div>
                <div className="bg-white h-[99%] col-span-1 row-span-1 p-9 shadow-lg rounded-lg">
                    <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold mb-6 text-center">Analytics</h2>
                    <Piechart data={barData} />
                </div>
                <div className="bg-white h-[99%] p-9 shadow-lg rounded-lg">
                    <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold mb-6 text-center">Popular Event Locations</h2>
                    <Piechart data={pieChartData} />
                </div>
                <div className="bg-white h-[99%] p-9 col-span-2 shadow-lg rounded-lg">
                    <h2 className="font-slab text-[#3E3E42] text-[20px] font-semibold mb-6 text-center">Order Analytics</h2>
                    <VerticalBar data={verticalBarData} />
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
