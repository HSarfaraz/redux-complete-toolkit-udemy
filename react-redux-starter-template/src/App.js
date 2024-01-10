import React from "react";

import { Provider } from "react-redux";
import "./App.css";
import AddNotes from "./components/AddNotes";
import store from "./redux/store/store";
import NotesList from "./components/NotesList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AddNotes />
        <NotesList />
      </div>
    </Provider>
  );
}

export default App;
