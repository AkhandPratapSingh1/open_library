import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookshelfPage from '../src/bookshelf_page/bookshelf';
import BookSearchPage from '../src/search_page/search_page';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookSearchPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
