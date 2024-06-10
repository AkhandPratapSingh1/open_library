import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import SearchBar from '../component/searchbar';
import BookList from '../component/booklist';
import './styles/search_style.css';

const BookSearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  const fetchBooks = useCallback(debounce(async (searchQuery) => {
    if (searchQuery.trim() === '') {
      setBooks([]);
      return;
    }

    // Check cache first
    if (cache[searchQuery]) {
      setBooks(cache[searchQuery]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`);
      setBooks(response.data.docs);
      setCache((prevCache) => ({
        ...prevCache,
        [searchQuery]: response.data.docs,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, 1), [cache]);

  useEffect(() => {
    fetchBooks(query);

    return () => {
      fetchBooks.cancel(); // Cancel the debounce function on component unmount
    };
  }, [query, fetchBooks]);

  const bookshelfStore = {
    get: () => JSON.parse(localStorage.getItem('bookshelf')) || [],
    set: (books) => localStorage.setItem('bookshelf', JSON.stringify(books)),
  };

  const addToBookshelf = (book) => {
    const currentBookshelf = bookshelfStore.get();
    bookshelfStore.set([...currentBookshelf, book]);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <SearchBar
            query={query}
            setQuery={setQuery}
          />
          <a href="/bookshelf" className="bookshelf-button">My Bookshelf</a>
        </div>
      </nav>
      {loading ? <div>Loading...</div> : <BookList books={books} addToBookshelf={addToBookshelf} />}
    </div>
  );
};

export default BookSearchPage;
