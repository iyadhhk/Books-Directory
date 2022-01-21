import React, { useEffect } from 'react';
import './App.css';
import { Link, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookList } from './store/bookSlice';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Books from './components/Books';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <div className='container my-5'>
      <h1>Books Directory</h1>
      <nav className='nav'>
        <Link to='/add-book' className='nav-link'>
          new Book
        </Link>
        <Link to='/books-list' className='nav-link'>
          List of Books
        </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Navigate to='/books-list' />} />
        <Route path='add-book' element={<AddBook />} />
        <Route path='edit-book/:id' element={<EditBook />} />

        <Route path='books-list' element={<Books />} />
        <Route path='books-list/:bookId' element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
