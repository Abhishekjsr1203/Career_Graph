import React from "react";

const Div1 = () => {
  return (
    <div className="flex flex-row justify-between p-4 px-20 items-center w-full">

      <div className="bg-white rounded-2xl flex gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4">
        <div className="text-3xl mb-2">💼</div>
        <div>
        <h1 className="text-2xl font-bold">10+</h1>
        <p className="font-bold">Career Roles</p>
        <p>Explore in demand roles</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl flex gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4">
        <div className="text-3xl mb-2">🎯</div>
        <div>
            <h1 className="text-2xl font-bold">40+</h1>
        <p className="font-bold">Skills</p>
        <p>Develop in demand skills</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl flex gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4">
        <div className="text-3xl mb-2">💻</div>
        <div>
          <h1 className="text-2xl font-bold">25+</h1>
          <p className="font-bold">Technologies</p>
          <p>Tools you will work with</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl flex gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4">
        <div className="text-3xl mb-2">🚀</div>
        <div>
          <h1 className="text-2xl font-bold">30+</h1>
          <p className="font-bold">Real-World Projects</p>
          <p>Build and showcase</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl flex gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4">
        <div className="text-3xl mb-2">📚</div>
        <div>
          <h1 className="text-2xl font-bold">40+</h1>
          <p className="font-bold">Learning Resources</p>
          <p>Curated for your growth</p>
        </div>
      </div>

    </div>
  );
};

export default Div1;