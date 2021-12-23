import React from 'react';
import BookList from '../components/BookList';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useAppContext } from '../context/app_context';

function App() {
    const { get_books_loading: loading, get_books_error: error } = useAppContext();

    // Render a simple loader until the fetching data has been completed
    if (loading) return <Loader />;

    // Render an error message if the fetching went wrong
    if (error) return <Error />;

    // Render Book List component after fetching completion
    return <BookList />;
}

export default App;
