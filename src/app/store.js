import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import authReducer from '../features/counter';
import { routerReducer } from 'react-router-redux';

export default configureStore({
  reducer: {
    routing: routerReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  // preloadedState: localStorage.getItem('reduxState')
  //   ? JSON.parse(localStorage.getItem('reduxState'))
  //   : {},
});
