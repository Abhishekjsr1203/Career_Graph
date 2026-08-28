import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  IndianRupee,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const RoleDetails = () => {
  const { id } = useParams();
  console.log("Role ID:", id);
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://careergraph-backend-pyim.onrender.com/api/roles/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Role not found");
        }
        return response.json();
      })
      .then((data) => {
        setRole(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading role details...
        </p>
      </div>
    );
  }

  if (error || !role) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Role Not Found
        </h1>

        <p className="text-gray-500 mt-3">
          The career role you are looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/explore-roles")}
          className="mt-6 bg-blue-950 text-white px-6 py-3 rounded-lg"
        >
          Back to Explore Roles
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate("/explore-roles")}
            className="flex items-center gap-2 text-blue-200 hover:text-white mb-8"
          >
            <ArrowLeft size={18} />
            Back to Explore Roles
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <span className="inline-block bg-blue-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                {role.category}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold">
                {role.title}
              </h1>

              <p className="text-blue-200 mt-5 max-w-2xl text-lg leading-7">
                {role.description}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-60">
              <div className="flex items-center gap-3">
                <IndianRupee size={24} />

                <div>
                  <p className="text-sm text-blue-200">
                    Salary Range
                  </p>

                  <p className="text-xl font-bold">
                    {role.salary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl p-7 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-blue-900" />

                <h2 className="text-2xl font-bold text-gray-900">
                  Skills Required
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-50 text-blue-900 px-4 py-2 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-7 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-blue-900" />

                <h2 className="text-2xl font-bold text-gray-900">
                  Technologies
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {role.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-7 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Career Path
              </h2>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <p className="text-blue-900 font-semibold">
                  Build the required skills and technologies to become a{" "}
                  {role.title}.
                </p>
              </div>
            </section>
          </div>

          <aside>
            <div className="bg-blue-950 text-white rounded-2xl p-7 sticky top-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <BookOpen size={24} />
              </div>

              <h2 className="text-2xl font-bold">
                Ready to start?
              </h2>

              <p className="text-blue-200 mt-3 leading-6">
                Follow the required skills and technologies to prepare for
                this career.
              </p>

              <button
                onClick={() => navigate("/skills")}
                className="w-full mt-6 bg-white text-blue-950 font-semibold py-3 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                Explore Skills
                <ArrowRight size={18} />
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default RoleDetails;