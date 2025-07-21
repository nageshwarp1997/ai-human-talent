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

const PolarGraph = ({ candidates }) => {
  const [candidatesCount, setCandidatesCount] = useState({});
  useEffect(() => {
    const candidatesTerrirtory = candidates?.candidates?.reduce(
      (acc, candidate) => {
        acc[candidate.city] = (acc[candidate.city] || 0) + 1;
        return acc;
      },
      {}
    );
    if (Object.keys(candidates)?.length > 0)
      setCandidatesCount(candidatesTerrirtory);
  }, [candidates]);

  const data = {
    labels:
      candidatesCount && Object.keys(candidatesCount)?.length > 0
        ? Object.keys(candidatesCount)
        : [],
    datasets: [
      {
        label: "Popularity",
        data:
          candidatesCount && Object.keys(candidatesCount)?.length > 0
            ? Object.values(candidatesCount)
            : [],
        backgroundColor: [
          "#2CD9C5",
          "#826AF9",
          "#FFE700",
          "#FF6C40",
          "#2D99FF",
          "#505D6F",
        ],
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
        align: "end",
        anchor: "end",
        offset: 6,
        formatter: (value) => value,
        backgroundColor: "#fff",
        display: "auto",
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

export default PolarGraph;
