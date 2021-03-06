/* @flow */
import React, { Component } from "react";
import st from "./app.module.css";
import "./basic";
import TextBlock from "components/TextBlock";
import Modal from "./Modal";
import ListOfBrands from "./List";

export type Hash<V, K = string> = { [K]: V };
export type Brand = { id: number, name: string };
type BasicState<B> = {| brands: Array<B> |};
type State = BasicState<Brand>;

const brandsList: Array<Brand> = [
  { id: 1, name: "Ralph Lauren" },
  { id: 2, name: "Tommy Hilfiger" },
  { id: 3, name: "Calvin Klein" },
  { id: 4, name: "Levi Strauss & Co." }
];

class App extends Component<any, State> {
  state: State = {
    brands: brandsList
  };

  getRandomList = (): void => {
    const sortedArr = this.state.brands.sort(() => Math.random() - 0.5);
    this.setState({ brands: [...sortedArr] });
  };

  render(): React$Node {
    const { brands } = this.state;

    return (
      <div className={st.app}>
        <h1 className={st.title}>Tutorial Flow</h1>

        <div className={st.row}>
          <TextBlock id="da2g3h9" name="Jon" showMessage={true} />
          <Modal
            text="Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s"
          />
        </div>
        <hr />
        <ListOfBrands items={brands} onMixBrands={this.getRandomList} />
      </div>
    );
  }
}

export default App;
