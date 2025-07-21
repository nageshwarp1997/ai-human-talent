import React, { useState } from "react";
import FilterComponent from "../components/filter/FilterComponent";
import BarGraph from "../components/dashboard/BarGraph";
import RadarGraph from "../components/dashboard/RadarGraph";
import PolarGraph from "../components/dashboard/PolarGraph";
import CandidatesList from "../components/dashboard/CandidatesList";
import banner from "../assets/banner.png";
import { DUMMY_DATA } from "./candidatesDummyData";
import { initialState } from "../components/filter/filterOptions";

const Dashboard = () => {
  const [candidates, setCandidates] = useState(DUMMY_DATA);
  // const [candidates, setCandidates] = useState({});
  const [selectedFilters, setSelectedFilters] = useState(initialState);
  // const [selectedFilters, setSelectedFilters] = useState({});

  const fetchCandidates = async (filter) => {
    setSelectedFilters(filter);
    try {
      let totalWeight = 0;
      for (const kpiKey in filter.selected_kpis) {
        const kpi = filter.selected_kpis[kpiKey];
        if (kpi.enabled) {
          totalWeight += kpi.weight;
        }
      }
      if (totalWeight < 100) {
        alert(
          `Total weight is less than 100 (${totalWeight}). Please adjust weights.`
        );
        return;
      }
      if (totalWeight > 100) {
        alert(
          `Total weight exceeds 100 (${totalWeight}). Please adjust weights.`
        );
        return;
      }
      const json = {
        field: [
          filter.Domain,
          ...filter.subdomain.split(",").map((s) => s.trim()),
        ],
        top_k: parseInt(filter.top_k),
        exp: filter.exp,
        job: filter.job,
        country_code: filter.country_code,
        min_fit_score: parseFloat(filter.min_fit_score / 100),
        selected_kpis: filter.selected_kpis,
      };
      const response = await fetch(
        "https://talentbackend.ctruh.com/profile-candidates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        }
      );
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-3 flex">
      <div>
        <FilterComponent fetchCandidates={fetchCandidates} />
      </div>
      {Object.keys(candidates)?.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full p-10 text-center text-gray-500">
          <img src={banner} alt="Banner" />
          <p className="text-lg font-medium">
            Try adjusting your filter or KPIs criteria to show the data.
          </p>
        </div>
      ) : (
        <div className="flex-1 w-full mx-4 flex flex-col gap-6">
          <div className="w-full mt-2">
            <input
              type="text"
              className="rounded-full p-2 px-4 border w-full border-[#CAD5D5] focus:outline-[#CAD5D5]"
              placeholder="Search"
            />
          </div>
          <div className="grid w-full sm:grid-cols-1 lg:grid-cols-3">
            <div className=" px-3 border-r-[#CAD5D5] border-r h-[300px] w-full">
              <h5 className="text-center font-bold">
                Candidates by Salary Range (AED)
              </h5>
              <BarGraph candidates={candidates.candidates} />
            </div>
            <div className=" px-3 h-[300px] border-r-[#CAD5D5] border-r">
              <h5 className="text-center font-bold">
                Average Candidate vs. AI Benchmark
              </h5>
              <RadarGraph
                selectedFilters={selectedFilters}
                candidates={candidates}
              />
            </div>
            <div className=" px-3 h-[300px]">
              <h5 className="text-center font-bold">Candidates Territory</h5>
              <PolarGraph candidates={candidates} />
            </div>
          </div>
          <div className="w-full mt-4">
            <h4 className="font-bold">
              Top {candidates?.candidates?.length} Candidates List
            </h4>
            <CandidatesList candidates={candidates} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
