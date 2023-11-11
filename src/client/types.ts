import { AnyAction } from 'redux';
import { LanguageState } from './components/language/types';
import { ErrorAbsoluteState } from './components/errorAbsolute/types';

export type Action = AnyAction;

export type ApplicationState = {
  language: LanguageState;
  errorAbsolute: ErrorAbsoluteState;
};
