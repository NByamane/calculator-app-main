import React, { useState } from 'react';
import { Header } from './Components/Header';
import './css/App.css';
import './css/Calculator.css';
import { ThemeChange } from './Components/ThemeChange';
import { Calculator } from './Components/Calculator';

export interface CalculatorProps {
  onThemeChange: (themeNum: number) => void;
}

function App() {
  const [selectedTheme, setSelectedTheme] = useState(1);
  const handleThemeChange = (themeNum: number) => {
    setSelectedTheme(themeNum);
  };

  return (
    <div className={`App theme${selectedTheme}`}>
      <Header />
      <ThemeChange onThemeChange={handleThemeChange} />
      <Calculator />
    </div>
  );
}

export default App;
