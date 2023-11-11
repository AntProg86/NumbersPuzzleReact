import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../types';
import { LanguageState } from './types';
import { SetLanguage } from './actions'; // Пример для API
import { ActionLanguageChange } from './reducer';
import LocalizedStrings from './localization';

const Language: React.FunctionComponent = () => {

  const storeLanguage = useSelector<ApplicationState, LanguageState>((state) => state.language);

  // useDispatch - получение функции store.dispatch в компоненте. Раньше для вызова action функциональный компонент приходилось оборачивать в вызов connect
  const dispatch = useDispatch();

  // Смена языка
  const onClick = (language:string) => {
    // Изменяем язык
    LocalizedStrings.setLanguage(language);
    // Изменяем store, что бы render отработал по всему приложению
    dispatch(ActionLanguageChange(language));
    // dispatch(SetLanguage({ language } as { language: string })); // Пример для API
  };

  return (
    <div className='flexRow horizontal_right margin_top_5px'>
      {/* <div>NOW: {storeLanguage.language}</div> */}
      {/* <hr/> */}

      <p className='margin_right_5px'>{LocalizedStrings.language_switches + ' : ' }</p>
      <button className={storeLanguage.language === 'en'? 'background_color_yellow':''} 
        onClick={ () => onClick("en") }>
        EN
        </button >
      <button className={storeLanguage.language === 'ru'? 'background_color_yellow':''}
        onClick={ () => onClick("ru") }>
        RU
      </button>
    </div>
    
  );
};
    
export default Language;
