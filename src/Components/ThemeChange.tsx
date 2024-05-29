import React, { useState } from 'react';

//型宣言
export interface ThemeChangeProps {
	onThemeChange: (theme: number) => void;
}

export const ThemeChange = ({ onThemeChange }: ThemeChangeProps): JSX.Element => {
	const [selectedTheme, setSelectedTheme] = useState(1);

	const handleThemeChange = (themeNum: number) => {
		return () => {
			setSelectedTheme(themeNum);
			onThemeChange(themeNum);
		}
	};

	return(
		<div className="calculator-theme-change">
			<p className="calculator-name">calc</p>
			<div className="theme-change-btn-box">
				<p className="calculator-theme-name">THEME</p>
				<div className="theme-change-btn">
					<div className="theme-num">
						<button className={`theme1-num ${selectedTheme === 1 ? 'active' : ''}`} onClick={handleThemeChange(1)}>1</button>
						<button className={`theme2-num ${selectedTheme === 1 ? 'active' : ''}`} onClick={handleThemeChange(2)}>2</button>
						<button className={`theme3-num ${selectedTheme === 1 ? 'active' : ''}`} onClick={handleThemeChange(3)}>3</button>
					</div>
					<div className="theme-btn">
						<div className={`theme1 btn-circle ${selectedTheme === 1 ? 'active' : ''}`} onClick={handleThemeChange(1)} role="button" area-label="THEME1を選択する"></div>
						<div className={`theme2 btn-circle ${selectedTheme === 2 ? 'active' : ''}`} onClick={handleThemeChange(2)} role="button" area-label="THEME2を選択する"></div>
						<div className={`theme3 btn-circle ${selectedTheme === 3 ? 'active' : ''}`} onClick={handleThemeChange(3)} role="button" area-label="THEME3を選択する"></div>
					</div>
				</div>
			</div>
		</div>
	)
}