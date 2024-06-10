import { useState } from 'react';
import { State, calculate } from '../logic/calculate';
import { Display } from './Display';
import { ButtonPanel } from './ButtonPanel';
import React from 'react';

export const Calculator = React.memo((): JSX.Element => {
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
			<Display value={state.current} />
			<ButtonPanel buttonHandler={buttonHandler} />
		</div>
	)
})