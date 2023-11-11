import React, {useContext, useState, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LocalizedStrings from '../../components/language/localization';
import { ActionSetErrorMessageAbsolute } from '../../components/errorAbsolute/reducer'
import DxButton from 'devextreme-react/button';
import { DataGrid, NumberBox } from 'devextreme-react';
import { Column } from 'devextreme-react/data-grid';
import { findDuplicates, getPuzzleNumber } from './func';

interface EnteredNumber {
  id: number;
  number: number;
  exactly: string;
  near: string;
};

type State = {
  firstDigit: number;
  secondDigit: number;
  thirdDigit: number;
  fourthDigit: number;

  //Некорректный номер для ввода
  isNumberIncorrect: boolean;

  //Числа, введенные пользователем
  EnteredNumbers: Array<EnteredNumber>;

  //Загаданное число 
  RandomNumber: number;

  isGameOver: boolean;

  gameResult?: 'win' | 'lose';

  isShowRules: boolean;
  
};

type DigitBoxProps = {
  value: number;
  increment: any;
  decrement: any;
};

const initState = {
  firstDigit: 1,
  secondDigit: 2,
  thirdDigit: 3,
  fourthDigit: 4,
  isNumberIncorrect: false,
  EnteredNumbers: new Array<EnteredNumber>(),
  RandomNumber: 5374,
  isGameOver: false,
  isShowRules: false,
};

const MainPage: React.FunctionComponent = () => {

  // console.log('*-*-*-*-Render');

  const [state, changeState] = useState<State>(initState);

  // useDispatch - получение функции store.dispatch в компоненте. Раньше для вызова action функциональный компонент приходилось оборачивать в вызов connect
  const dispatch = useDispatch();

  //Определяет корректность пользовательского номера
  useEffect(()=>{
    
    if(state.firstDigit === 0){
      changeState((state) => ({
        ...state,
        isNumberIncorrect: true
      }))
      return
    }
    
    if(findDuplicates(getDigitsAsArray()) === true){
      changeState((state) => ({
        ...state,
        isNumberIncorrect: true
      }))
      return
    }

    if(state.isNumberIncorrect === true){
      changeState((state) => ({
        ...state,
        isNumberIncorrect: false
      }))
    }
    
  },[state.firstDigit, state.secondDigit, state.thirdDigit, state.fourthDigit]);

  //После 7-й неудачной попытки будет пройгрыш
  useEffect(()=>{
    if(state.EnteredNumbers.length === 7){
      changeState((state) => ({
        ...state,
        isGameOver: true,
        gameResult: 'lose'
      }))
    }
  },[state.EnteredNumbers]);
  const onClickReset = () => {
    changeState((state) => ({
      ...initState
    }))
  };

  const onClickRules = () => {
    changeState((state) => ({
      ...state,
      isShowRules: true
    }))
  };

  const onClickIcan = () => {
    changeState((state) => ({
      ...state,
      isShowRules: false
    }))
  };

  const changeDigit = (
    digit: 'firstDigit' | 'secondDigit' | 'thirdDigit' | 'fourthDigit',
    operation: 'increment' | 'decrement'
    ) => {
    
    //Цифра не должна быть меньше 0 или больше 9
    if(state[digit] === 0 && operation === 'decrement' 
    || state[digit] === 9 && operation === 'increment'){
      return
    }
    
    if(operation === 'increment'){
      changeState((state) => ({
        ...state,
        [digit]: state[digit] + 1
      }))
    }

    if(operation === 'decrement'){
      changeState((state) => ({
        ...state,
        [digit]: state[digit] - 1
      }))
    }
  };

  const getDigitsAsArray = () => {
    
    const digits = new Array<number>()
    
    digits.push(state.firstDigit)
    digits.push(state.secondDigit)
    digits.push(state.thirdDigit)
    digits.push(state.fourthDigit)

    return digits;
  };

  const getDigitsAsNumber = () => {
    return Number(`${state.firstDigit}${state.secondDigit}${state.thirdDigit}${state.fourthDigit}`)
  };

  //Получить маску для поля «Рядом»
  const getNear = () => {

    let _digArr = getDigitsAsArray()

    let _arr = Array.from(String(state.RandomNumber), Number)
    let _mask: string = ''
    
    for (let i = 0; i < _arr.length; i++){
      
      _digArr.push(_arr[i])
      
      if(findDuplicates(_digArr) === true && _digArr[i] !== _arr[i]){
        _mask = _mask + '-'
      }

      _digArr.pop();
    }
    
    return _mask;
  };

  //Получить маску для поля «Точно»
  const getExactly = () => {

    let _arr = Array.from(String(state.RandomNumber), Number)
    let _mask: string = ''

    if(state.firstDigit === _arr[0])
      _mask = _mask + '*'
    if(state.secondDigit === _arr[1])
      _mask = _mask + '*'
    if(state.thirdDigit === _arr[2])
      _mask = _mask + '*'
    if(state.fourthDigit === _arr[3])
      _mask = _mask + '*'
    
    return _mask
  };
  
  const checkNumber = (num:number) : boolean => {
    if(num === state.RandomNumber)
      return true
    return false
  };
  
  const EnterNumber = () => {

    const _enteredNumber = getDigitsAsNumber()

    if(checkNumber(_enteredNumber) === true){
      changeState((state) => ({
        ...state,
        isGameOver: true,
        gameResult: 'win'
      }))
      return
    }
    
    let _copy: Array<EnteredNumber> = Object.assign([], state.EnteredNumbers)
    
    let _id = _copy.length > 0 ? _copy[_copy.length - 1].id + 1 : 1
    
    let num: EnteredNumber = {
      id: _id,
      number: _enteredNumber,
      exactly: getExactly(),
      near: getNear()
    }

    _copy.push(num)

    changeState((state) => ({
      ...state,
      EnteredNumbers: _copy
    }))
  };
  
  const DigitBox = ({value, increment, decrement}:DigitBoxProps) => {
    return(
      <>
        <NumberBox
          value={value}
          readOnly={true}
          //disabled={true}
          className={state.isNumberIncorrect === true ? 'textColorRed margin_right_5px margin_left_5px fontSize_20px' : 'margin_right_5px margin_left_5px fontSize_20px'}
        />
        <div className='flexCol'>
          <DxButton
            onClick={increment}
            icon='plus'
            className='margin_bottom_3px'
          />
          <DxButton
            icon='minus'
            onClick={decrement}
          />
        </div>
      </>
    )
  };

  //TODO -> локализовать
  const Rules = () => {
    return(
      <>
        <div className='rulesContainer '>
          <div className='textBold'>
            Правила игры.
          </div>
          <div>
            Компьютер загадывает случайное четырехзначное число, 
            которое подчиняется двум правилам:
          </div>
          <br/>
          <div className='textBold'>
            1.Все цифры разные; 2.Первая цифра - не ноль.
          </div>
          <br/>
          <div>
            Вы должны отгадать это число, набирая свои варианты ответа (дается 7 попыток).
            Если введенное Вами число не противоречит 
            вышеперечисленным правилам, выводится результат попытки в виде:
          </div>
          <br/>
          <div>
            Точно - количество цифр (соответствует количеству "Звёздочек"), 
            которые есть и в загаданном числе и в Вашем варианте ответа, 
            причем стоят они точно на своих позициях.
          </div>
          <br/>
          <div>
            Рядом - количество цифр (соответствует количеству "Чёрточек"), 
            которые есть и в загаданном числе и в Вашем варианте ответа, 
            но стоят они на разных позициях.
          </div>
          <br/>
          <div>
            Пример: Компьютер загадал число 5649, Вы ввели 5940. 
            Результат этого хода: 2 точно, 1 рядом : точно угадана цифры 4 и 5, 
            рядом угадана цифра 9
          </div>
          <br/>
          <div>
            Внимание! Если после очередного хода остался единственный возможный 
            (а значит, и правильный) 
            вариант ответа - текущая попытка становится решающей и последней 
            - Вы либо выигрываете либо проигрываете!
          </div>

          <DxButton
            onClick={onClickIcan}
            text={LocalizedStrings.i_can}
            className='margin_right_5px'
          />
        </div>
      </>
    )
  };

  const test = () => {
    console.log('*-*-*-** test');
  };

  return (
    
    <div className='flexСontainer con_horizontal_center'>

      <div className='flexCol'>

        <div className='titleContainer margin_top_10px margin_bottom_10px'>
          <DxButton
            onClick={onClickReset}
            text={LocalizedStrings.reset}
            className='margin_right_5px'
          />

          <DxButton
            onClick={onClickRules}
            text={LocalizedStrings.rules}
          />

          {/* <DxButton
            onClick={test}
            text='test'
          /> */}
        </div>

        {state.isShowRules &&
          <Rules/>
        }
        
        {state.isGameOver &&
          <div className='infoContainer'>
            {state.gameResult === 'win' &&
              <>
                {LocalizedStrings.you_won}
              </>
            }
            {state.gameResult === 'lose' &&
              <>
              <div className='flexCol'>
                <div>
                  {LocalizedStrings.you_lose}
                </div>
                <div>
                  {LocalizedStrings.hidden_number + ' : ' + state.RandomNumber}
                </div>
              </div>
              </>
            }
          </div>
        }

        {!state.isGameOver && state.isShowRules === false &&
          <>
            <div>
              <DataGrid
                
                width={370}
                height={290}

                dataSource={state.EnteredNumbers}

                columnAutoWidth={true}
                // Минимальный размер столбца для всей страницы
                columnMinWidth={30}
                /*Включение resize столбцов*/
                allowColumnResizing={true}
                columnResizingMode={'widget'}

                // Включаем возможность перегруппировать столбцы
                allowColumnReordering={true}

                showBorders={true} // Показываем границы таблицы
                showRowLines={true} // Разделяем строки таблицы линиями

              >

                {/* -----------Попытка--------*/}
                <Column
                  caption=''
                  allowEditing={false}
                  dataField="id"
                  dataType="number"
                >
                </Column>

                {/* -----------Число--------*/}
                <Column
                  caption={LocalizedStrings.number}
                  //width={'5%'}
                  allowEditing={false}
                  dataField="number"
                  dataType="string"
                >
                </Column>

                {/* -----------Точно--------*/}
                <Column
                  caption={LocalizedStrings.exactly}
                  //width={'5%'}
                  allowEditing={false}
                  dataField="exactly"
                  name="exactly"
                  dataType="string"
                >
                </Column>

                {/* -----------Рядом--------*/}
                <Column
                  caption={LocalizedStrings.near}
                  //width={'5%'}
                  allowEditing={false}
                  dataField="near"
                  name="near"
                  dataType="string"
                >
                </Column>
                
              </DataGrid>
            </div>

            <div className='flexRow digitBoxContainer margin_top_5px'>
            
              <DigitBox
                value={state.firstDigit}
                increment={()=>changeDigit('firstDigit','increment')}
                decrement={()=>changeDigit('firstDigit','decrement')}
              />
              <DigitBox
                value={state.secondDigit}
                increment={()=>changeDigit('secondDigit','increment')}
                decrement={()=>changeDigit('secondDigit','decrement')}
              />
              <DigitBox
                value={state.thirdDigit}
                increment={()=>changeDigit('thirdDigit','increment')}
                decrement={()=>changeDigit('thirdDigit','decrement')}
              />
              <DigitBox
                value={state.fourthDigit}
                increment={()=>changeDigit('fourthDigit','increment')}
                decrement={()=>changeDigit('fourthDigit','decrement')}
              />

              <DxButton
                onClick={EnterNumber}
                text={LocalizedStrings.enter}
                className='margin_left_5px'
                disabled={state.isNumberIncorrect}
              />
            </div>
          </>
        }

        

      </div>
    </div>
  );
};
    
export default MainPage;
