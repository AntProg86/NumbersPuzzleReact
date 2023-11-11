import React, {useContext, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalizedStrings from '../language/localization';
import './styles.css';

import { ApplicationState } from '../../types';
import { ErrorAbsoluteState } from './types';
import { ActionSetErrorMessageAbsolute } from './reducer'
import cross_1 from '../../../assets/pictures/cross_1.png';

type State = {
  count: number; // Счетчик для постоянного обновления state. С хуками необходимо обязательно менять в таймере state
  secParam: number; // Количество секунд, через которое спрячется сообщение об ошибке
  timer: number; // Таймер отсчитывает тики до закрытия окна с ошибкой
  lastErrorMessage: string; // Последняя ошибка, которая пришла в компонент
};
 
const ErrorAbsolutePage: React.FunctionComponent = () => {
  const [state, changeState] = useState<State>(
  { 
    count: 0,
    timer: 0,
    secParam: 6,
    lastErrorMessage: '',
  });

  // useDispatch - получение функции store.dispatch в компоненте. Раньше для вызова action функциональный компонент приходилось оборачивать в вызов connect
  const dispatch = useDispatch();

  const storeErrorAbsolute = useSelector<ApplicationState, ErrorAbsoluteState>((state) => state.errorAbsolute);

  useEffect(()=>{
    const timer = setInterval(() => {timerTick();}, 1000); 
    return () => clearInterval(timer);
  },[state.count, state.timer, state.lastErrorMessage])


  const timerTick = () =>  {
    // Счетчик для постоянного обновления state. С хуками необходимо обязательно менять в таймере state 
    if (state.count > 100){
      changeState((state) => ({
        ...state,
        count: 0,
      }));
    }
    else{
      changeState((state) => ({
        ...state,
        count: state.count + 1,
      }));
    }

    // Если есть ошибка, и таймер не дошел до закрытия ошибки
    if (storeErrorAbsolute.errorMessage && state.timer < state.secParam){
        // Если ошибка поменялась, обновляем счетчик
        if (state.lastErrorMessage !== storeErrorAbsolute.errorMessage){
          changeState((state) => ({
            ...state,
            timer: 0,
            lastErrorMessage: storeErrorAbsolute.errorMessage,
          }));
          return
        }
        // Прибавляем таймер
        else{
          changeState((state) => ({
            ...state,
            timer: state.timer + 1,
          }));
        }
    }

    // Закрываем ошибку по таймеру
    if (state.timer >= state.secParam){
      // Очищаем ошибку   
      dispatch(ActionSetErrorMessageAbsolute(''));

      changeState((state) => ({
        ...state,
        timer: 0,
        lastErrorMessage: '',
      }));
    }
  }

  // Очищаем ошибку по нажатию на крестик  
  const onClickClose = () => {
    // Очищаем ошибку   
    dispatch(ActionSetErrorMessageAbsolute(''));

    // Сбрасываем таймер
    changeState((state) => ({
      ...state,
      timer: 0,
    }));
  }

  // Помещаем содержимое textArea с ошибкой в буфер
  const handleCopyEventLog= () => {
    let copyText = document.getElementById("textareaErrorLog") as HTMLInputElement;
    copyText.select();
    document.execCommand("copy"); 
  }

  return (
  // Весь контейнер (если ошибки нет absolute_error_hide_message прячет сообщение об ошибке)
  <div className={'absolute_error_main_container '  + ((storeErrorAbsolute.errorMessage === '') ? 'absolute_error_hide_message' : '')}>
    {/* Блок, за исключением серых отступов главного блока */}
    <div className={'absolute_error_block ' + ((storeErrorAbsolute.errorMessage === '') ? 'absolute_error_block_none' : '')}>
      {/* Блок с ошибкой. Сюда не входит закрывющий окно крестик */}
      <div className='absolute_error_block_message'>

        {/* Верхний красный блочек. По сути Border-top */}
        <div className='absolute_error_block_color_top'>
          <div className="absolute_error_copy_buffer">
          <span className="absolute_error_cursor_pointer" onClick={() => handleCopyEventLog()}>{LocalizedStrings.copy_to_clipboard}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-files absolute_error_cursorpointer" viewBox="0 0 16 16" onClick={() => handleCopyEventLog()}>
                  <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
              </svg>
          </div>
        </div>
        
        <div className='absolute_error_block_content'>
          {/* Отступы текста об ошибке и заголовка ошибки от границ блока */}
          <div className='absolute_error_block_indent_message'>
            {/* Заголовок ошибки */}
            <div className='absolute_error_status_message'>
              {LocalizedStrings.error}
            </div>
            {/* Текст ошибки */}

            {
              Object.prototype.toString.call(storeErrorAbsolute.errorMessage) == '[object String]'
              ? // Если ошибка является строкой - выводим ошибку
              <textarea id="textareaErrorLog" 
                className="absolute_error_text_message" 
                readOnly 
                value={storeErrorAbsolute.errorMessage} 
              />
              : // Если ошибка НЕ является строкой - неизвестный формат ошиьки
              <textarea id="textareaErrorLog" 
                className="absolute_error_text_message" 
                readOnly 
                value={LocalizedStrings.unknown_error_format} 
              />
            }
          </div>
        </div>
      </div>

      {/* Крестик, закрывающий ошибку */}
      <div>
        <img className='absolute_error_img_cross' src={cross_1} onClick={() => onClickClose()} ></img>
        {/* Время до момента, когда ошибка спрячется */}
        <div className='absolute_error_timer'>{state.secParam - state.timer}</div>
      </div>
  </div>

</div>
  );
};
    
export default ErrorAbsolutePage;