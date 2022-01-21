import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookById } from '../store/bookSlice';

const BookDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookById(params.bookId));
  }, [params]);
  const { currentBook, bookStatus } = useSelector((state) => state.book);
  return (
    <div className='card bg-light'>
      <h2 className='text-center fw-normal '>Book Details</h2>
      {bookStatus.getOne === 'succeded' && (
        <ul className='list-group'>
          <li className='list-group-item d-flex justify-content-between align-items-center '>
            Title
            <h6 className='text-uppercase'>{currentBook.title}</h6>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center '>
            Author
            <h6 className='text-uppercase'>{currentBook.author_name}</h6>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center '>
            Publisher
            <h6 className='text-uppercase'>{currentBook.publisher_name}</h6>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center '>
            Total Pages
            <span className='badge bg-primary rounded-pill'>
              {currentBook.total_pages}
            </span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            Rating
            <span className='badge bg-primary rounded-pill'>{currentBook.rating}</span>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            Date of Publish
            <span className='badge bg-primary rounded-pill'>
              {currentBook.published_date}
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default BookDetails;
