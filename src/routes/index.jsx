import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Administrator, Organization, OrganizationAdd, Students } from "../pages/index" 
import { usePath } from '../hook/usePath'
import OrganizationMore from '../pages/OrganizationMore'

function CustomRoutes() {
  return (
    <Routes>
        <Route path={usePath.organization} element={<Organization/>}/>
        <Route path={usePath.organizationAdd} element={<OrganizationAdd/>}/>
        <Route path={usePath.OrganizationMore} element={<OrganizationMore/>}/>
        <Route path={usePath.admin} element={<Administrator/>}/>
        <Route path={usePath.students} element={<Students/>}/>
    </Routes>
  )
}

export default CustomRoutes