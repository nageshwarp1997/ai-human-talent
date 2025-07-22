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

  const resources = Object.keys(salariesByRange)
    .sort((a, b) => {
      const numA = parseInt(a.split("k")[0]);
      const numB = parseInt(b.split("k")[0]);
      return numA - numB;
    })
    .map((salaryRange) => ({
      salaryRange,
      count: salariesByRange[salaryRange] ?? 0,
    }));

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
