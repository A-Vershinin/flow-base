// @flow
import React, { Component } from "react";
import "./styles.css";

class ListOfBrands extends Component {
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
