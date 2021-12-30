import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import BookItem from '../components/BookItem';
import Loader from '../components/Loader';
import { useAppContext } from '../context/app_context';

function Search() {
    const {
        search_results: searchResult,
        search_error: error,
        search_loading: loading,
        searchBooks,
        addNewBook,
    } = useAppContext();
    const [searchText, setSearchText] = useState(null);

    useEffect(() => {
        searchBooks(searchText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    return (
        <section className='p-3'>
            {/* SEARCH FORM */}
            <form className='mb-5' onSubmit={(e) => e.preventDefault()}>
                <div className='row g-5'>
                    <div className='col-12 position-relative'>
                        <FiSearch className='search-icon' />
                        <input
                            type='search'
                            className='form-control bg-gray-100 app-search-input'
                            placeholder='Search books...'
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>
            </form>

            {/* SEARCH RESULTS */}
            <div className='row g-5'>
                {/* Number of books found */}
                {searchResult.length > 0 && !error && !loading ? (
                    <p className='text-muted text-center mb-0 mt-4'>
                        Found <strong className='fw-bold text-black'>{searchResult.length}</strong> Books matched your
                        search
                    </p>
                ) : null}

                {/* Return books from searching */}
                {searchResult.map((book, index) => {
                    return (
                        <BookItem
                            key={book.id}
                            {...book}
                            prevShelf={book.shelf ? book.shelf : 'moveto'}
                            coreFunction={addNewBook}
                            index={index}
                        />
                    );
                })}

                {/* Return not found message if there's no matching */}
                {error && searchText !== '' ? (
                    <p className='lead text-muted'>
                        There're no books that match <strong className='fw-bold text-black'>{searchText}</strong>
                    </p>
                ) : null}

                {/* Render a simple loader until the fetching data has been completed */}
                {loading && searchText !== '' ? <Loader /> : null}
            </div>
        </section>
    );
}

export default Search;
