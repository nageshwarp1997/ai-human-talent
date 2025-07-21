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
import { formatSalaryRange } from "../../utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = ({ candidates }) => {
  console.log("candidates", candidates[0]);

  const salariesByRange = {};

  candidates.forEach((candidate) => {
    const salaryRange = formatSalaryRange(candidate.estimated_salary);
    if (salariesByRange[salaryRange]) {
      salariesByRange[salaryRange]++;
    } else {
      salariesByRange[salaryRange] = 1;
    }
  });

  console.log("salariesByRange", salariesByRange);

  const resources = [
    { salaryRange: "0-10k", count: salariesByRange["0-10k"] ?? 0 },
    { salaryRange: "10k-20k", count: salariesByRange["10k-20k"] ?? 0 },
    { salaryRange: "20k-30k", count: salariesByRange["20k-30k"] ?? 0 },
    { salaryRange: "30k-40k", count: salariesByRange["30k-40k"] ?? 0 },
    { salaryRange: "40k-50k", count: salariesByRange["40k-50k"] ?? 0 },
    { salaryRange: "50k-60k", count: salariesByRange["50k-60k"] ?? 0 },
    { salaryRange: "60k-70k", count: salariesByRange["60k-70k"] ?? 0 },
    { salaryRange: "70k-80k", count: salariesByRange["70k-80k"] ?? 0 },
    { salaryRange: "80k-90k", count: salariesByRange["80k-90k"] ?? 0 },
    { salaryRange: "90k-99k+", count: salariesByRange["90k-99k+"] ?? 0 },
  ];

  const data = {
    labels: resources.map((r) => r.salaryRange),
    datasets: [
      {
        label: "No. of Candidates",
        data: resources.map((r) => r.count),
        backgroundColor: "#0A6562",
        borderRadius: 2,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        title: {
          display: true,
          text: "No. of Candidates",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: function (context) {
            const index = context[0].dataIndex;
            const item = resources[index];
            return `${item.salaryRange} AED`;
          },
          label: function (context) {
            const index = context.dataIndex;
            const item = resources[index];
            return `${item.count} candidates`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
