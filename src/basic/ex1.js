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
/* пустые массивы имеют тип Array, но нужно обязательно указать тип объектов в
массиве. Так же не правильно указывать тип Object, с последних версий уже ошибка
*/
const arr: [] = [];
// const arrArrayType: Array = []; // ошибка
// const arrArrayType: Object = []; // ошибка т.к. не покрываем типом

// Массив элементы которого строки только строки
const arrMessages: Array<string> = ["hello", "world", "!"];

// Объекты
const emptyObject: {} = {}; // по возможности лучше не создавать пустые объекты
const dataObject = {
  name: "Preethi",
  age: 26
};
// создаем пустой объект но с ключами "любая строка": только number
const betterObject: {
  [key: string]: number
} = {};

// Объекты c возможностью сделать вызов функции. Колабл объекты
type FooType = {
  dropCache: Function,
  $call: (a: number) => number
};
declare var processAPI: FooType; // говорим что где-то есть функция process типа FooType
processAPI(2); // вызвали функцию с аргументом.
processAPI.dropCache(); // вызвали метод у объекта
// processAPI.anotherFunc() // ошибка

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
тип должен быть number, undefined, null */
const squareNoReturn = (x: number, y: ?number): void => {};
squareNoReturn(5, 5);

const calculateArea = (radius: number): number => {
  return 3.14 * radius * radius;
};

/* Статус ReadOnly для свойст и полей. Есть 2 вида синтаксиса: поставить плюс
перед свойством, что говорит, оно только для чтения и мутировать его нельзя, и
2й вариант - поставить $ReadOnly перед синтаксисом <>.
*/
type Reservation = {
  +uuid: string
};

type ReservationProps = $ReadOnly<{|
  emptyTableMessage?: string,
  loading?: boolean,
  refreshing?: boolean,
  onRowClick?: () => void
|}>;

// Еще один вид объектов с дженериками
// key defaults to string, the value is specified as generic
export type Hash<V, K = string> = { [K]: V };
type Props = {|
  style: Hash<string>,
  activeReservations: Hash<Array<Reservation>>
|};

/* Если есть глобальные объекты с process.env, мы должны написать свой declare
тип-заглушку для них */
declare class process {
  static env: { [string]: string };
}

// Как использовать. К примеру есть переменная в env.ANNOUNCEMENTS_URI
// config.js
export default {
  announcements: {
    uri: process.env.ANNOUNCEMENTS_URI
  }
};

// avatar.jsx
/*
import config from 'config';
render() {
  <img src={`${config.announcements.uri}/avatar_by_uuid?uuid=${userInfo.id}`}/>
}
*/

// Для тиизации объектов с window тоже пишутся стабы
declare var window: {|
  location: Location,
  confirm: string => boolean,
  btoa: string => string,
  open: string => void,
  scrollTo: (number, number) => void,
  addEventListener: (string, Function, ?boolean) => void,
  removeEventListener: (string, Function, ?boolean) => void,
  requestAnimationFrame: Function => void
|};

/*
 ================ Типизация СSS Modules. ==============
Несколько вариантов:
1. Пишем declare-заглушку в файле CSSModule.js.flow с прагмой @flow strict
 --> declare export default { [key: string]: string };
 и добавляем в flowconfig секцию  [options] путь к заглушке.
 module.name_mapper.extension='css' -> '<PROJECT_ROOT>/path/CSSModule.js.flow'
 module.name_mapper.extension='scss' -> '<PROJECT_ROOT>/path/CSSModule.js.flow'
*/

/*
2. Используем библиотеку css-modules-flow-types которая сгенерирует все
стабы-заглушки для каждого css файла. Дальше импортим и используем.
declare module.exports: {|
  +myClass: string,
  +primary: string
|};
*/

/*
3. Используем библиотеку css-module-flow, это вынесенный стаб из варианта 1
В конфиг добавляем
[options]
module.name_mapper='^.*\.css$' -> 'css-module-flow'
*/
