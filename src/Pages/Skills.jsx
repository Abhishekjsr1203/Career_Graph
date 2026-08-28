import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://careergraph-backend-pyim.onrender.com/api/skills")
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredSkills = skills.filter((item) =>
    item.skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-violet-950 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-300 font-semibold mb-3">
            BUILD YOUR SKILLS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Skills Explorer
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Discover the skills required for different career roles and
            understand where each skill can take you.
          </p>

          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white rounded-xl flex items-center px-4 shadow-lg">
              <span className="text-gray-400 text-xl mr-3">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-4 text-gray-800 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Career Skills
          </h2>

          <p className="text-gray-500 mt-2">
            Explore skills and the career roles connected to them.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              Loading skills...
            </p>
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((item) => (
              <div
                key={item.skill}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl mb-5">
                  💡
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {item.skill}
                </h3>

                <p className="text-sm text-gray-500 mt-2 mb-4">
                  Required for
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.roles.map((role) => (
                    <span
                      key={role}
                      className="text-sm bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">
              🔎
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              No skills found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching for another skill.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Skills;