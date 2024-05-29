export const calculate = (buttonValue: string, state: State): State => {
	//数値ボタンを押した時
	if(isNumberButton(buttonValue)) {
		return updateCurrent(buttonValue, state);
	}
	//オペレーターボタンを押した時
	if(isOperatorButton(buttonValue)) {
		return handleOperationButton(buttonValue, state);
	}
	//.ボタンを押した時
	if(isDotButton(buttonValue)) {
		return handleDotButton(state); //buttonの種類は必要ないのでstateだけ
	}
	//DELボタンを押した時
	if(isDelButton(buttonValue)) {
		return handleDelButton(state);
	}
	//RESETボタンを押した時
	if(isResetButton(buttonValue)) {
		return handleResetButton();
	}
	//=ボタンを押した時
	if(isEquallButton(buttonValue)) {
		return handleEquallButton(state);
	}
	
	return state;
}

//型宣言
export interface State {
	current: string;
	operand: number | string;
	operator: string | null;
	isNextClear: Boolean;
}

//数値ボタン
function isNumberButton(buttonValue: string): boolean { //押した数値ボタンが何の可能性があるか
	const regex = /^[0-9]$/;
	// 文字列buttonが1文字で、0~9のいずれかの数値であればtrueを返す
	return buttonValue.length === 1 && regex.test(buttonValue);
}

function updateCurrent(buttonValue: string, state: State): State {
	// 現在の表示が（,を除く）14桁以上ならボタンを無視
	if (state.current.replace(/,/g, '').length >= 14) {
		return state;
	}

	const currentValue = (state.isNextClear === true || state.current === '0')
		? buttonValue : (state.current.length < 13 ? state.current + buttonValue : state.current);
	return {
		...state,
    current: currentValue,
		isNextClear: false,
	};
}

//演算子ボタン
function isOperatorButton(buttonValue: string) { //押したオペレーションボタンが何の可能性があるか
	return(
		buttonValue === '+' ||
		buttonValue === '-' ||
		buttonValue === 'x' ||
		buttonValue === '/'
	)
}

function handleOperationButton(buttonValue: string, state: State): State {
	if(state.operator === null) { //operationボタン（+-x/）が押されていない場合（state値に変化がない場合）
		return {
			current: state.current,
			operand: parseFloat(state.current),
			operator: buttonValue,
			isNextClear: true,
		}
	}
	const nextValue = operate(state) //計算結果
	return {
		current: `${nextValue}`,
		operand: nextValue,
		operator: buttonValue,
		isNextClear: true,
	}
}

//小数点ボタン
function isDotButton(buttonValue: string) {
	return buttonValue === '.';
}

function handleDotButton(state: State): State {
	//.を連打されて.が連続するのはおかしいので、現状.があるかどうかを調べる
	if(state.current.indexOf('.') !== -1) { //小数点が直前にある場合以外（すでに.がある場合以外）
		return state
	}
	return { //まだどこにも.がない場合
		current: state.current + '.',
		operand: state.operand,
		operator: state.operator,
		isNextClear: false,
	}
}

//DELボタン
function isDelButton(buttonValue: string) {
	return buttonValue === 'DEL';
}

function handleDelButton(state: State): State { //削除ボタンは、すでに1文字しかない場合は0に戻す
	if(state.current.length === 1) {
		return{
			current: '0',
			operand: state.operand,
			operator: state.operator,
			isNextClear: false,
		}
	}
	return {
		current: state.current.substring(0, state.current.length - 1),
		operand: state.operand,
		operator: state.operator,
		isNextClear: false,
	}
}

//RESETボタン
function isResetButton(buttonValue: string) {
	return buttonValue === 'RESET';
}

function handleResetButton(): State {
	return{
		current: '0',
		operand: 0,
		operator: null,
		isNextClear: false,
	}
}

//=ボタン
function isEquallButton(buttonValue: string) {
	return buttonValue === '=';
}

function handleEquallButton(state: State): State {
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

//計算機能
function formatResult(totalNum: number): string { //計算結果が、14桁以上になる場合、13桁まで表示し、以下切り捨ててEの文字を表示する
	const totalNumStr = totalNum.toString();
	if (totalNumStr.length >= 14) {
		return totalNumStr.slice(0, 13) + 'E';
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

