/* @flow */

// Типизация аргументов у функции
function square(x: number, y: number) {
  return x + y;
}
square(4, 3);

const squareNoReturn = (x: number, y: number): void => {};
squareNoReturn(5, 5); // почему то не покрыто

const togglePopover = (): number => {
  console.log("togglePopover func");
  return 5;
};
togglePopover();

function foo(x: ?string): string {
  if (x) {
    return x;
  }
  return "default string";
}
foo();

/* Пример если в массиве нужен конкретный тип элемента */
function phoneFunc(): string {
  return "23";
}
const objOfPhone = {
  name: "Cool"
};
let phones: Array<string> = ["apple", "lg", phoneFunc()];
// console.log('phones:', phones)

// Кастомные типы
type Player = "some player";
type Snapshot = {
  /* через символ | указываем несколько обязательных типов */
  result: "turn" | "draw" | "win",

  /* если у свойства в объекте Snapshot стоит в конце знак ?, то это
  значит, что свойство в этом объекте может быть, а может не быть.
  Так же это приминимо и к значениям в свойстве. */
  player?: Player,
  total: ?number
};

const toss = () => {
  return Math.random() > 0.5 ? "X" : "O";
};

/*
  Если надо указать, чтобы в объекте использовались только конкретные поля и только,
  используем анатацию :{||}, внутри которой перечисляем свойства. Любые
  другие приведут к ошибке, т.е добавить\удалить уже нельзя и будет ошибка.
*/
// const TicTacToe: {|
//   initial: () => Snapshot,
//   next: (Snapshot, number, number) => Snapshot
// |} = {
//   initial: () => ({
//     field: "some field",
//     result: "turn",
//     player: toss()
//   })
//
//   next: (snapshot, row, column) => {
//     if (snapshot.result !== "turn") {
//       return snapshot;
//     }
//
//     return {
//       field: "some field",
//       result: "draw"
//     };
//   }
// };
