import React, { useState, useEffect } from 'react';
import './BookCard.css';

const BookCard = ({ book, addToBookshelf }) => {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const currentBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    const bookExists = currentBookshelf.some(b => b.key === book.key);
    setIsAdded(bookExists);
  }, [book]);

  if (!book) {
    return null;
  }

  const title = book.title || 'No Title Available';
  const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
  const publisher = book.publisher ? book.publisher.join(', ') : 'Unknown Publisher';
  const editionCount = book.edition_count || 'Unknown Year';

  const handleAddToBookshelf = () => {
    addToBookshelf(book);
    setIsAdded(true);
  };

  return (
    <div className={`book-card ${isAdded ? 'added' : ''}`}>
      <h3>{title}</h3>
      <p className='author'>Author: {author}</p>
      <p className="publisher">Publisher: {publisher}</p>
      <p>Edition Count: {editionCount}</p>
      <button 
        className={isAdded ? 'added-button' : ''} 
        onClick={handleAddToBookshelf} 
        disabled={isAdded}
      >
        {isAdded ? 'Added to Bookshelf' : 'Add to Bookshelf'}
      </button>
    </div>
  );
};

export default BookCard;
