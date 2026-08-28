import React from "react";
import {
  Code2,
  Layers,
  BarChart3,
  ServerCog,
  Brain,
  Database,
  ArrowRight,
} from "lucide-react";

const Div3 = () => {
  const roles = [
    {
      id: 1,
      title: "Python Developer",
      description: "Build robust backend applications and APIs.",
      icon: Code2,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      description: "Work on both frontend and backend development.",
      icon: Layers,
    },
    {
      id: 3,
      title: "Data Scientist",
      description: "Analyze data and build machine learning models.",
      icon: BarChart3,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      description: "Manage infrastructure and deploy applications.",
      icon: ServerCog,
    },
    {
      id: 5,
      title: "ML Engineer",
      description: "Design and implement machine learning models.",
      icon: Brain,
    },
    {
      id: 6,
      title: "Data Analyst",
      description: "Turn data into insights and drive decision-making.",
      icon: Database,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 px-20">
      {roles.map((role) => {
        const Icon = role.icon;

        return (
          <div
            key={role.id}
            className="flex flex-col justify-center items-center text-center bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-6"
          >
            <div className="w-14 h-14 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center mb-4">
              <Icon size={30} />
            </div>

            <h1 className="text-2xl font-bold">
              {role.title}
            </h1>

            <p className="text-gray-600 mt-2">
              {role.description}
            </p>

            <button className="text-purple-600 font-semibold mt-4 flex items-center gap-2 hover:text-purple-800">
              Explore
              <ArrowRight size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Div3;