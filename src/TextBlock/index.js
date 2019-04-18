/* @flow */
import React from "react";
import './styles.css';
import type { Node } from 'react';

type Props = {
  id: string,
  name: string,
  showMessage: bool,
}

const TextBlock = ({ id, name, showMessage }: Props): Node => (
  <div className="text-block">
    <p>ID: {id} </p>
    <p>Name: {name} </p>
    {showMessage && <p> {`Hello ${name}!`}</p>}
  </div>
);

export default TextBlock;
