import { useState } from 'react';
import { State, calculate } from '../logic/calculate';
import { ThemeChange } from './ThemeChange';
import { Display } from './Display';
import { ButtonPanel } from './ButtonPanel';

export const Calculator = (): JSX.Element => {
	//stateの設定
	const [state, setState] = useState<State>({
		current: '0', //表示内容
		operand: 0, //記憶してる数値
		operator: null, //+-x/ボタン
		isNextClear: false, 
	});

	const buttonHandler = (code: string) => {
		const nextState = calculate(code, state);
		setState(nextState);
	}
	
	return(
		<div className="calculator">
			<ThemeChange />
			<Display value={state.current} />
			<ButtonPanel buttonHandler={buttonHandler} />
		</div>
	)
}