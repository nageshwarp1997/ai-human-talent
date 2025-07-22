import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Utility to generate a consistent set of colors
const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

const PolarGraphForLocation = ({ candidates }) => {
  const [candidatesCount, setCandidatesCount] = useState({});
  useEffect(() => {
    const candidatesTerritory = candidates?.candidates?.reduce(
      (acc, candidate) => {
        acc[candidate.city] = (acc[candidate.city] || 0) + 1;
        return acc;
      },
      {}
    );
    if (Object.keys(candidatesTerritory)?.length > 0)
      setCandidatesCount(candidatesTerritory);
  }, [candidates]);

  const labels = Object.keys(candidatesCount);
  const values = Object.values(candidatesCount);
  const backgroundColors = generateColors(labels.length);

  const data = {
    labels,
    datasets: [
      {
        label: "Candidates",
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        // position: "right", // 👈 moves legend to the right
        // align: "center", // 👈 aligns legend vertically center
        // labels: {
        //     usePointStyle: true, // makes them round
        //     pointStyle: "circle", // optional: default is 'circle'
        //     boxWidth: 8, // 👈 smaller circle size
        //     boxHeight: 8, // 👈 optional: explicitly smaller height
        //     padding: 12,
        //     font: {
        //         size: 12, // 👈 reduce font size too
        //     },
        // },
      },
      datalabels: {
        // align: "end",
        // anchor: "end",
        // offset: 6,
        // formatter: (value) => value,
        // backgroundColor: "#fff",
        display: false,
        // color: "#000",
        // font: {
        //   weight: "bold",
        // },
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

export default PolarGraphForLocation;
