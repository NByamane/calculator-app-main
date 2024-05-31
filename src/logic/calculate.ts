/*---------- 各ボタンの操作 ----------*/
export const calculate = (buttonValue: string, state: State): State => {
	//数値ボタンを押した時
	if(isNumButton(buttonValue)) {
		return clickNumButton(buttonValue, state);
	}
	//オペレーターボタンを押した時
	if(isOperatorButton(buttonValue)) {
		return clickOperationButton(buttonValue, state);
	}
	//.ボタンを押した時
	if(isDotButton(buttonValue)) {
		return clickDotButton(state); //buttonの種類は必要ないのでstateだけ
	}
	//DELボタンを押した時
	if(isDelButton(buttonValue)) {
		return clickDelButton(state);
	}
	//RESETボタンを押した時
	if(isResetButton(buttonValue)) {
		return clickResetButton();
	}
	//=ボタンを押した時
	if(isEquallButton(buttonValue)) {
		return clickEquallButton(state);
	}
	
	return state;
}

/*---------- 以下それぞれ関数を作っていく（　∵　） ----------*/
//型宣言
export interface State {
	current: string;
	operand: number | string;
	operator: string | null;
	isNextClear: Boolean;
}

//currentの更新をまとめる
function updateCurrent(newCurrent: string, state: State, isNextClear = false): State {
	return {
		...state,
		current: newCurrent,
		isNextClear,
	};
}

/*--- 数値ボタン ---*/
function isNumButton(buttonValue: string): boolean { //押した数値ボタンが何の可能性があるか
	const regex = /^[0-9]$/;
	// 文字列buttonが1文字で、0~9のいずれかの数値であればtrueを返す
	return buttonValue.length === 1 && regex.test(buttonValue);
}

function clickNumButton(buttonValue: string, state: State): State {
	// 現在の表示が（,を除く）14桁以上ならボタンを無視
	if (state.current.replace(/,/g, '').length >= 13) {
		return state;
	}

	const currentValue = (state.isNextClear === true || state.current === '0')
		? buttonValue : (state.current.length < 12 ? state.current + buttonValue : state.current);
	
	return updateCurrent(currentValue, state, false);
}

/*--- 演算子ボタン ---*/
function isOperatorButton(buttonValue: string) { //押したオペレーションボタンが何の可能性があるか
	return(
		buttonValue === '+' ||
		buttonValue === '-' ||
		buttonValue === 'x' ||
		buttonValue === '/'
	)
}

function clickOperationButton(buttonValue: string, state: State): State {
	if(state.operator === null) { //operationボタン（+-x/）が押されていない場合（state値に変化がない場合）
		return {
			...state,
			operand: parseFloat(state.current),
			operator: buttonValue,
			isNextClear: true,
		}
	}
	const nextValue = operate(state) //operateを使って計算
	return {
		current: `${nextValue}`,
		operand: nextValue,
		operator: buttonValue,
		isNextClear: true,
	}
}

/*--- 小数点ボタン ---*/
function isDotButton(buttonValue: string) {
	return buttonValue === '.';
}

function clickDotButton(state: State): State {
	//.を連打されて.が連続するのはおかしいので、現状.があるかどうかを調べる
	if(state.current.includes('.')) { //小数点が直前にある場合以外（すでに.がある場合以外）
		return state
	}
	return updateCurrent(state.current + '.', state, false); //小数点をつけて新たなを格納
}

/*--- DELボタン ---*/
function isDelButton(buttonValue: string) {
	return buttonValue === 'DEL';
}

function clickDelButton(state: State): State { //削除ボタンは、すでに1文字しかない場合は0に戻す
	const newCurrent = state.current.length === 1 ? '0' : state.current.slice(0, -1); // 1文字の場合はtrue、それ以上は一文字削除
	return updateCurrent(newCurrent, state, false);
}

/*--- RESETボタン ---*/
function isResetButton(buttonValue: string) {
	return buttonValue === 'RESET';
}

function clickResetButton(): State {
	return{
		current: '0',
		operand: 0,
		operator: null,
		isNextClear: false,
	}
}

/*--- =ボタン ---*/
function isEquallButton(buttonValue: string) {
	return buttonValue === '=';
}

function clickEquallButton(state: State): State {
	if(state.operator === null) { //何も演算子が押されてない場合
		return state
	}
	const nextValue = operate(state)
	return {
		current: `${nextValue}`,
		operand: 0,
		operator: null,
		isNextClear: true, //結果を出した後に数字ボタンを押すと新たな計算が始まるのでここはtrue
	}
}

/*---------- 計算機能部分 ----------*/
//計算結果が、13桁以上になる場合、12桁まで表示し、以下切り捨ててEの文字を表示する
function formatResult(totalNum: number): string {
	const totalNumStr = totalNum.toString();
	if (totalNumStr.length >= 13) {
		return totalNumStr.slice(0, 12) + 'E';
	}
	return totalNumStr;
}

function operate(state: State): number | string {
	const operand = typeof state.operand === 'string' ? parseFloat(state.operand) : state.operand;
	const current = parseFloat(state.current);

	if (state.operator === '+') {
		return formatResult(operand + current);
	}
	if (state.operator === '-') {
		return formatResult(operand - current);
	}
	if (state.operator === 'x') {
		return formatResult(operand * current);
	}
	if (state.operator === '/') {
		return formatResult(operand / current);
	}
	return current; //到達することはないが、一応+-x/以外の場合を記載
}

