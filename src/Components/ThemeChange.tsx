export const ThemeChange = (): JSX.Element => {
	return(
		<div className="calculator-theme-change">
			<p className="calculator-name">calc</p>
			<div className="theme-change-btn-box">
				<p className="calculator-theme-name">THEME</p>
				<div className="theme-change-btn">
					<div className="theme-num">
						<p className="theme1-num">1</p>
						<p className="theme2-num">2</p>
						<p className="theme3-num">3</p>
					</div>
					<div className="theme-btn">
						<div className="theme1 btn-circle" role="button" area-label="THEME1を選択する" area-expanded="true"></div>
						<div className="theme2 btn-circle" role="button" area-label="THEME2を選択する" area-expanded="false"></div>
						<div className="theme3 btn-circle" role="button" area-label="THEME3を選択する" area-expanded="false"></div>
					</div>
				</div>
			</div>
		</div>
	)
}