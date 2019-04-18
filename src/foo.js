/* @flow */

import React, { Component } from "react";
import PropTypes from "prop-types";

type Props = { foo: string };
type State = { text: string };

class Foo extends Component<Props, State> {
  static propTypes = {
    foo: PropTypes.string
  };

  static defaultProps = {
    foo: "bar"
  };

  constructor(): void {
    super();
    this.state = {
      text: "Hello world"
    };
  }

  render() {
    return <h2>{this.state.text}</h2>;
  }
}

export default Foo;
