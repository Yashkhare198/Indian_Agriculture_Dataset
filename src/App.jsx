import logo from "./logo.svg";
import "./App.css";
import MaxMinProductionTable from "./components/MaxMinProductionTable";

import DataSet from "./DataSet";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: "center" }}>Agriculture Analytics</h1>
      </header>
      <main>
        <DataSet />
      </main>
    </div>
  );
}

export default App;
