import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarGraph = ({ selectedFilters, candidates }) => {
  const [kpiAverageCount, setKpiAverageCount] = useState({});
  const [kpiAICount, setKpiAICount] = useState({});

  useEffect(() => {
    const selectedKPIs = [];
    for (const kpiKey in selectedFilters.selected_kpis) {
      const kpi = selectedFilters.selected_kpis[kpiKey];
      if (kpi.enabled) {
        selectedKPIs.push(kpiKey + "score");
        setKpiAICount((prev) => {
          return { ...prev, [kpiKey]: kpi.weight };
        });
      }
    }
    const averageCandidate = {};
    selectedKPIs?.forEach((kpi) => {
      const kpiSum = candidates?.candidates?.reduce((sum, candidate) => {
        if (candidate && Object.prototype.hasOwnProperty.call(candidate, kpi)) {
          const value = candidate[kpi] ?? 0;
          return sum + value;
        }
        return sum;
      }, 0);

      averageCandidate[kpi] = kpiSum;
    });
    for (const kpiKey in averageCandidate) {
      const kpi = averageCandidate[kpiKey];
      setKpiAverageCount((prev) => {
        return {
          ...prev,
          [kpiKey
            .replace(/score$/, "")
            .split("_")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")]: (kpi / candidates?.candidates?.length) * 100,
        };
      });
    }
  }, [candidates, selectedFilters.selected_kpis]);

  const data = {
    labels:
      kpiAverageCount && Object.keys(kpiAverageCount)?.length > 0
        ? Object.keys(kpiAverageCount)
        : [],
    datasets: [
      {
        label: "Average Candidate",
        data:
          kpiAverageCount && Object.keys(kpiAverageCount)?.length > 0
            ? Object.values(kpiAverageCount)
            : [],
        backgroundColor: "#0A6562", // purple
        borderColor: "transparent",
        pointBackgroundColor: "#0A6562",
      },
      {
        label: "AI Benchmark",
        data:
          kpiAICount && Object.keys(kpiAICount)?.length > 0
            ? Object.values(kpiAICount)
            : [],
        backgroundColor: "#FFE700", // yellow
        borderColor: "transparent",
        pointBackgroundColor: "#FFE700",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false,
      },
    },
    scales: {
      r: {
        ticks: {
          display: false, // 👈 hides numbers like 1, 2, 3...
        },
        pointLabels: {
          display: true, // optional: keep or hide the outer labels
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarGraph;
