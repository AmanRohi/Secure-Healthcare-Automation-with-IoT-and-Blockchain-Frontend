import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between  w-full h-max px-3 py-4 items-center shadow-md shadow-gray-300">
      <div className="flex items-center gap-2">
        <img
          src="./images/img.jpg"
          className="w-[35px]"
        />
        <p className="font-medium text-emerald-500 tracking-wide text-[25px]">
          Secure Automation 
        </p>
      </div>
      <div className="flex  w-[40%] justify-between">
        <Link
          to="/"
          className="text-[19px] font-normal hover:cursor-pointer hover:text-emerald-500"
        >
          Home
        </Link>
        <Link
          to="/terms_conditions"
          className="text-[19px] font-normal hover:cursor-pointer hover:text-emerald-500"
        >
          Terms & Condition
        </Link>
        <Link
          to="/aboutUs"
          className="text-[19px] font-normal hover:cursor-pointer hover:text-emerald-500"
        >
          About Us
        </Link>
      </div>
      <button className="bg-emerald-500 px-4 py-2 rounded-md text-white tracking-wide">
        Get Started
      </button>
    </div>
  );
};

export default Navbar;
