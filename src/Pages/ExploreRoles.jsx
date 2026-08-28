import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ExploreRoles = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/roles")
      .then((response) => response.json())
      .then((data) => {
  console.log("Roles received:", data);
  setRoles(data);
  setLoading(false);
})
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    "Development",
    "Data & AI",
    "Design",
    "Cloud",
  ];

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || role.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-violet-950 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-300 font-semibold mb-3">
            EXPLORE YOUR FUTURE
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Explore Career Roles
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Discover career paths, understand the skills you need, and find
            the right role for your future.
          </p>

          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white rounded-xl flex items-center px-4 shadow-lg">
              <span className="text-gray-400 text-xl mr-3">🔍</span>

              <input
                type="text"
                placeholder="Search roles or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-4 text-gray-800 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                category === item
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Popular Career Roles
          </h2>

          <p className="text-gray-500 mt-2">
            Explore roles that match your interests and skills.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              Loading career roles...
            </p>
          </div>
        ) : filteredRoles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">
                    💻
                  </div>

                  <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-full">
                    {role.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {role.title}
                </h3>

                <p className="text-gray-500 text-sm mt-3 leading-6">
                  {role.description}
                </p>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">
                      Average Salary
                    </p>

                    <p className="font-semibold text-gray-900">
                      {role.salary}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/roles/${role.id}`)}
                    className="text-blue-800 font-semibold text-sm hover:text-blue-600"
                  >
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔎</div>

            <h3 className="text-xl font-semibold text-gray-800">
              No roles found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching for another role.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExploreRoles;