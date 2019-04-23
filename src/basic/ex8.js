/* @flow */
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from "redux";
import { createStore, applyMiddleware, compose } from "redux";

//============ Примеры Redux Store ==============

type FooAction = { type: "FOO", foo: string };
type BarAction = { type: "BAR", bar: boolean };
type Action = FooAction | BarAction;

// import type { Action } from './Action';
// import type { State } from './State';

const accountsReducer = () => {};

// RootReducer
const rootReducer = {
  accountsReducer
};

// export type Store = ReduxStore<State, Action>;
