import { createAsyncThunk } from '@reduxjs/toolkit';

type ThunkArgsLanguage = {
  language: string;
};

export const SetLanguage= createAsyncThunk<string, ThunkArgsLanguage>(
  'SetLanguage/action',
  ({
      language,
  })  => {
      return "OK";
  }
)