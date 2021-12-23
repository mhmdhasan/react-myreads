import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/app_context';

function Sidebar() {
    const { currently_reading, read, want_to_read } = useAppContext();

    return (
        <>
            <div className='sidebar h-100'>
                {/* APP LOGO */}
                <div className='logo mb-5 text-center text-lg-start'>
                    <img src='/images/logo.svg' alt='My Reads' className='img-fluid' />
                </div>

                {/* USER INFO */}
                <div className='d-flex align-items-center mb-5 pb-5 border-bottom flex-column flex-xl-row'>
                    <img src='/images/avatar.png' alt='Mohamed Hasan' width='80' />
                    <div className='ms-xl-3 mt-3 mt-xl-0 text-center text-xl-start'>
                        <h2 className='h5 mb-1'>Mohamed Hasan</h2>
                        <p className='text-primary small mb-0'>@Mhmdhasan</p>
                        <p className='text-gray-500 small mb-0'>Basyun, Egypt</p>
                    </div>
                </div>

                {/* SIDEBAR MENU */}
                <ul className='sidebar-menu list-unstyled'>
                    <li className='sidebar-item'>
                        <NavLink to='/' className='sidebar-link'>
                            Home
                        </NavLink>
                    </li>
                    <li className='sidebar-item'>
                        <NavLink to='/currently-reading' className='sidebar-link'>
                            Currently Reading
                            <span className='badge ms-2'>{currently_reading.length}</span>
                        </NavLink>
                    </li>
                    <li className='sidebar-item'>
                        <NavLink to='/want-to-read' className='sidebar-link'>
                            Want to Read
                            <span className='badge ms-2'>{want_to_read.length}</span>
                        </NavLink>
                    </li>
                    <li className='sidebar-item'>
                        <NavLink to='/read' className='sidebar-link'>
                            Read
                            <span className='badge ms-2'>{read.length}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
