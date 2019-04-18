/* @flow */

//============ Примеры типизации примитивных типов ==============

// Число. NaN и Infinity относятся к числам
const numberSuccess: number = 777;
const isNaN: number = NaN;
const isInfinity: number = Infinity;

// Строка
const successString: string = "my string";

// null
const exampleNull: null = null;

// undefined
const voidData: void = undefined;
// var data: void = null;

// Boolean
const isBoolean: boolean = false;

// Массивы
// пустые массивы не имеют типа, поэтому Object -> Array не правильно
const arr: Object = [];
// const arrArrayType: Array = []; // ошибка

// Массив элементы которого строки только строки
const arrMessages: Array<string> = ["hello", "world", "!"];

// Объекты
const emptyObject: Object = {};
const dataObject = {
  name: "Preethi",
  age: 26
};

// Функции. Типизация аргументов у функции
// Тип функции void потому что фунция ничего не возвращает
const emptyFuncArrow = (): void => {};
emptyFuncArrow();

function emptyFuncExpresion(): void {
  console.log("emptyFuncExpresion -->: Flow in func expression");
}
emptyFuncExpresion();

// Тип параметра string, а тип возвращаемой функции Function
const applySearchTerm = (searchTerm: string) => ({ searchTerm });
applySearchTerm("22");

function square(x: number, y: number) {
  return x + y;
}
square(4, 3);

/* Пример функции у которой 2й параметр не обязально должен быть и его
тип должен быть number */
const squareNoReturn = (x: number, y: ?number): void => {};
squareNoReturn(5, 5);

const calculateArea = (radius: number): number => {
  return 3.14 * radius * radius;
};
