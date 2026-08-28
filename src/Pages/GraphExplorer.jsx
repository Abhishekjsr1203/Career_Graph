import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const GraphExplorer = () => {
  const [graph, setGraph] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/graph")
      .then((response) => response.json())
      .then((data) => {
        setGraph(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const roles = [...new Map(
    graph.map((item) => [
      item.role_id,
      {
        id: item.role_id,
        title: item.role_title,
      },
    ])
  ).values()];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-violet-950 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-300 font-semibold mb-3">
            CAREER CONNECTIONS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Graph Explorer
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Explore how career roles connect with the skills and technologies
            required for them.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Loading career graph...
            </p>
          </div>
        ) : graph.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No graph data found.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Career Connections
              </h2>

              <p className="text-gray-500 mt-2">
                Roles connected to their required skills and technologies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => {
                const connections = graph.filter(
                  (item) => item.role_id === role.id
                );

                return (
                  <div
                    key={role.id}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                        💼
                      </div>

                      <h3 className="text-xl font-bold text-gray-900">
                        {role.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {connections.map((connection, index) => (
                        <div
                          key={`${connection.node_name}-${index}`}
                          className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3"
                        >
                          <div>
                            <p className="text-xs text-gray-400">
                              {connection.node_type}
                            </p>

                            <p className="font-medium text-gray-800">
                              {connection.node_name}
                            </p>
                          </div>

                          <span className="text-xs font-semibold text-blue-700">
                            {connection.relationship}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default GraphExplorer;