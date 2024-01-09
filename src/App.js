import React from "react";
import { Provider } from "react-redux";
import HomePage from "./components/HomePage";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;
