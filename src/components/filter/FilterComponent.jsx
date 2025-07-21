import React, { useEffect, useReducer, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { BsBarChartLine } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { filterOptions, subDomains, regions, jobRoles, initialState } from "./filterOptions";

function reducer(state, action) {
    switch (action.type) {
        case "SET_DOMAIN":
            return { ...state, Domain: action.payload };
        case "TOGGLE_SUBDOMAIN": {
            const current = state.subdomain ? state.subdomain?.split(",") : [];
            const updated = current?.includes(action.payload)
                ? current?.filter((item) => item !== action.payload)
                : [...current, action.payload];
            return { ...state, subdomain: updated.join(",") };
        }
        case "TOGGLE_JOB_FIELD": {
            // const current = state.jobField ? state.jobField.split(",") : [];
            // const updated = current.includes(action.payload)
            //     ? current.filter((item) => item !== action.payload)
            //     : [...current, action.payload];
            return { ...state, job: action.payload };
        }
        case "TOGGLE_COUNTRY_CODE": {
            // const current = state.country_code ? state.country_code.split(",") : [];
            // const updated = current.includes(action.payload)
            //     ? current.filter((item) => item !== action.payload)
            //     : [...current, action.payload];
            return { ...state, country_code: action.payload };
        }
        case "SET_TOPK":
            return { ...state, top_k: action.payload };
        case "SET_EXPERIENCE":
            return { ...state, exp: action.payload };
        case "SET_MINIMUM_FIT":
            return { ...state, min_fit_score: action.payload };
        case "TOGGLE_KPI_ENABLED":
            return {
                ...state,
                selected_kpis: {
                    ...state.selected_kpis,
                    [action.payload.kpi]: {
                        ...state.selected_kpis[action.payload.kpi],
                        enabled: action.payload.enabled,
                    },
                },
            };
        case "SET_KPI_SELECTED_OPTIONS":
            return {
                ...state,
                selected_kpis: {
                    ...state.selected_kpis,
                    [action.payload.kpi]: {
                        ...state.selected_kpis[action.payload.kpi],
                        selected_options: state.selected_kpis[action.payload.kpi]?.selected_options?.includes(
                            action.payload.selected_options
                        )
                            ? state.selected_kpis[action.payload.kpi]?.selected_options?.filter(
                                  (v) => v !== action.payload.selected_options
                              )
                            : [...state.selected_kpis[action.payload.kpi]?.selected_options, action.payload.selected_options],
                    },
                },
            };
        case "SET_KPI_WEIGHT":
            return {
                ...state,
                selected_kpis: {
                    ...state.selected_kpis,
                    [action.payload.kpi]: {
                        ...state.selected_kpis[action.payload.kpi],
                        weight: action.payload.weight ? parseInt(action.payload.weight) : 0,
                    },
                },
            };
        default:
            return state;
    }
}

const FilterComponent = ({ fetchCandidates }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isOpen, setIsOpen] = useState(false);
    const [minimumFit, setMinimumFit] = useState(10);

    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleClick = () => {
        fetchCandidates(state);
    };

    return (
        <div className="shadow-[0px_3px_15px_#75757529] w-[300px] max-h-[800px] overflow-auto" style={{ scrollbarWidth: "none" }}>
            <div className="bg-[#E5ECEC] flex items-center gap-4 py-2 px-4">
                <HiOutlineFilter className="font-bold" />
                <span className="font-medium">Filter</span>
            </div>
            <div className="text-sm flex flex-col gap-4 py-2 px-4">
                {/* Industry/Domain dropdowm */}
                <div className="flex flex-col">
                    <label htmlFor="industry">Industry</label>
                    <div className="relative">
                        <select
                            id="industry"
                            name="industry"
                            value={state?.Domain}
                            onChange={(e) => dispatch({ type: "SET_DOMAIN", payload: e.target.value })}
                            className="appearance-none w-full bg-white border border-[#C9C9C9] p-2 px-4 rounded-full leading-tight focus:outline-none focus:ring-1 focus:ring-[#C9C9C9] overflow-hidden"
                        >
                            <option value="biotechnology">Biotechnology</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 bg-[#0A6562] rounded-r-full">
                            <MdKeyboardArrowDown className="text-2xl text-white" />
                        </div>
                    </div>
                </div>
                {/* Subdomain Dropdown */}
                <div className="flex flex-col">
                    <label htmlFor="sub-domain">Sub Domain</label>
                    <div className="relative">
                        <div className="relative w-full">
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="appearance-none w-full bg-white border border-[#C9C9C9] p-2 pl-4 pr-10 rounded-full leading-tight focus:outline-none focus:ring-1 focus:ring-[#C9C9C9] text-left whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                                {state?.subdomain?.length > 0 ? state?.subdomain?.split(",")?.join(", ") : "Select"}
                            </button>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-600 bg-[#0A6562] rounded-r-full">
                                <MdKeyboardArrowDown className="text-white text-xl" />
                            </div>
                        </div>
                        {isOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-[#f6f6f6] border border-gray-300 rounded shadow p-2 max-h-60 overflow-y-auto">
                                {subDomains.map((subDomain) => (
                                    <label key={subDomain.value} className="flex items-center space-x-2 py-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={state?.subdomain?.split(",")?.includes(subDomain.value)}
                                            onChange={() => dispatch({ type: "TOGGLE_SUBDOMAIN", payload: subDomain.value })}
                                            className="accent-[#0A6562] w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-800 truncate">{subDomain.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/* Job field dropdown */}
                <div className="flex flex-col">
                    <label htmlFor="job">Job</label>
                    <div className="relative">
                        <select
                            name="job"
                            id="job"
                            value={state?.job}
                            onChange={(e) => dispatch({ type: "TOGGLE_JOB_FIELD", payload: e.target.value })}
                            className="appearance-none w-full bg-white border border-[#C9C9C9] p-2 px-4 rounded-full leading-tight focus:outline-none focus:ring-1 focus:ring-[#C9C9C9] overflow-hidden"
                        >
                            {jobRoles?.map((job, index) => {
                                return (
                                    <option key={index} value={job}>
                                        {job}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 bg-[#0A6562] rounded-r-full">
                            <MdKeyboardArrowDown className="text-2xl text-white" />
                        </div>
                    </div>
                </div>
                {/* Top K candidates dropdown */}
                <div className="flex flex-col">
                    <label htmlFor="top-candidates">Top Candidates</label>
                    <div className="relative">
                        <select
                            name="top-candidates"
                            id="top-candidates"
                            value={state?.top_k}
                            onChange={(e) => dispatch({ type: "SET_TOPK", payload: e.target.value })}
                            className="appearance-none w-full bg-white border border-[#C9C9C9] p-2 px-4 rounded-full leading-tight focus:outline-none focus:ring-1 focus:ring-[#C9C9C9] overflow-hidden"
                        >
                            {[10, 15, 20, 50, 100].map((topN) => {
                                return (
                                    <option key={topN} value={topN}>
                                        {topN}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 bg-[#0A6562] rounded-r-full">
                            <MdKeyboardArrowDown className="text-2xl text-white" />
                        </div>
                    </div>
                </div>
                {/* Regions dropdown */}
                <div className="flex flex-col">
                    <label htmlFor="top-candidates">Region</label>
                    <div className="relative">
                        <select
                            name="top-candidates"
                            id="top-candidates"
                            value={state?.country_code}
                            onChange={(e) => dispatch({ type: "TOGGLE_COUNTRY_CODE", payload: e.target.value })}
                            className="appearance-none w-full bg-white border border-[#C9C9C9] p-2 px-4 rounded-full leading-tight focus:outline-none focus:ring-1 focus:ring-[#C9C9C9] overflow-hidden"
                        >
                            {regions.map((region, index) => {
                                return (
                                    <option key={index} value={region?.value}>
                                        {region?.name}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 bg-[#0A6562] rounded-r-full">
                            <MdKeyboardArrowDown className="text-2xl text-white" />
                        </div>
                    </div>
                </div>
                {/* Free KPI Text field*/}
                <div className="flex flex-col">
                    <label htmlFor="free-kpi-text">Free KPI Text</label>
                    <input
                        id="free-kpi-text"
                        name="free-kpi-text"
                        type="text"
                        className="border border-[#C9C9C9] rounded-full p-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-[#C9C9C9]"
                        placeholder="Enter your text"
                    />
                </div>
                {/* Experience slider */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="minimum-fit">Experience</label>
                        <div className="border border-[#0A6562] px-2 rounded-full">
                            <span>{state?.exp}</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        id="minimum-fit"
                        min="5"
                        max="55"
                        value={state?.exp}
                        onChange={(e) => dispatch({ type: "SET_EXPERIENCE", payload: e.target.value })}
                        className="w-full h-2 bg-[#C9C9C9] rounded-lg appearance-none cursor-pointer accent-white"
                        style={{
                            background: `linear-gradient(to right, #0A6562 ${((state?.exp - 5) * 100) / 50}%, #ccc ${
                                ((state?.exp - 5) * 100) / 50
                            }%)`,
                        }}
                    />
                </div>
                {/* Minimum fit % slider */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="minimum-fit">Minimum Fit %</label>
                        <div className="border border-[#0A6562] px-2 rounded-full">
                            <span>{state?.min_fit_score}%</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        id="minimum-fit"
                        min="10"
                        max="95"
                        value={state?.min_fit_score}
                        onChange={(e) => dispatch({ type: "SET_MINIMUM_FIT", payload: e.target.value })}
                        className="w-full h-2 bg-[#C9C9C9] rounded-lg appearance-none cursor-pointer accent-white"
                        style={{
                            background: `linear-gradient(to right, #0A6562 ${((state?.min_fit_score - 10) * 100) / 85}%, #ccc ${
                                ((state?.min_fit_score - 10) * 100) / 85
                            }%)`,
                        }}
                    />
                </div>
            </div>
            <div className="bg-[#E5ECEC] flex items-center gap-4 py-2 px-4 my-6">
                <BsBarChartLine className="font-bold" />
                <span className="font-medium">KPIs</span>
            </div>
            {/* KPI Filters */}
            <div className="text-sm flex flex-col gap-4 py-2 px-4">
                {filterOptions?.map((filterOption, index) => {
                    return (
                        <div key={index} className="flex w-full items-center flex-1">
                            <div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={state.selected_kpis[filterOption.value]?.enabled || false}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "TOGGLE_KPI_ENABLED",
                                                payload: { kpi: filterOption.value, enabled: e.target.checked },
                                            })
                                        }
                                    />
                                    <div className="w-11 h-6 bg-[#C6C7C6] rounded-full peer-checked:bg-[#0A6562] transition-colors"></div>
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
                                </label>
                            </div>
                            <div className="relative w-full flex items-center ml-1">
                                <div onClick={() => toggleDropdown(index)} className="inline-flex justify-between w-full">
                                    <span className="overflow-hidden no-wrap whitespace-nowrap truncate ">
                                        {filterOption?.name?.length > 15
                                            ? filterOption?.name?.slice(0, 14) + "..."
                                            : filterOption?.name}
                                    </span>
                                    {filterOption?.subMenu && <TiArrowSortedDown size={18} />}
                                </div>
                                {openIndex === index &&
                                    filterOption?.subMenu &&
                                    state.selected_kpis[filterOption.value]?.enabled && (
                                        <div className="absolute left-0 top-full z-10 mt-1 w-[200px] bg-[#f6f6f6] border border-gray-300 rounded shadow p-2 max-h-60 overflow-y-auto">
                                            {filterOption.subMenu.map((sub) => (
                                                <label key={sub.value} className="flex items-center space-x-2 py-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            state.selected_kpis[filterOption.value]?.selected_options?.includes(
                                                                sub.value
                                                            ) || false
                                                        }
                                                        onChange={(e) =>
                                                            dispatch({
                                                                type: "SET_KPI_SELECTED_OPTIONS",
                                                                payload: {
                                                                    kpi: filterOption.value,
                                                                    selected_options: sub.value,
                                                                },
                                                            })
                                                        }
                                                        className="accent-[#0A6562] w-4 h-4"
                                                    />
                                                    <span className="text-sm text-gray-800 ">{sub.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                            </div>
                            <div className="inline-flex items-center bg-gray-100 rounded px-2 py-1 space-x-2">
                                <button
                                    type="button"
                                    className="text-gray-600 text-xl font-bold hover:text-blue-600 focus:outline-none"
                                    onClick={() => {
                                        if (state.selected_kpis[filterOption.value]?.weight < 100) {
                                            dispatch({
                                                type: "SET_KPI_WEIGHT",
                                                payload: {
                                                    kpi: filterOption.value,
                                                    weight: parseInt(state.selected_kpis[filterOption.value]?.weight) + 1,
                                                },
                                            });
                                        }
                                    }}
                                >
                                    +
                                </button>
                                <input
                                    type="text"
                                    value={state.selected_kpis[filterOption.value]?.weight}
                                    onChange={(e) => {
                                        if (e.target.value >= 0 && e.target.value <= 100) {
                                            dispatch({
                                                type: "SET_KPI_WEIGHT",
                                                payload: {
                                                    kpi: filterOption.value,
                                                    weight: e.target.value,
                                                },
                                            });
                                        }
                                    }}
                                    className="text-center w-6 border bg-white rounded border-[#C9C9C9] focus:outline-none focus:ring-1 focus:ring-[#C9C9C9]"
                                />
                                <button
                                    type="button"
                                    className="text-gray-600 text-xl font-bold hover:text-blue-600 focus:outline-none"
                                    onClick={() => {
                                        if (state.selected_kpis[filterOption.value]?.weight > 0) {
                                            dispatch({
                                                type: "SET_KPI_WEIGHT",
                                                payload: {
                                                    kpi: filterOption.value,
                                                    weight: parseInt(state.selected_kpis[filterOption.value]?.weight) - 1,
                                                },
                                            });
                                        }
                                    }}
                                >
                                    −
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-full p-4">
                <button className="bg-[#0A6562] rounded-full w-full text-white py-2" onClick={handleClick}>
                    Fetch Candidates
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;
