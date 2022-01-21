import React, { useEffect } from 'react';
import Book from './Book';
import { useDispatch, useSelector } from 'react-redux';
import { getBookList } from '../store/bookSlice';
const Books = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookList());
  }, []);
  const { bookList } = useSelector((state) => state.book);
  return (
    <>
      {!bookList
        ? 'loading...'
        : bookList.map((book, index) => <Book key={index} book={book} />)}
    </>
  );
};

export default Books;
