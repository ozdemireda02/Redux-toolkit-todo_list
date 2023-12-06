import { configureStore } from '@reduxjs/toolkit';
import crudReducer from './slices/crudSlice';

export default configureStore({
    reducer: {
      crudReducer,
    },
  });