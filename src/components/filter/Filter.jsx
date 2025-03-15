import React from "react";
import { Button } from "../ui/button";
import { IoMdImages } from "react-icons/io";
import { MdVideoLibrary } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Filter() {
  return (
    <div className="flex gap-4 pb-4">
      <NavLink
        to="/"
        className={({ isActive }) => 
          `rounded-md ${isActive ? "bg-red-700" : "bg-blue-500"}`
        }
      >
        <Button
          className="flex items-center cursor-pointer gap-2 py-2 px-4 text-white  border border-transparent rounded-md shadow-sm transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 active:bg-slate-700"
          type="button"
        >
          <IoMdImages />
          Images
        </Button>
      </NavLink>

      <NavLink
        to="/videos"
        className={({ isActive }) => 
          `rounded-md ${isActive ? "bg-red-700" : "bg-blue-500"}`
        }
      >
        <Button
          className="flex items-center cursor-pointer gap-2 py-2 px-4 text-white border border-transparent rounded-md shadow-sm transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 active:bg-slate-700"
          type="button"
        >
          <MdVideoLibrary />
          Videos
        </Button>
      </NavLink>
    </div>
  );
}
