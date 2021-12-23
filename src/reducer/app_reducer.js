// Manage state through the app reducer
export function reducer(state, action) {
    /* ===============================================================
    🕒 START FETCHING BOOKS ACTION
        • Show some loader until the fetching is complete 
    =============================================================== */
    if (action.type === 'GET_BOOKS_START') {
        return { ...state, get_books_loading: true };
    }

    /* ===============================================================
    ✅ BOOKS IS FETCHED SUCCESSFULLY
        • Hide the loader after fetching completion
        • Save fetched data into books state 
        • Remove any previous errors
        • Remove the loader indicator
        • Organize fetched data according to thier shelfs  
        • Organize fetched data to 2 additional categories [Top Rated, Large Books]
    =============================================================== */
    if (action.type === 'GET_BOOKS_SUCCESS') {
        return {
            ...state,
            books: action.payload,
            get_books_loading: false,
            get_books_error: false,
            top_rated_books: action.payload.filter((book) => book.averageRating >= 3.5),
            large_books: action.payload.filter((book) => book.pageCount >= 500),
            want_to_read: action.payload.filter((book) => book.shelf === 'wantToRead').map((book) => book.id),
            read: action.payload.filter((book) => book.shelf === 'read').map((book) => book.id),
            currently_reading: action.payload
                .filter((book) => book.shelf === 'currentlyReading')
                .map((book) => book.id),
        };
    }

    /* ===============================================================
    🟠 ERROR WHILE FETCHING BOOKS
        • Hide the fetching loader
        • Show an error message
    =============================================================== */
    if (action.type === 'GET_BOOKS_ERROR') {
        return { ...state, get_books_loading: false, get_books_error: true };
    }

    /* ===============================================================
    🕒 START SEARCHING ACTION
        • Show some loader until the searching is complete  
        • Remove any previous search errors
    =============================================================== */
    if (action.type === 'SEARCH_BOOKS_START') {
        return { ...state, search_loading: true, search_error: false };
    }

    /* ===============================================================
    ✅ SEARCH RESULTS IS FETCHED SUCCEFULLY
        • Temporary save the search data into app state
        • Remove the loader indicator
        • Remove any previous search errors
    =============================================================== */
    if (action.type === 'SEARCH_BOOKS_SUCCESS') {
        return {
            ...state,
            search_results: action.payload,
            search_error: false,
            search_loading: false,
        };
    }

    /* ===============================================================
    ⚠️ SEARCHING ACTION RETURNS NO VALUE
        • Hide the fetching loader
        • Show message tells that no matches found
        • Remove previous search data from app state
    =============================================================== */
    if (action.type === 'SEARCH_BOOKS_NOT_FOUND') {
        return { ...state, search_error: true, search_loading: false, search_results: [] };
    }

    /* ===============================================================
    ⚠️ RESET SEARCH RESULTS [The user remove his search query]
        • Hide the fetching loader
        • Show message tells that no matches found
        • Remove previous search data from app state
    =============================================================== */
    if (action.type === 'RESET_SEARCH_RESULTS') {
        return { ...state, search_error: false, search_loading: false, search_results: [] };
    }

    /* ===============================================================
    📘 CHANGING THE BOOK SHELF
        • Re-organize the books on shelfs according to the new IDs
    =============================================================== */
    if (action.type === 'CHANGE_BOOK_SHELF') {
        return {
            ...state,
            want_to_read: action.payload.wantToRead,
            read: action.payload.read,
            currently_reading: action.payload.currentlyReading,
        };
    }

    /* ===============================================================
    📘 UODATING THE BOOKS STATE WITH NEW SHELFS
        • Push the new shelf into books with corresponding ID
    =============================================================== */
    if (action.type === 'UPDATE_BOOK_SHELFS') {
        return {
            ...state,
            books: action.payload,
        };
    }

    /* ===============================================================
    📙 INSERT NEW BOOK
        • Add new book to books state from search results
    =============================================================== */
    if (action.type === 'ADD_NEW_BOOK') {
        return {
            ...state,
            books: action.payload,
        };
    }

    /* ===============================================================
    🟠 THROUGH ERROR IF ACTION IS NOT FOUND
        • Show an indicator error if the dev is trying to dispactch
          an action that is not existing in the reducer 
    =============================================================== */
    throw new Error(`There's no matching ${action.type} - action type`);
}
