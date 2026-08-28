import React from 'react'

const Intro = () => {
  return (
    <div className='flex flex-row justify-between p-4 px-20 items-center w-full'>
      <div className='flex flex-col w-1/2 gap-4'>
        <div className='flex flex-col gap-2'>
            <div className='bg-violet-300 text-violet-800 text-bold font-bold w-1/3 p-2 rounded-2xl '>Explore, Learn, Build Your Future</div>
            <h1 className='text-6xl font-bold text-wrap '>Discover connected skills, technologies and projects for your career</h1>
        </div>
        <div>
            <p className='text-lg'>CareerGraph helps yoy exlpore career goals and uncover the skills, technologies and projects that connect them. Find the right path, identify skill gaps and build your future with condifence...</p>
            <div className='flex flex-row gap-4 mt-4'>
                <button className='bg-violet-600 text-white p-2 rounded-lg text-xl'>Explore Career Paths</button>
                <button className='bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-2'>Graph Explorer →</button>
            </div>
        </div>
      </div>
      <div className='w-1/3 mr-35 px-10'>
        <img src='/img1.jpeg' alt="Intro" className='w-full h-auto object-cover rounded-xl' />
      </div>
    </div>
  )
}

export default Intro
