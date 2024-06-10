import React, { useState } from 'react';

//型宣言
export interface ThemeChangeProps {
	onThemeChange: (theme: number) => void;
}

export const ThemeChange = ({ onThemeChange }: ThemeChangeProps): JSX.Element => {
	const [selectedTheme, setSelectedTheme] = useState(1);

	const handleClickThemeBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
			// event.target.value をエラーなく使うための型ガード
			if (!(event.target instanceof HTMLButtonElement)) {
				return;
			}
			setSelectedTheme(Number(event.target.value));
			onThemeChange(Number(event.target.value));
			console.log(Number(event.target.value));
	};

	return(
		<div className="calculator-theme-change">
			<p className="calculator-name">calc</p>
			<div className="theme-change-btn-box">
				<p className="calculator-theme-name">THEME</p>
				<div className="theme-change-btn">
					<div className="theme-num">
						<button className={`theme1-num ${selectedTheme === 1 ? 'active' : ''}`} value="1" onClick={handleClickThemeBtn}>1</button>
						<button className={`theme2-num ${selectedTheme === 2 ? 'active' : ''}`} value="2" onClick={handleClickThemeBtn}>2</button>
						<button className={`theme3-num ${selectedTheme === 3 ? 'active' : ''}`} value="3" onClick={handleClickThemeBtn}>3</button>
					</div>
					<div className="theme-btn">
						<button className={`theme1 btn-circle ${selectedTheme === 1 ? 'active' : ''}`} value="1" onClick={handleClickThemeBtn} aria-label="THEME1を選択する"></button>
						<button className={`theme2 btn-circle ${selectedTheme === 2 ? 'active' : ''}`} value="2" onClick={handleClickThemeBtn} aria-label="THEME2を選択する"></button>
						<button className={`theme3 btn-circle ${selectedTheme === 3 ? 'active' : ''}`} value="3" onClick={handleClickThemeBtn} aria-label="THEME3を選択する"></button>
					</div>
				</div>
			</div>
		</div>
	)
}