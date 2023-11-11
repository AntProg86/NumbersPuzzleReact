import { createSlice } from '@reduxjs/toolkit';
import { SetLanguage } from './actions'; // Пример для API

const languageSlice = createSlice({
  name: 'language-application',
  initialState: {
    language: 'ru',
  },
  reducers: {
    ActionLanguageChange(state, action) {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase( // Пример для API
        SetLanguage.fulfilled,
        (state,  { meta: { arg }, payload }) => {  
            return { ...state, language: arg.language };
        },
      )
  },
});

export const {
  ActionLanguageChange,
} = languageSlice.actions;

export default languageSlice;
