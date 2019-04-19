/* @flow */

//============ Примеры типизации для Redux ==============

//Типизация стейта.

const initialState = {
  loaded: false,
  data: [],
  error: false
}

// При типизации стейта приходится дублировать все свойства
type StateTypes = {| loaded: boolean, data: Array<{}>, error: ?boolean |};
// Чтобы не дублировать можно делать через typeof.
type State = typeof initialState;

/* Если в сторе значение у поля было null, то при деструктуризации и
копировании стора Flow все значения с null пропустит. */
type StateSpred = {|
  ...typeof initialState,
  error: ?boolean,
  currentUuid: ?string
|};
