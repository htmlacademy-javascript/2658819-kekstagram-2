
const convertToMinutes = (timeString) => {
  // Используется синтаксис деструктуризации массива.
  // Метод split() разбивает строку на массив подстрок, используя символ ":" в качестве разделителя.
  // Метод map() создает новый массив, применяя функцию Number к каждому элементу исходного массива. Функция Number преобразует строковое значение в числовое.
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingInWorkHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartMinutes = convertToMinutes(workStart);
  const workEndMinutes = convertToMinutes(workEnd);
  const meetingStartMinutes = convertToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return (
    meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes
  );
};

/*
workStart = '8:00' - начало рабочего дня
workEnd = '17:30' - конец рабочего дня
meetingStart = '14:00' - начало встречи
meetingDuration = 90 - продолжительность встречи в минутах
*/
/* eslint-disable */
console.log(isMeetingInWorkHours('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingInWorkHours('8:0', '10:0', '8:0', 120));     // true
console.log(isMeetingInWorkHours('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingInWorkHours('14:00', '17:30', '08:0', 90));  // false
console.log(isMeetingInWorkHours('8:00', '17:30', '08:00', 900)); // false


