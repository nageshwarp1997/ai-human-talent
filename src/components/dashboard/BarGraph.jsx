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
// import { formatSalaryRange } from "../../utils";
function formatSalaryRange(salary) {
  const salaryInK = Math.floor(salary / 100) * 10;
  if (salaryInK < 10000) return "0-10k";
  if (salaryInK < 20000) return "10k-20k";
  if (salaryInK < 30000) return "20k-30k";
  if (salaryInK < 40000) return "30k-40k";
  if (salaryInK < 50000) return "40k-50k";
  if (salaryInK < 60000) return "50k-60k";
  if (salaryInK < 70000) return "60k-70k";
  if (salaryInK < 80000) return "70k-80k";
  if (salaryInK < 90000) return "80k-90k";
  return "90k-99k+";
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = ({ candidates }) => {
  console.log("candidates", candidates[0]);

  const salariesByRange = {
    "0-10k": 0,
    "10k-20k": 0,
    "20k-30k": 0,
    "30k-40k": 0,
    "40k-50k": 0,
    "50k-60k": 0,
    "60k-70k": 0,
    "70k-80k": 0,
    "80k-90k": 0,
    "90k-99k+": 0,
  };

  candidates.forEach((candidate) => {
    const salaryRange = formatSalaryRange(candidate.estimated_salary);
    console.log("candidate.estimated_salary", candidate.estimated_salary);
    if (Object.prototype.hasOwnProperty.call(salariesByRange, salaryRange)) {
      salariesByRange[salaryRange]++;
    } else {
      // Just in case formatSalaryRange returns a value not defined in the map
      salariesByRange["90k-99k+"]++;
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
