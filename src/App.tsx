import React, { useState } from 'react';
import { Header } from './Components/Header';
import './css/App.css';
import './css/Calculator.css';
import { Calculator } from './Components/Calculator';

function App() {
  const [selectedTheme, setSelectedTheme] = useState(1);
  const handleThemeChange = (themeNum: number) => {
    setSelectedTheme(themeNum);
  };

  return (
    <div className={`App theme${selectedTheme}`}>
      <Header />
      <Calculator onThemeChange={handleThemeChange} />
    </div>
  );
}

export default App;
