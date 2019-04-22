/* @flow */
import { createAction, handleActions, type Reducer } from "redux-actions";
import { bindActionCreators } from "redux";
// import type { Dispatch } from "redux";

//============ Примеры Reducer and Redux-Action ==============

// Helper-типы экшенов кастомноые для dispatch
type BaseAction = $ReadOnly<{ type: string, error?: string }>;
type ActionWithPayload<P> = $ReadOnly<{ ...BaseAction, payload: P }>;

type ActionCustome =
  | { type: "START_VERIFICATION" }
  | { type: "START_VERIFICATION_SUCCESS", payload: { result: {} } }
  | { type: "START_VERIFICATION_FAIL", payload: { message: "" } };

// type Dispatch = (action: ActionCustome | Array<ActionCustome>) => any;
type Dispatch = ActionCustome => void;

// helper extact util
type ExtractReturn<Fn> = $Call<<T>((...Iterable<any>) => T) => T, Fn>;

type ReduxProps<M, D> = $ReadOnly<{|
  ...ExtractReturn<M>,
  ...ExtractReturn<D>
|}>;

type UserData = { id: number, name: string };

// Actions
const startVerification = createAction("START_VERIFICATION");
const startVerificationSuccess = createAction(
  "START_VERIFICATION_SUCCESS",
  (result: string) => result
);
const startVerificationFail = createAction(
  "START_VERIFICATION_FAIL",
  (message: string) => message
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

const verificataion: Reducer<State, *> = handleActions(
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
type OwnProps = {| /* ownProps from container */ |};
type Verification = {| id: number, name: string |};
type MSTPType = {|
  isAccess: boolean,
  data: Verification
|};

// Поискать причину почему не покрылись поля
const mapStateToProps = (state: GlobalState, props: OwnProps): MSTPType => {
  return {
    isAccess: state.access.isAccess,
    data: state.verificataion.data
  };
};

/* ========= Несколько вариантов с dispatch  ============ */
type MDTPType = {| onVerification: () => void |};

/* Первый */
const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps): MDTPType => ({
  onVerification: () => dispatch(startVerification())
});

/* Второй. Варианты типизации mapDispatchToProps если action-ы добавлены
через bindActionCreators. Дописать */

// const mapDispatchToProps = (
//   dispatch: Dispatch<BaseAction>,
//   props: OwnProps
// ) => ({
//   onVerification: (): void => {}
// });
