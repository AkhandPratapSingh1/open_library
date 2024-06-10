import React from 'react';
import BookCard from '../component/bookcard';
import './BookList.css';

const BookList = ({ books, addToBookshelf }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.key} book={book} addToBookshelf={addToBookshelf} />
      ))}
    </div>
  );
};

export default BookList;
