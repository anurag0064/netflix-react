import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../pages/layout/header/Header'
import Sidebar from '../../pages/layout/sidebar/Sidebar'

function MainRoute() {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}
export default MainRoute;