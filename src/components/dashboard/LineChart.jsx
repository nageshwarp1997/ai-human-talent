import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const metrics = [
  {
    label: "CPS",
    value: "career_progression_score",
  },
  {
    label: "ETAS",
    value: "emerging_trend_alignment_score",
  },
  {
    label: "STFS",
    value: "scientific_technical_foundationscore",
  },
  {
    label: "TAIS",
    value: "top_academic_institutionscore",
  },
  {
    label: "DCSS",
    value: "digital_computing_skillsscore",
  },
  {
    label: "ICS",
    value: "industrial_collaborationscore",
  },
  {
    label: "GFS",
    value: "global_firmsscore",
  },
  {
    label: "PCS",
    value: "patent_countscore",
  },
  {
    label: "RCS",
    value: "research_credentialsscore",
  },
  {
    label: "RPS",
    value: "recent_pubsscore",
  },
  {
    label: "FFS",
    value: "founder_flagscore",
  },
];

export default function LineChart({ candidates }) {
  const scores = candidates?.map(
    ({
      name,
      career_progression_score,
      emerging_trend_alignment_score,
      scientific_technical_foundationscore,
      top_academic_institutionscore,
      digital_computing_skillsscore,
      industrial_collaborationscore,
      global_firmsscore,
      patent_countscore,
      research_credentialsscore,
      recent_pubsscore,
      founder_flagscore,
    }) => ({
      name,
      career_progression_score,
      emerging_trend_alignment_score,
      scientific_technical_foundationscore,
      top_academic_institutionscore,
      digital_computing_skillsscore,
      industrial_collaborationscore,
      global_firmsscore,
      patent_countscore,
      research_credentialsscore,
      recent_pubsscore,
      founder_flagscore,
    })
  );

  const chartData = {
    labels: metrics.map((metric) => metric.label),
    datasets: scores.map((person, idx) => ({
      label: person.name,
      data: metrics.map((matric) => person[matric.value] * 100),
      borderColor: `hsl(${(idx * 100) % 360}, 70%, 50%)`,
      backgroundColor: `hsl(${(idx * 100) % 360}, 70%, 70%)`,
      tension: 0.3,
      fill: false,
    })),
  };

  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
        datalabels: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5,
          },
          title: {
            display: true,
            text: "Scores",
          },
        },
      },
    };
  }, []);
  return <Line data={chartData} options={options} />;
}
