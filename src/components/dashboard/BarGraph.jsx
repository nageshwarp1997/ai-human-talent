import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = () => {
  const data = {
    labels: ["LinkedIn", "Job Boards", "Referrals", "Company Website"],
    datasets: [
      {
        label: "No. of Resources",
        data: [200, 300, 400, 430],
        backgroundColor: "#2C06AE",
        borderRadius: 6,
        barThickness: 9,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "No. of Resources",
        },
      },
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
