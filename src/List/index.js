/* @flow */
import React, { Component } from "react";
import "./styles.css";
import type { Brand, Hash } from "../App";
import { number, string, arrayOf, shape, func } from "prop-types";

type ListProps = {|
  items: Array<Brand>,
  data?: Hash<string>,
  onMixBrands?: () => void
|};

class ListOfBrands extends Component<ListProps> {
  static propTypes = {
    items: arrayOf(
      shape({
        id: number,
        name: string
      })
    ).isRequired,
    data: shape({}),
    onMixBrands: func,
  };

  static defaultProps = {
    data: {},
    onMixBrands: () => {}
  };

  render(): React$Node {
    const { items, onMixBrands } = this.props;

    return (
      <div className="list">
        <ol>
          {items.length &&
            items.map(item => <li key={item.id}>{item.name}</li>)}
        </ol>
        <button onClick={onMixBrands}>Mix brands</button>
      </div>
    );
  }
}

export default ListOfBrands;
