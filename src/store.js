import { configureStore } from '@reduxjs/toolkit'
import userReducer from './components/userSlice';
import { apiSlice } from './components/apiSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath] : apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([apiSlice.middleware])
})