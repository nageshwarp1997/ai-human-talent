import React from "react";
import logo from "../assets/Logo.png";
import { MdNotificationsNone } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Candidates",
    path: "#",
  },
  {
    name: "Talent Map",
    path: "#",
  },
  {
    name: "Payroll",
    path: "#",
  },
  {
    name: "Jobs",
    path: "#",
  },
  {
    name: "Insights",
    path: "#",
  },
];

const Navigation = () => {
  const location = useLocation();
  return (
    <div className="flex justify-between items-center px-4 shadow-[0px_3px_20px_#00000029]">
      <div className="flex items-center w-full">
        <div className="w-[300px]">
          <img src={logo} alt="logo" className="h-12" />
        </div>
        <div className="flex items-center justify-between w-full py-2 text-sm font-medium">
          <div>
            <nav>
              <ul className="flex items-center gap-2">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={`p-3  ${
                      location.pathname === item.path
                        ? "font-bold"
                        : "font-medium"
                    }  cursor-pointer hover:text-[#0A6562] ${
                      location.pathname === item.path
                        ? "text-[#0A6562]"
                        : "text-[#5D5D5D]"
                    } ${
                      location.pathname === item.path
                        ? "border-t-3 border-[#0A6562]"
                        : "border-transparent"
                    }`}
                  >
                    <a href={item.path}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <MdNotificationsNone className="text-3xl" />
            <div className="flex items-center gap-2 bg-[#0A6562] rounded-full p-1.5">
              <div className="w-8 h-8 bg-[#f2f2f2] rounded-full flex items-center justify-center">
                {/* <img src={} alt="" /> */}
              </div>
              <span className="text-white">Administrator</span>
              <MdKeyboardArrowDown className="text-2xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
