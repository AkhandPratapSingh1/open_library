import React, { useState, useEffect } from 'react';
import './styles/bookshelf_style.css';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    setBookshelf(JSON.parse(localStorage.getItem('bookshelf')) || []);
  }, []);

  const removeFromBookshelf = (index) => {
    const updatedBookshelf = bookshelf.filter((_, i) => i !== index);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="bookshelf-container">
      <h1>My Bookshelf</h1>
      {bookshelf.map((book, index) => (
        <div key={index} className="book-item">
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
          </div>
          <button className="delete-button" onClick={() => removeFromBookshelf(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookshelfPage;
