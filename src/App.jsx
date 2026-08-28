import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import ExploreRoles from './Pages/ExploreRoles'
import Skills from './Pages/Skills'
import Project from './Pages/Project'
import GraphExplorer from './Pages/GraphExplorer'
import Resources from './Pages/Resources' 
import RoleDetails from './Pages/RoleDetails'
import {Routes, Route } from 'react-router-dom'

const App = () => {

  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore-roles" element={<ExploreRoles />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/graph-explorer" element={<GraphExplorer />} />
      <Route path="/about" element={<About />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/roles/:id" element={<RoleDetails />}/>
    </Routes>
    </div>
  )
}

export default App
