import React from 'react';
import Authors from './book-item/Authors';
import ShelfChanger from './book-item/shelfChanger';
import Title from './book-item/Title';

function BookItem({ id, authors, title, imageLinks, shelf, prevShelf, coreFunction }) {
    return (
        <div className='book-item col-xl-3 col-lg-4 col-md-6'>
            {/* BOOKS THEMBNAIL */}
            <div className='book-poster  mb-4' style={{ backgroundImage: `url(${imageLinks.thumbnail})` }}></div>

            <div className='info-holder'>
                {/* CHANGE SHLEF SELECT INPUT */}
                <ShelfChanger id={id} shelf={shelf} prevShelf={prevShelf} coreFunction={coreFunction} />
                {/* BOOK TITLE */}
                <Title title={title} />
                {/* BOOK AUTHORS */}
                <Authors authors={authors} />
            </div>
        </div>
    );
}

BookItem.defaultProps = {
    authors: ['No authors found'],
    imageLinks: {
        smallThumbnail: 'https://via.placeholder.com/300x500?text=No+Poster+Available',
        thumbnail: 'https://via.placeholder.com/600x1000?text=No+Poster+Available',
    },
};

export default BookItem;
