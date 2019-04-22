// @flow
import React, { Component } from "react";
import "./styles.css";
import type { Brand } from "../App";

type ListProps = {|
  items: Array<Brand>,
  onMixBrands: () => void
|};

class ListOfBrands extends Component<ListProps> {
  render() {
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
