// @flow

declare module CSSModule {
  declare var exports: { [key: string]: string };
  declare export default typeof exports;
}

// declare module 'redux-actions' {
//   declare type ActionType = string
//
//   declare type Action<P> = {
//     type: ActionType,
//     payload?: P,
//     error?: bool,
//     meta?: any,
//   }
//
//   declare function createAction<T, P>(
//     type: ActionType,
//     payloadCreator?: (...args: Array<T>) => P,
//     metaCreator?: Function
//   ): (...args: Array<T>) => Action<P>
// }
