import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from "chart.js";

import { Line, Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
  responsive: true,
  plugins: {
      legend: {
          position: "top",
      },
      title: {
          display: false,
          text: "Number of Users",
      },
  },
};

export const LineChart = ({ data }) => {
   
    return (
        <Line
            className="h-[100%] w-[100%] m-auto"
            options={options}
            data={data}
        />
    );
};

export const Piechart = ({ data }) => {
    return <Pie data={data} />;
};

export const VerticalBar = ({data}) => {
  return <Bar options={options} data={data} />;
};
