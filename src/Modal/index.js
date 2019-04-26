/* @flow */
import React, { Component } from "react";
import { string } from "prop-types";
import st from "./styles.module.css";

type Props = {|
  text?: string,
|};
type State = {|
  open: boolean
|};

class ModalComponent extends Component<Props, State> {
  static propTypes = {
    text: string,
  };

  static defaultProps = {
    text: ""
  };

  // Если state объявлен через объект и поле класса
  /*
  placeholder: string = "Welcome to open Modal!."; // типизация для поля класса
  state: State = {
    open: false
  }
  */

  // Если state объявлен через constuctore и поле класса
  placeholder: string;
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false
    };
    this.placeholder = "Welcome to open Modal!.";
  }

  showText = (e: SyntheticKeyboardEvent<HTMLButtonElement>): void => {
    // To access your button instance use `event.currentTarget`.
    // (event.currentTarget: HTMLButtonElement);
    this.setState({ open: !this.state.open });
  };

  closeText = (): void => this.setState({ open: !this.state.open });

  render(): React$Node {
    const { open } = this.state;
    const { text } = this.props;

    return (
      <div className={st.modal}>
        <h3>{this.placeholder} This title of modal component</h3>
        <p>
          Modal show text: <b>{`${String(open)}`}</b>
        </p>
        <p>Modal desctiption: {open ? text : ""} </p>
        <div className={st.row}>
          <button onClick={this.showText}>Show text</button>
          <button onClick={this.closeText}>Close text</button>
        </div>
      </div>
    );
  }
}

export default ModalComponent;
