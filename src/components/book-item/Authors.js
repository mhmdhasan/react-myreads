import React from 'react';

function Authors({ authors }) {
    return (
        <p className='text-muted small text-gray-600 mb-1'>
            {authors.map((author, index) => (
                <span key={index}>
                    {author}
                    {index < authors.length - 1 && ', '}
                </span>
            ))}
        </p>
    );
}

export default Authors;
