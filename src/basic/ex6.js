/* @flow */
import { handleActions, type Reducer } from "redux-actions";
// import { type GlobalState } from 'redux/modules';

//============ Примеры Reducer and Redux-Action ==============



type BaseAction = $ReadOnly<{ type: string, error?: string }>;

type ActionWithPayload<P> = $ReadOnly<{ ...BaseAction, payload: P }>;

type Action =
  | { type: 'START_VERIFICATION', payload: false }
  | { type: 'START_VERIFICATION_SUCCESS', payload: { result: {} }}
  | { type: 'START_VERIFICATION_FAIL', payload: { message: '' }}

type PromiseAction = Promise<Action>;

type Dispatch = (action: Action |  PromiseAction | Array<Action>) => any;

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

const reducer: Reducer<State, *> = handleActions({
  START_VERIFICATION: (state: State) => ({
    ...state,
    loaded: false
  }),
  START_VERIFICATION_SUCCESS: (
    state: State,
    action: ActionWithPayload<{ result: {} }>
  ) => ({
    ...state,
    loaded: true,
    data: action.payload.result,
    error: null
  }),

  START_VERIFICATION_FAIL: (
    state: State,
    action: ActionWithPayload<{ message: string }>
  ) => ({
    ...state,
    loaded: false,
    data: {},
    error: action.payload.message
  })
});


const fetchContactInfo = (email: string) => (
  dispatch: Dispatch<BaseAction>,
  getState: GetGlobalState
) => {
  return {
    type: 'START_VERIFICATION_SUCCESS',
    paylod: email
  }
};

// в container

type OwnProps = {|
 // ownProps on container
|};

const mapStateToProps = (
  state: OwnState,
  props: OwnProps
) => ({
  email: state.email,
});


const mapDispatchToProps = (
  dispatch: Dispatch<BaseAction>
) => {
  return {

  }
};
