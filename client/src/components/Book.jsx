import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../store/bookSlice';

const Book = ({ book }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='text-uppercase'>{book.title}</h5>
        <p>{book.author_name}</p>
        <div className='btn-group' role='group' aria-label='Basic example'>
          <Link
            className='btn btn-success btn-sm'
            to={`/edit-book/${book._id}`}
            key={book._id}
            state={{ book }}>
            Edit
          </Link>

          <Link
            className='btn btn-dark btn-sm'
            to={`/books-list/${book._id}`}
            // key={book._id}
          >
            Details
          </Link>

          <button
            onClick={() => handleDelete(book._id)}
            type='button'
            className='btn btn-danger btn-sm'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
