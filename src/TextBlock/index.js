// @flow
import React from "react";
import './styles.css';
import type { Node } from 'react';

// type TextComponent = {
//   id: bool,
//   name: string
// }

const TextBlock: Node = ({ id, name, showMessage }) => (
  <div className="text-block">
    <p>ID: {id} </p>
    <p>Name: {name} </p>
    {showMessage && <p> {`Hello ${name}!`}</p>}
  </div>
);

export default TextBlock;
