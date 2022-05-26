import { format } from 'date-fns';

export const setDark = (color: string) => {
  const number = Number(color.replace(' ', '').split(',')[1]) - 50;
  const colors = color
    .replace(' ', '')
    .split(',')
    .map((num, i) => (i === 1 ? number : num))
    .join();

  return colors;
};

export const setGradient = (
  colors: string[],
  callback?: (color: string) => string,
) => {
  const setColor = callback || ((value: string) => value);
  return `linear-gradient(90deg, ${setColor(colors[0])}, ${setColor(
    colors[1],
  )})`;
};

export const setFormatDate = (date: Date, formatDate?: string) =>
  format(date, formatDate || 'dd MMMM.');

//delete other symbols except numbers from string
export const clearOffExceptNumbers = (str: string) =>
  Number(str.replace(/[^0-9]/g, ''));

export const calcProgress = (x: number = 0, y: number = 0) => {
  return x ? 100 - Math.trunc((y * 100) / x) : 0;
};

export const setBetweenOfDate = (datecreated: Date, deadline: Date) => {
  const timeOfDeadline = new Date(deadline).getTime();
  const timeOfDateCreated = new Date(datecreated).getTime();
  const timeOfToday = new Date().getTime();
  return {
    term: timeOfDeadline - timeOfDateCreated,
    between: timeOfToday - timeOfDateCreated,
  };
};

export const deepEqual = <T>(obj1: T, obj2: T) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const setNextDay = (d: Date) => d.setDate(d.getDate() + 1);

const FIRST_ID = 1;

export const maxNumber = (data: number[]) => {
  if (data.length) {
    const ID = Math.max(...data);
    return FIRST_ID + ID;
  }
  return FIRST_ID;
};

export const setEscapingString = (value: string) =>
  value.replace(/<\/?[^>]+>/g, '');

//convert string to string with tags
export const toHtml = (value: string) => value.split('\n').join('<br>');

//if name too long so cut it
export const setShortName = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max)}...` : value;
