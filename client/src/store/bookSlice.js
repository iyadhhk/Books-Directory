import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// get all books
export const getBookList = createAsyncThunk(
  'book/getAll',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// get one book by ID
export const getBookById = createAsyncThunk(
  'book/getBookByID',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// add new book
export const createBook = createAsyncThunk(
  'book/createBook',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editBook = createAsyncThunk(
  'book/editBook',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/books/${formData.id}`,
        formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/books/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    bookList: null,
    currentBook: null,
    bookStatus: {
      create: 'idle',
      edit: 'idle',
      delete: 'idle',
      getList: 'idle',
      getOne: 'idle',
    },
    bookErrors: { create: null, edit: null, delete: null, getList: null, getOne: null },
  },
  reducers: {},
  extraReducers: {
    [getBookList.pending]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, getList: 'loading' },
      };
    },
    [createBook.pending]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, create: 'loading' },
      };
    },
    [getBookById.pending]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, getOne: 'loading' },
      };
    },
    [editBook.pending]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, edit: 'loading' },
      };
    },
    [deleteBook.pending]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, delete: 'loading' },
      };
    },
    [getBookList.fulfilled]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, getList: 'succeded' },
        bookErrors: { ...state.bookErrors, getList: null },
        bookList: action.payload,
      };
    },
    [getBookById.fulfilled]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, getOne: 'succeded' },
        bookErrors: { ...state.bookErrors, getOne: null },
        currentBook: action.payload,
      };
    },
    [createBook.fulfilled]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, createBook: 'succeded' },
        bookErrors: { ...state.bookErrors, createBook: null },
        currentBook: action.payload,
      };
    },
    [editBook.fulfilled]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, edit: 'succeded' },
        bookErrors: { ...state.bookErrors, edit: null },
        currentBook: action.payload,
      };
    },
    [deleteBook.fulfilled]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, delete: 'succeded' },
        bookErrors: { ...state.bookErrors, delete: null },
        currentBook: action.payload,
      };
    },

    [getBookList.rejected]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, getList: 'failed' },
        bookErrors: { ...state.bookErrors, getList: action.payload },
      };
    },
    [getBookById.rejected]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, getOne: 'failed' },
        bookErrors: { ...state.bookErrors, getOne: action.payload },
      };
    },
    [createBook.rejected]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, create: 'failed' },
        bookErrors: { ...state.bookErrors, create: action.payload },
      };
    },
    [editBook.rejected]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, edit: 'failed' },
        bookErrors: { ...state.bookErrors, edit: action.payload },
      };
    },
    [deleteBook.rejected]: (state, action) => {
      return {
        ...state,
        bookStatus: { ...state.bookStatus, delete: 'failed' },
        bookErrors: { ...state.bookErrors, delete: action.payload },
      };
    },
  },
});

// export const { increment, decrement, incrementByAmount } = bookSlice.actions;
export default bookSlice.reducer;
