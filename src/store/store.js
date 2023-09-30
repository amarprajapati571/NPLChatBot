import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { NLPServer } from '../Services/MessageSlice';
export const store = configureStore({
  reducer: {
    [NLPServer.reducerPath]: NLPServer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(NLPServer.middleware),
})

setupListeners(store.dispatch)