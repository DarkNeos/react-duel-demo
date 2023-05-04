import "./App.css";

import React from "react";

import { Board } from "./Board";
import { Modal } from "./Modal";

const App: React.FC = () => (
  <div className="App">
    <Board />
    <Modal />
  </div>
);

export default App;
