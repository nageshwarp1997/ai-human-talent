import React, { useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { MdCompareArrows } from "react-icons/md";
import { ImDownload3 } from "react-icons/im";
import { RiFileExcel2Fill } from "react-icons/ri";
import { regions } from "../filter/filterOptions";
import { FaEllipsisVertical } from "react-icons/fa6";

const CandidatesList = ({ candidates }) => {
  const [openDialogCandidate, setOpenDialogCandidate] = useState(null);

  return (
    <div>
      <div className="w-full overflow-x-auto my-4 ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-sm border-[#C9C9C9] px-3 w-full md:w-64 text-sm"
            />
            <button className="rounded-sm text-[#0A6562] shadow-[0px_3px_15px_#53535329] p-2">
              <MdOutlineFilterAlt />
            </button>
          </div>
          <div className="flex gap-2 text-[#263338]">
            <button className="inline-flex items-center gap-1 border border-[#BFBEBE] px-3 py-1 rounded-sm text-sm">
              <MdCompareArrows className="text-lg font-bold" /> Compare
              Candidates
            </button>
            <button className="inline-flex items-center gap-1 border border-[#BFBEBE] px-3 py-1 rounded-sm text-sm">
              <ImDownload3 className="text-md" /> Download
            </button>
            <button className="inline-flex items-center gap-1 border border-[#BFBEBE] px-3 py-1 rounded-sm text-sm">
              <RiFileExcel2Fill className="text-[#0A6562]" /> Export to Excel
            </button>
            <div className="flex items-center gap-1 text-sm ml-2">
              <span>Rows per page</span>
              <select className="border border-[#BFBEBE] rounded-sm px-1 py-1 text-sm focus:outline-[#BFBEBE]">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
        <div
          className="max-h-[400px] overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <table className="table-auto w-full text-sm text-left border-collapse max-h-[400px]">
            <thead>
              <tr className="bg-[#E5ECEC] border border-[#DEE2E6] rounded-t-sm">
                <th className="px-2 py-3">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="px-2 py-3">Employee Name</th>
                <th className="px-2 py-3">Position</th>
                <th className="px-2 py-3">Company</th>
                <th className="px-2 py-3">Nationality</th>
                <th className="px-2 py-3">Location</th>
                <th className="px-2 py-3">University</th>
                <th className="px-2 py-3">Salary in Range</th>
                <th className="px-2 py-3">Ex. Conver Rate</th>
                <th className="px-2 py-3">Fit (%)</th>
              </tr>
            </thead>
            <tbody
              className="text-gray-800 max-h-[400px] overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {candidates?.candidates?.map((candidate) => {
                const formatSalaryRange = (salary) => {
                  if (!salary || isNaN(salary)) return "N/A";
                  const lower = Math.floor(salary / 100000) * 10;
                  const upper = lower + 10;
                  return `RM${lower}k-${upper}k`;
                };
                return (
                  <tr
                    key={candidate?.orcid_id}
                    className="border-b border-[#C7D2D2] hover:bg-gray-50"
                  >
                    <td className="px-2 py-2">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>
                    <td className="px-2 py-2 flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      {/* <img src="https://i.pravatar.cc/24?img=1" className="w-6 h-6 rounded-full" /> */}
                      <div className="inline-flex min-w-6 min-h-6 bg-[#f2f2f2] rounded-full"></div>
                      {candidate?.name}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      {candidate?.current_position}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      {candidate?.current_organization}
                    </td>
                    <td className="px-2 py-2 flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      {
                        regions?.find(
                          (region) => region?.value === candidate?.country
                        )?.name
                      }
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      {candidate?.city}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      {candidate?.universities[0]}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      {formatSalaryRange(candidate?.estimated_salary)}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        50.10%
                      </span>
                    </td>
                    <td className="px-2 py-2 inline-flex items-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        {candidate?.kpi_score * 100}%
                      </span>
                      <FaEllipsisVertical
                        className="cursor-pointer"
                        onClick={() =>
                          setOpenDialogCandidate(candidate?.summary)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
              {openDialogCandidate && (
                <div className="fixed inset-0 bg-[#00000066] backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white rounded shadow p-6 max-w-xl w-full ">
                    <h2 className="text-lg font-semibold mb-4">
                      Candidate Summary
                    </h2>
                    <p className="max-h-[400px] overflow-auto">
                      {openDialogCandidate}
                    </p>
                    <button
                      onClick={() => setOpenDialogCandidate(null)}
                      className="mt-4 px-4 py-2 bg-[#0A6562] text-white rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>1 to 60 of 650 records</span>
          <div className="flex gap-1 items-center">
            <button className="px-2 py-1 border rounded">1</button>
            <button className="px-2 py-1 border rounded">2</button>
            <button className="px-2 py-1 border rounded">3</button>
            <button className="px-2 py-1 border rounded">4</button>
            <button className="px-2 py-1 border rounded">5</button>
            <button className="px-2 py-1 border rounded">...</button>
            <button className="px-2 py-1 border rounded">10</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesList;
