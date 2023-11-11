import CONSTANTS from '../../../constants.json'

// Получаем значение языка из localStorage
const getCurrentLang = () => {

  let currentLang = localStorage.getItem(CONSTANTS.LocalStorageKeys.SelectLanguage)
  if(currentLang === null){
      localStorage.setItem(CONSTANTS.LocalStorageKeys.SelectLanguage, 'ru');
      return 'ru'
  }

  return currentLang;
}

export {
  getCurrentLang
}