import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Briefcase,
  Lightbulb,
  Network,
  Compass,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row text-amber-50 bg-blue-950 justify-between p-4 px-20 items-center w-full">
      <div>
        <h1 className="font-bold text-xl">CareerGraph</h1>
      </div>

      <div className="flex flex-row gap-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:underline"
        >
          <HomeIcon size={18} />
          Home
        </button>

        <button
          onClick={() => navigate("/explore-roles")}
          className="flex items-center gap-2 hover:underline"
        >
          <Briefcase size={18} />
          Explore Roles
        </button>

        <button
          onClick={() => navigate("/skills")}
          className="flex items-center gap-2 hover:underline"
        >
          <Lightbulb size={18} />
          Skills
        </button>

        <button
          onClick={() => navigate("/graph-explorer")}
          className="flex items-center gap-2 hover:underline"
        >
          <Network size={18} />
          Graph Explorer
        </button>
      </div>

      <button
        onClick={() => navigate("/explore-roles")}
        className="bg-violet-700 p-2 rounded-md flex items-center gap-2"
      >
        <Compass size={18} />
        Explore Careers
      </button>
    </div>
  );
};

export default Navbar;