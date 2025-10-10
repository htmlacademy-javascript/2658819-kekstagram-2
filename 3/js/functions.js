const isNoMore = (myString, givenLength) => (myString.length <= givenLength);

/* eslint-disable */ console.log(isNoMore('Hello World!', 15));
console.log(isNoMore('проверяемая строка', 20));
console.log(isNoMore('проверяемая строка', 18));
console.log(isNoMore('проверяемая строка', 10));


function isPalindrome(myString) {
  // Приводим строку к нижнему регистру и удаляем небуквенно-цифровые символы
  const cleanedString = myString.toLowerCase().replace(/[^a-zа-я0-9]/g, '');
  const reversedString = cleanedString.split('').reverse().join('');
  return cleanedString === reversedString;
}

console.log(isPalindrome('топот'));
console.log(isPalindrome('hello world'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));


function extractNumber(myString) {
  const str = typeof myString === 'number' ? myString.toString() : myString;
  const extractedString = str.replace(/\D/g, '');
  return (+extractedString === 0) ? (extractedString/0) : +extractedString;
}

console.log(extractNumber('2023 год'));
console.log(extractNumber('ECMAScript 2022'));
console.log(extractNumber('1 кефир, 0.5 батона'));
console.log(extractNumber('агент 007'));
console.log(extractNumber('а я томат'));
console.log(extractNumber(2023));
console.log(extractNumber(-1));
console.log(extractNumber(1.5));


function extractDigitsAndGetNumbers(myString) {
  let digitsString = '';
  const str = typeof myString === 'number' ? myString.toString() : myString;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const num = parseInt(char, 10); // Преобразуем символ в число

    // Проверяем, является ли результат числом (не NaN)
    if (!Number.isNaN(num)) {
      digitsString += char;
    }
  }

  if (digitsString.length === 0) {
    return NaN; // Если цифр не найдено
  } else {
    return parseInt(digitsString, 10); // Преобразуем строку с цифрами в целое число
  }
}

console.log(extractDigitsAndGetNumbers('2023 год'));
console.log(extractDigitsAndGetNumbers('ECMAScript 2022'));
console.log(extractDigitsAndGetNumbers('1 кефир, 0.5 батона'));
console.log(extractDigitsAndGetNumbers('агент 007'));
console.log(extractDigitsAndGetNumbers('а я томат'));
console.log(extractDigitsAndGetNumbers(2023));
console.log(extractDigitsAndGetNumbers(-1));
console.log(extractDigitsAndGetNumbers(1.5));

