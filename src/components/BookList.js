import React from 'react';
import { useAppContext } from '../context/app_context';
import { MdStars } from 'react-icons/md';
import { ImBooks, ImStack } from 'react-icons/im';
import BookItem from './BookItem';

function BookList() {
    const { books, top_rated_books: topRated, large_books: largeBooks, updateBooks } = useAppContext();

    return (
        <>
            <div className='p-3'>
                {/* TOP TATED BOOKS */}
                <section className='mb-5'>
                    <h2 className='h3 heading'>
                        <MdStars className='icon' />
                        <span>
                            Top rated books <span className='badge'>{topRated.length} Books</span>
                        </span>
                    </h2>
                    <div className='row g-5'>
                        {topRated.map((book) => {
                            return <BookItem key={book.id} {...book} coreFunction={updateBooks} />;
                        })}
                    </div>
                </section>

                {/* LARGE SIZE BOOKS */}
                <section className='mb-5'>
                    <h2 className='h3 heading'>
                        <ImStack className='icon' />
                        <span>
                            Heavy load books <span className='badge'>{largeBooks.length} Books</span>
                        </span>
                    </h2>
                    <div className='row g-5'>
                        {largeBooks.map((book) => {
                            return <BookItem key={book.id} {...book} coreFunction={updateBooks} />;
                        })}
                    </div>
                </section>

                {/* ALL BOOKS */}
                <section className='mb-5'>
                    <h2 className='h3 heading'>
                        <ImBooks className='icon' />
                        <span>
                            Browse all your books <span className='badge'>{books.length} Books</span>
                        </span>
                    </h2>
                    <div className='row g-5'>
                        {books.map((book) => {
                            return <BookItem key={book.id} {...book} coreFunction={updateBooks} />;
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}

export default BookList;
