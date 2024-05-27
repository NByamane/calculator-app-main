import React from 'react';
import { Header } from './Components/Header';
import './css/App.css';
import './css/Calculator.css';
import { Calculator } from './Components/Calculator';

function App() {
  return (
    <div className="App">
      <Header />
      <Calculator />
    </div>
  );
}

export default App;
