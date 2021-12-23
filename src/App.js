import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { GrChapterAdd } from 'react-icons/gr';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import WantToRead from './pages/WantToRead';
import CurrentlyReading from './pages/CurrentlyReading';
import Read from './pages/Read';
import Search from './pages/Search';

function App() {
    const location = useLocation();

    return (
        <main className='p-4'>
            <div className='row g-5 align-items-stertch'>
                {/* RENDER APP SIDEBAR */}
                <div className='col-lg-3'>
                    <Sidebar />
                </div>

                {/* RENDER APP PAGES */}
                <div className='col-lg-9'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/want-to-read' element={<WantToRead />} />
                        <Route path='/currently-reading' element={<CurrentlyReading />} />
                        <Route path='/read' element={<Read />} />
                        <Route path='/search' element={<Search />} />
                    </Routes>
                </div>
            </div>

            {/* REMOVE SEARCH LINK FROM SEARCH PAGE */}
            {location.pathname !== '/search' ? (
                <Link to='/search' className='search-link'>
                    <GrChapterAdd className='search-link-icon' />
                </Link>
            ) : null}
        </main>
    );
}

export default App;
