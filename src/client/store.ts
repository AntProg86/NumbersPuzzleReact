import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { Action, ApplicationState } from './types';

import languageSlice from './components/language/reducer';
import errorAbsoluteSlice from './components/errorAbsolute/reducer';

export const store = configureStore<ApplicationState, Action, Middleware[]>({
  reducer: {
    language: languageSlice.reducer,
    errorAbsolute: errorAbsoluteSlice.reducer,
  },
});
