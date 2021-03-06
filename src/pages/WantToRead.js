import React from 'react';
import BookItem from '../components/BookItem';
import { ImBooks } from 'react-icons/im';
import { useAppContext } from '../context/app_context';
import Loader from '../components/Loader';
import Error from '../components/Error';

function WantToRead() {
    const { get_books_loading: loading, get_books_error: error, want_to_read, books, updateBooks } = useAppContext();
    const matchedBooks = books.filter((book) => want_to_read.includes(book.id));

    // Render a simple loader until the fetching data has been completed
    if (loading) return <Loader />;

    // Render an error message if the fetching went wrong
    if (error) return <Error />;

    return (
        <section className='p-3'>
            <h2 className='h3 heading'>
                <ImBooks className='icon' />
                <span>
                    Want to read books <span className='badge'>{matchedBooks.length} Books</span>
                </span>
            </h2>

            <div className='row g-5'>
                {matchedBooks.map((book, index) => {
                    return (
                        <BookItem
                            key={book.id}
                            {...book}
                            index={index}
                            prevShelf='wantToRead'
                            coreFunction={updateBooks}
                        />
                    );
                })}

                {matchedBooks.length === 0 ? <p className='text-muted'>There're no books at the moment.</p> : null}
            </div>
        </section>
    );
}

export default WantToRead;
