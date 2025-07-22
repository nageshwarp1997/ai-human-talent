import React, { useState } from "react";
import { MdOutlineFilterAlt, MdCompareArrows } from "react-icons/md";
import { ImDownload3 } from "react-icons/im";
import { RiFileExcel2Fill } from "react-icons/ri";
import { regions } from "../filter/filterOptions";
import { MdClose } from "react-icons/md";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import LineChart from "./LineChart";

const CandidatesList = ({ candidates }) => {
  const [openDialogCandidate, setOpenDialogCandidate] = useState(null);
  const [showCompareCandidates, setShowCompareCandidates] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [callingId, setCallingId] = useState("");

  const summaryRef = useOutsideClick(
    () => setOpenDialogCandidate(null),
    openDialogCandidate
  );

  const compareRef = useOutsideClick(
    () => setShowCompareCandidates(null),
    showCompareCandidates
  );

  const handleCheckboxChange = (candidateId) => {
    setSelectedRows((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = (e) => {
    const currentCandidates = paginatedCandidates.map((c) => c.orcid_id);
    if (e.target.checked) {
      setSelectedRows((prev) =>
        Array.from(new Set([...prev, ...currentCandidates]))
      );
    } else {
      setSelectedRows((prev) =>
        prev.filter((id) => !currentCandidates.includes(id))
      );
    }
  };

  const totalPages = Math.ceil(
    (candidates?.candidates?.length || 0) / rowsPerPage
  );
  const paginatedCandidates =
    candidates?.candidates?.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    ) || [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatSalaryRange = (salary) => {
    if (!salary || isNaN(salary)) return "N/A";
    const lower = Math.floor(salary / 100000) * 10;
    const upper = lower + 10;
    return `${lower}k-${upper}k`;
  };

  const getSummary = async (id) => {
    setCallingId(id);
    try {
      setLoading(true);
      const resp = await fetch(
        `https://talentbackend.ctruh.com/candidate-summary/${id}`,
        { method: "GET" }
      );
      const data = await resp.json();
      setOpenDialogCandidate(data.summary);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full my-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              disabled={true} // TODO: Make it enabled
              className="border rounded-sm border-[#C9C9C9] px-3 w-full md:w-64 text-sm"
            />
            <button className="rounded-sm text-[#0A6562] shadow-[0px_3px_15px_#53535329] p-2">
              <MdOutlineFilterAlt />
            </button>
          </div>
          <div className="flex gap-2 text-[#263338]">
            <button
              onClick={() => {
                selectedRows.length && setShowCompareCandidates(true);
              }}
              disabled={!selectedRows.length}
              className="inline-flex items-center gap-1 border border-[#BFBEBE] px-3 py-1 rounded-sm text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <MdCompareArrows className="text-lg font-bold" />
              <span>Compare Candidates</span>
            </button>
            <button className="inline-flex items-center gap-1 border border-[#BFBEBE] px-3 py-1 rounded-sm text-sm">
              <ImDownload3 className="text-md" /> Download
            </button>
            <button className="inline-flex items-center gap-1 border border-[#BFBEBE] px-3 py-1 rounded-sm text-sm">
              <RiFileExcel2Fill className="text-[#0A6562]" /> Export to Excel
            </button>
            <div className="flex items-center gap-1 text-sm ml-2">
              <span>Rows per page</span>
              <select
                className="border border-[#BFBEBE] rounded-sm px-1 py-1 text-sm focus:outline-[#BFBEBE] cursor-pointer"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[10, 25, 50, 100].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full max-h-[400px] overflow-auto">
          <table className="table-auto w-full text-sm text-left border-collapse break-words">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#E5ECEC] border border-[#DEE2E6] rounded-t-sm">
                <th className="px-2 py-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={paginatedCandidates.every((c) =>
                      selectedRows.includes(c.orcid_id)
                    )}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-2 py-3">Employee Name</th>
                <th className="px-2 py-3">Position</th>
                <th className="px-2 py-3">Company</th>
                <th className="px-2 py-3">Nationality</th>
                <th className="px-2 py-3">Location</th>
                <th className="px-2 py-3">University</th>
                <th className="px-2 py-3">Salary in Range (AED)</th>
                <th className="px-2 py-3">Fit (%)</th>
                <th className="px-2 py-3">Ex. Conver Rate</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {paginatedCandidates.map((candidate) => (
                <tr
                  key={candidate?.orcid_id}
                  className="border-b border-[#C7D2D2] hover:bg-gray-50"
                >
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      checked={selectedRows.includes(candidate.orcid_id)}
                      onChange={() => handleCheckboxChange(candidate.orcid_id)}
                    />
                  </td>
                  <td className="px-2 py-2 align-middle">
                    <div className="flex items-center gap-2">
                      <div className="min-w-6 min-h-6 bg-[#f2f2f2] rounded-full">
                        {/* <img
                          src=""
                          alt=""
                          className="w-full h-full object-cover object-center aspect-square"
                        /> */}
                      </div>
                      <span className="capitalize break-words">
                        {candidate?.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-2 py-2 capitalize break-words">
                    {candidate?.current_position}
                  </td>
                  <td className="px-2 py-2 break-words">
                    {candidate?.current_organization}
                  </td>
                  <td className="px-2 py-2 flex items-center gap-2 break-words">
                    {
                      regions?.find(
                        (region) => region?.value === candidate?.country
                      )?.name
                    }
                  </td>
                  <td className="px-2 py-2 break-words">{candidate?.city}</td>
                  <td className="px-2 py-2 break-words">
                    {candidate?.universities[0]}
                  </td>
                  <td className="px-2 py-2 text-nowrap">
                    {`${formatSalaryRange(candidate?.estimated_salary)}`}
                  </td>
                  <td className="px-2 py-2 break-words">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {(candidate?.kpi_score * 100).toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-2 py-2 align-middle">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {(50.1).toFixed(2)}%
                      </span>
                      {/* <FaEllipsisVertical
                        className="cursor-pointer"
                        onClick={() =>
                          setOpenDialogCandidate(candidate?.summary)
                        }
                      /> */}
                    </div>
                  </td>
                  <td className="px-2 py-2 align-middle">
                    {loading && callingId === candidate?.orcid_id ? (
                      <div class="spinner" />
                    ) : (
                      <div
                        className="flex items-center gap-2 text-blue-700 cursor-pointer"
                        onClick={() => getSummary(candidate?.orcid_id)}
                      >
                        Summary
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {openDialogCandidate && (
                <div className="fixed w-dvw h-dvh inset-0 bg-[#00000066] backdrop-blur-sm flex items-center justify-center z-50">
                  <div
                    className="bg-white rounded shadow p-6 max-w-xl w-full"
                    ref={summaryRef}
                  >
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
          <span>
            {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(
              currentPage * rowsPerPage,
              candidates?.candidates?.length
            )}{" "}
            of {candidates?.candidates?.length} records
          </span>
          <div className="flex gap-1 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 border rounded ${
                currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-2 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 border rounded ${
                currentPage === totalPages
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {showCompareCandidates && (
        <div className="fixed inset-0 bg-black/50 w-dvw h-dvh flex items-center justify-center z-50">
          <div
            className="max-w-[60dvw] max-h-[50dvh] w-full h-full bg-white overflow-auto rounded relative"
            ref={compareRef}
          >
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowCompareCandidates(false)}
            >
              <MdClose className="w-6 h-6" />
            </div>
            <LineChart
              candidates={candidates.candidates?.filter((c) =>
                selectedRows.includes(c?.orcid_id)
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesList;
