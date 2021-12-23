import React from 'react';
import { MdNearbyError } from 'react-icons/md';

function Error() {
    return (
        <section className='text-center py-5'>
            <MdNearbyError size='5rem' className='text-primary mb-4' />
            <h2>Oops! Something went wrong</h2>
            <p className='text-muted'>We're experiencing an error during loading books.</p>
        </section>
    );
}

export default Error;
