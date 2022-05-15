import Calculator from "./components/Calculator";
import Table from "./components/Table";
import React, {useState} from 'react';

function App() {
  const [tableValues, setTableValues] = useState([]);
  return (
    <div className="app">
      <Calculator setTableValues={setTableValues}/>
      {tableValues && tableValues.length > 0 && <Table tableValues={tableValues}/>}
    </div>
  );
}

export default App;
