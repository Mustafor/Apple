import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Administrator, Organization, Students } from "../pages/index" 
import { usePath } from '../hook/usePath'

function CustomRoutes() {
  return (
    <Routes>
        <Route path={usePath.organization} element={<Organization/>}/>
        <Route path={usePath.admin} element={<Administrator/>}/>
        <Route path={usePath.students} element={<Students/>}/>
    </Routes>
  )
}

export default CustomRoutes