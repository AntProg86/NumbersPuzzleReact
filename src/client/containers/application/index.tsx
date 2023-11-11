import React, { useEffect } from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '../../types';
import { LanguageState } from '../../components/language/types';
import LocalizedStrings from '../../components/language/localization';
import ErrorAbsolutePage from '../../components/errorAbsolute';

import MainPage from '../main-page';
import AboutPage from '../about-page';
import Language from '../../components/language';

import 'devextreme/dist/css/dx.light.css';
import { ActionSetErrorMessageAbsolute } from '#client/components/errorAbsolute/reducer';

const Application: React.FunctionComponent = () => {
  
  // Получаем store языка, что бы произошел render на верхнеуровневом компоненте
  const storeLanguage = useSelector<ApplicationState, LanguageState>((state) => state.language);
  const dispatch = useDispatch();
  
  // Нажатие на кнопку 'Сгенерировать ошибку'
  const onClickSetError = () => {
    dispatch(ActionSetErrorMessageAbsolute("Сообщение об ошибке"));
  };
  
  // Меняем заголовок вкладки при изменении языка
  useEffect(() => {
    // Update the document title using the browser API
    document.title = LocalizedStrings.title;
  }, [storeLanguage.language]);

  return (
    <div>
      
      <Language />
      
      <div className='flexСontainer horizontal_right margin_top_3px'>
        <button 
          onClick={onClickSetError}>
          {LocalizedStrings.generate_error}
        </button >
      </div>

      <ErrorAbsolutePage /> 

      <div>
        <hr />
        <nav>
          <ul>
            <div className='flexRow horizontal_center'>

              <li>
                <Link to="/">{LocalizedStrings._home}</Link>
              </li>
              &nbsp;||&nbsp;
              <li>
                <Link to="/about">{LocalizedStrings._about}</Link>
              </li>
            </div>
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route exact path={ "/" } component={ MainPage } />
          <Route exact path={ "/about" } component={ AboutPage } />

          {/* Перенаправление на главную страницу, если вызванной не существует */}
          <Redirect to="/"/>
        </Switch>
      </div>
    </div>
  );
};

export default Application;
