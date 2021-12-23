import React, { useEffect, useReducer, useContext } from 'react';
import { reducer } from '../reducer/app_reducer';
import { api, headers } from '../BooksAPI.js';

// Create the app context
const AppContext = React.createContext();

// Define the initial state
export const initialState = {
    books: [],
    search_results: [],
    search_error: false,
    search_loading: false,
    top_rated_books: [],
    large_books: [],
    want_to_read: [],
    read: [],
    currently_reading: [],
    get_books_loading: false,
    get_books_error: false,
};

// Working with the provider
export function AppProvider({ children }) {
    // Define the reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // Fetching all books
    async function fetchBooks() {
        dispatch({ type: 'GET_BOOKS_START' });
        try {
            const res = await fetch(`${api}/books`, { headers });
            const data = await res.json();
            dispatch({ type: 'GET_BOOKS_SUCCESS', payload: data.books });
        } catch (err) {
            console.log(err);
            dispatch({ type: 'GET_BOOKS_ERROR' });
        }
    }

    // Search books
    async function searchBooks(query) {
        dispatch({ type: 'SEARCH_BOOKS_START' });
        try {
            if (query) {
                const res = await fetch(`${api}/search`, {
                    method: 'POST',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });
                const data = await res.json();

                if (data.books.hasOwnProperty('error')) {
                    dispatch({ type: 'SEARCH_BOOKS_NOT_FOUND' });
                } else {
                    const books = data.books.map((obj) => state.books.find((o) => o.id === obj.id) || obj);
                    dispatch({ type: 'SEARCH_BOOKS_SUCCESS', payload: books });
                }
            } else {
                dispatch({ type: 'RESET_SEARCH_RESULTS' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Update book shelf
    async function update(id, shelf) {
        try {
            const res = await fetch(`${api}/books/${id}`, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ shelf }),
            });
            const data = await res.json();
            dispatch({ type: 'CHANGE_BOOK_SHELF', payload: data });
        } catch (err) {
            console.log(err);
        }
    }

    // Update books state with new shelfs
    function updateBooks(e, id) {
        const newBooks = state.books.map((book) => {
            if (book.id === id) {
                book.shelf = e.target.value;
            }
            return book;
        });
        if (state.books.filter((book) => book.id === id).length === 0) {
            dispatch({ type: 'UPDATE_BOOK_SHELFS', payload: newBooks });
        }
    }

    // Add new book from the search results to book state
    function addNewBook(e, id) {
        const newBooks = state.search_results.filter((book) => {
            if (book.id === id) {
                book.shelf = e.target.value;
            }
            return book.id === id;
        });
        const updatedBooks = state.books.map((book) => {
            if (book.id === id) {
                book.shelf = e.target.value;
            }
            return book;
        });
        if (state.books.filter((book) => book.id === id).length === 0) {
            dispatch({ type: 'ADD_NEW_BOOK', payload: [...updatedBooks, ...newBooks] });
        } else {
            dispatch({ type: 'UPDATE_BOOK_SHELFS', payload: updatedBooks });
        }
    }

    // Start fetching Books data from API on first render
    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <AppContext.Provider value={{ ...state, searchBooks, update, updateBooks, addNewBook }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
