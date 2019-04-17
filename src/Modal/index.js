// @flow
import React, { Component } from "react";
import st from "./styles.module.css";


class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.placeholder = "Welcome to open Modal!.";
  }

  showText = (e: SyntheticKeyboardEvent<>):void => {
    this.setState({ open: !this.state.open });
  };

  closeText = () => this.setState({ open: !this.state.open });

  render() {
    const { open } = this.state;
    const { text } = this.props;

    return (
      <div className={st.modal}>
        <h3>{this.placeholder} This title of modal component</h3>
        <p>
          Modal show text: <b>{`${open}`}</b>
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
