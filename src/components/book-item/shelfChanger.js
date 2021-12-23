import React, { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { useAppContext } from '../../context/app_context';
import { bookShelfs } from '../../utils/constants';

function ShelfChanger({ shelf, prevShelf, id, coreFunction }) {
    const { update } = useAppContext();
    const [currentShelf, setCurrentShelf] = useState(prevShelf ? prevShelf : shelf);

    function handleChange(e) {
        update(id, e.target.value);
        coreFunction(e, id);
        setCurrentShelf(e.target.value);
    }

    return (
        <>
            {/* SHELF SELECT INPUT */}
            <select
                className='form-select'
                name='book_shelf'
                value={prevShelf ? prevShelf : shelf}
                onChange={handleChange}
            >
                <option value='moveto' disabled>
                    Move to...
                </option>
                {Object.entries(bookShelfs).map(([key, value]) => {
                    return (
                        <option value={key} key={key}>
                            {value}
                        </option>
                    );
                })}
            </select>

            {/* SHELF IDENTIFIER */}
            <div
                className={`shelf-identifier small ${
                    currentShelf === 'currentlyReading'
                        ? 'pink'
                        : currentShelf === 'wantToRead'
                        ? 'primary'
                        : currentShelf === 'read'
                        ? 'info'
                        : null
                }`}
            >
                {currentShelf !== 'none' ? (
                    <span className='icon text-white me-2 rounded'>
                        <AiFillEye size='0.8rem' />
                    </span>
                ) : null}
                <span>
                    {currentShelf === 'currentlyReading' && 'Currently reading'}
                    {currentShelf === 'wantToRead' && 'Want to read'}
                    {currentShelf === 'read' && 'Read'}
                    {currentShelf === 'none' && ''}
                </span>
            </div>
        </>
    );
}

export default ShelfChanger;
