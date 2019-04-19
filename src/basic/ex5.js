/* @flow */
import { handleActions, type Reducer } from "redux-actions";

//============ Примеры типизации для React компонентов ==============

/* У компонента следующие пропсы. Добавляем типы.
ListPopover.propTypes = {
  strings: PropTypes.objectOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  target: PropTypes.func.isRequired,
};

ListPopover.defaultProps = {
  strings: defaultStrings,
  isOpen: false,
};
*/

type ListPopoverProps = {
  strings: { [string_key: string]: string },
  onClose: Function,
  isOpen: boolean,
  target: Function
};

// ===================== Reducer and Action ====================
// Простой редюсер и actions

// Actions

type FooAction = { type: "FOO", foo: string };
type BarAction = { type: "BAR", bar: boolean };
type Action = FooAction | BarAction;
type State = {
  +value: boolean
};
type PromiseAction = Promise<Action>;
/* Для диспатча 2й и другие аргументы это тип функции midlleware
которая подключена в сторе и будет вызвана при диспатче экшена.
Thunk, Saga, Promise. Для простоты используем пропис сейчас.
*/
type Dispatch = (action: Action | Promise<Action>) => any;

const foo = (value: string): FooAction => ({
  type: "FOO",
  foo: value
});

const bar = (value: boolean): BarAction => ({
  type: "BAR",
  bar: value
});

const initialState = {
  value: false
};

function accessControlReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case "FOO":
      // return { ...state, value: action.foo };
      /*
        Из-за того что поле value в сторе имеет один конкретный тип boolean
        нельзя при срабатывании любого другого экшена, в котором приходит другой
        тип данных, к примеру строка, перезаписать строкой вместо boolen.
        В экшене foo тип value должен быть строкой или значение должно
        записываться в своё отдельное поле
      */
      return { ...state, bar: action.foo };
    case "BAR":
      return { ...state, value: action.bar };
    default:
      return state;
  }
}

const accountsReducer = () => {};

// RootReducer
const rootReducer = {
  accessControlReducer,
  accountsReducer
};

type BaseAction = $ReadOnly<{ type: string, error?: string }>;

type OwnProps = {||};
// helper тип
type ExtractReturn<Fn> = $Call<<T>((...Iterable<any>) => T) => T, Fn>;

type ReduxProps<M, D> = $ReadOnly<{|
  ...ExtractReturn<M>,
  ...ExtractReturn<D>
|}>;

const mapStateToProps = (state, props) => ({
  /* ...  */
});
const mapDispatchToProps = (dispatch: Dispatch<BaseAction>, props) => ({
  /* ...  */
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>
|};

type GlobalState = $ObjMap<typeof rootReducer, ExtractReturn>;
