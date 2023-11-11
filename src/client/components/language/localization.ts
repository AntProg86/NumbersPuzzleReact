import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export interface IStrings extends LocalizedStringsMethods{
  _home: string;
  _about: string;
  language_switches: string;
  title: string;
  
  copy_to_clipboard: string;
  error: string;
  unknown_error_format: string;
  unknown_error: string;
  generate_error: string;
  start: string;
  rules: string;
  number: string;
  exactly: string;
  near: string;
  enter: string;
  you_lose: string;
  you_won: string;
  hidden_number: string;
  reset: string;
  i_can: string;
}

// Таблица перевода
let strings: IStrings;
  strings = new LocalizedStrings({
    ru: {
      _home: "Главная",
      _about: "Контакты",
      language_switches: "язык",
      title: "Головоломка с числами",

      error: 'Ошибка',
      copy_to_clipboard: 'Скопировать в буфер',
      unknown_error_format: 'Неизвестный формат ошибки',
      unknown_error: 'Неизвестная ошибка',
      generate_error: 'Сгенерировать ошибку',

      start: 'Начать',
      rules: 'Правила',
      number: 'Число',
      exactly: 'Точно',
      near: 'Рядом',
      enter: 'Ввод',
      you_lose: 'Вы проиграли',
      you_won: 'Вы выиграли',
      hidden_number: 'Загаданное число',
      reset: 'Сбросить',
      i_can: 'Я смогу!',
    },
    en: {
      _home: "Home",
      _about: "Contacts",
      language_switches: "language",
      title: "Numbers Puzzle",
      generate_error: 'Generate error',

      error: 'Error',
      copy_to_clipboard: 'Copy to Clipboard',
      unknown_error_format: 'Unknown error format',
      unknown_error: 'Unknown error',

      start: 'Start',
      rules: 'Rules',
      number: 'Number',
      exactly: 'Exactly',
      near: 'Near',
      enter: 'Enter',
      you_lose: 'You lose',
      you_won: 'You won',
      hidden_number: 'Hidden number',
      reset: 'Reset',
      i_can: 'I can!',
    },
  });
 
export default strings;