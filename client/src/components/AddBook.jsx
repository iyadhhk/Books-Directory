import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../store/bookSlice';

const AddBook = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: '',
    author_name: '',
    total_pages: '',
    rating: '',
    publisher_name: '',
    published_date: '',
  });
  const { title, author_name, total_pages, rating, publisher_name, published_date } =
    values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createBook(values));
  };
  const { bookStatus } = useSelector((state) => state.book);
  const clearForm = () => {
    setValues({
      title: '',
      author_name: '',
      total_pages: '',
      rating: '',
      publisher_name: '',
      published_date: '',
    });
  };
  useEffect(() => {
    if (bookStatus.create === 'succeded') clearForm();
  }, [bookStatus.create]);

  return (
    <div>
      {' '}
      <form onSubmit={onSubmit} className=' row g-2'>
        <div className='mb-3 col-md-6'>
          <label className='form-label'>Title</label>
          <input
            className='form-control'
            type='text'
            placeholder='Title of Book'
            name='title'
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3 col-md-6'>
          <label className='form-label'>Author</label>
          <input
            className='form-control'
            type='text'
            placeholder='Name of the Author'
            name='author_name'
            value={author_name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3 col-md-6'>
          <label className='form-label'>Total Pages</label>
          <input
            className='form-control'
            type='number'
            placeholder='Number of pages'
            name='total_pages'
            value={total_pages}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3 col-md-6'>
          <label className='form-label'>Rating</label>
          <input
            className='form-control'
            type='number'
            placeholder='Rate of the book'
            name='rating'
            value={rating}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3 col-md-6'>
          <label className='form-label'>Publisher</label>
          <input
            className='form-control'
            type='text'
            placeholder='Name of the Publisher'
            name='publisher_name'
            value={publisher_name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3 col-md-6'>
          <label className='form-label'>Published Date</label>
          <input
            className='form-control'
            type='date'
            placeholder='Date of the Publish'
            name='published_date'
            value={published_date}
            onChange={handleChange}
          />
        </div>

        <input type='submit' value='Save Task' className='btn btn-dark ' />
      </form>
    </div>
  );
};

export default AddBook;
