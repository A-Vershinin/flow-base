/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";

//============ Примеры Reducer and Redux-Action ==============

// Helper-типы экшенов для dispatch
type BaseAction = $ReadOnly<{ type: string, error?: string }>;
type ActionWithPayload<P> = $ReadOnly<{ ...BaseAction, payload: P }>;

type Action =
  | { type: "START_VERIFICATION" }
  | { type: "START_VERIFICATION_SUCCESS", payload: { result: {} } }
  | { type: "START_VERIFICATION_FAIL", payload: { message: "" } };

type PromiseAction = Promise<Action>;

type Dispatch = (action: Action | PromiseAction | Array<Action>) => any;

// helper extact util
type ExtractReturn<Fn> = $Call<<T>((...Iterable<any>) => T) => T, Fn>;

type ReduxProps<M, D> = $ReadOnly<{|
  ...ExtractReturn<M>,
  ...ExtractReturn<D>
|}>;

declare type ActionType = string;

declare type ActionUpdated = {
  type: ActionType,
  payload?: any,
  error?: boolean,
  meta?: any
};

declare function createActionType<T, P>(
  type: ActionType,
  payloadCreator?: (...args: Array<T>) => P,
  metaCreator?: Function
): (...args: Array<T>) => ActionUpdated<P>;

// Actions
const startVerification: Action = createAction("START_VERIFICATION");
const startVerificationSuccess: Action = createAction(
  "START_VERIFICATION_SUCCESS",
  result => result
);
const startVerificationFail: Action = createAction(
  "START_VERIFICATION_FAIL",
  message => message
);

// Reducer
const initialState = {
  loaded: false,
  error: null,
  data: {}
};

type State = {|
  ...typeof initialState,
  +error: ?string
|};

const handleStartVerification = (state: State) => ({
  ...state,
  loaded: false
});
// Более точная типизация экшенов с payload и без
const handleVerificationSuccess = (
  state: State,
  action: ActionWithPayload<{ result: {} }>
) => ({
  ...state,
  loaded: true,
  data: action.payload.result,
  error: null
});
const handleVerificationFail = (
  state: State,
  action: ActionWithPayload<{ message: string }>
) => ({
  ...state,
  loaded: false,
  data: {},
  error: action.payload.message
});

const verificataion: Reducer<State, Action> = handleActions(
  {
    [startVerification.toString()]: handleStartVerification,
    [startVerificationSuccess.toString()]: handleVerificationSuccess,
    [startVerificationFail.toString()]: handleVerificationFail
  },
  initialState
);

// ===================== Store & Redux Container ===================
const access = () => ({
  isAccess: false
});

const rootReducer = {
  verificataion,
  access
};

type GlobalState = $ObjMap<typeof rootReducer, ExtractReturn<*>>;
type OwnProps = {|
  // ownProps from container
|};

const mapStateToProps = (state: GlobalState, props: OwnProps) => ({
  isAccess: state.access.isAccess
});

// const mapDispatchToProps = (
//   dispatch: Dispatch<BaseAction>,
//   props: OwnProps
// ) => ({
//   onLogin: user => {
//     dispatch(startVerification());
//   }
// });

const mapDispatchToProps = (
  dispatch: Dispatch<BaseAction>,
  props: OwnProps
) => ({
  onLogin: (): void => {}
});
