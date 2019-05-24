/* @flow */

//============ Пример с комбинацией типов. ==============

/*
Дано такой объект, в котором некоторые поля
могут иметь различные значения:
const footballer = {
  ball: "have", // don't have
  action: "leads"  // "pass", "hit", "take position", "take the ball"
  position: { x: 1, h: 2 }
};
*/
/* Типизируем объект с помощью композиции типов */

// Кастомные типы
type Player = string;
type Position = { x: number, y: number };
type HaveBall = {
  /* если у свойства в объекте стоит в конце знак ?, то это
  значит, что свойство в этом объекте может быть, а может не быть. */
  player?: Player,
  ball: "have",

  /* через символ | указываем конкретные только эти обязательные типы,
  других не может быть */
  action: "leads" | "pass" | "hit",

  /* если у значения стоит знак ? и тип, это значит, что значение может
  принимать: number, null, undefined */
  total: ?number,
  position: Position
};

// означает, что тип или string, или undefined, или null.
const message: ?string = null;

/*
А можно в типах юзать spread?
Да, только лучше через ...$Exact<A>. Без Exact ругался на undefined.
И если будут два поля одинаковых то тип объединиться а не презапишется
*/
type A = { kek: number }
type B = {
   ...A,
   lol: string
}


type ActionDontHaveBall = "take position" | "take the ball";
type DontHaveBall = {
  player?: Player,
  ball: "don't have",
  action: ActionDontHaveBall,
  total: ?number,
  position: Position
};
type Footballer = HaveBall | DontHaveBall;

const createdFootballer: Footballer = {
  player: "Dart Wayder",
  ball: "have",
  action: "hit",
  total: 0,
  position: { x: 1, y: 2 }
};

/*
  Если надо указать, чтобы в объекте использовались только конкретные поля и только,
  используем анатацию {||}, внутри которой перечисляем свойства. Любые
  другие приведут к ошибке, т.е добавить\удалить уже нельзя и будет ошибка.
*/
const TicTacToe: {|
  initial: () => Footballer,
|} = {
  initial: () => ({
    player: "R2D2",
    ball: "don't have",
    action: "take position",
    total: null,
    position: { x: 0, y: 0 }
  }),
};

// Конкретный компонент:
component = 'div' или () =><div/> // React$ElementType
componentNode = <div/> // React$Element

CompProps = { linkComp: 'string' | React$ComponentType<{href: string}>};
<Comp  linkComp='a' /> // work
<Comp  linkComp={(props{href: string}) => {}} /> // work
