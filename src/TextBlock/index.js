/* @flow */
import React from "react";
import { string, bool } from "prop-types";
import "./styles.css";
import type { Node } from "react";

type Props = {|
  id: string,
  name: string,
  showMessage: boolean
|};

const TextBlock = ({ id, name, showMessage }: Props): Node => (
  <div className="text-block">
    <p>ID: {id} </p>
    <p>Name: {name} </p>
    {showMessage && <p> {`Hello ${name}!`}</p>}
  </div>
);

TextBlock.propTypes = {
  id: string,
  name: string,
  showMessage: bool
};

TextBlock.defaultProps = {
  id: "",
  name: "",
  showMessage: false
};

export default TextBlock;
