const getRandomInteger = (min:number, max:number) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

//Сгенерировать число-загадку
//1.Все цифры разные; 
//2.Первая цифра - не ноль.
export const getPuzzleNumber = () => {
  let firstDigit = getRandomInteger(1, 9)
  let secondDigit  = getRandomInteger(0, 9)

  while(secondDigit === firstDigit)
    secondDigit = getRandomInteger(0, 9)

  let thirdDigit = getRandomInteger(0, 9)

  while(thirdDigit === firstDigit || thirdDigit === secondDigit)
    thirdDigit = getRandomInteger(0, 9)
  
  
  let fourthDigit = getRandomInteger(0, 9)

  while(
      fourthDigit === firstDigit ||
      fourthDigit === secondDigit ||
      fourthDigit === thirdDigit
    )
    fourthDigit = getRandomInteger(0, 9)
  
  return Number(`${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`)
}

//Поиск дубликатов в массиве
export const findDuplicates = (arr:Array<number>) : boolean => {
  return (new Set(arr)).size !== arr.length;
}