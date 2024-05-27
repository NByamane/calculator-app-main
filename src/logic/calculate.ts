export const calculate = (button: string, state: State): State => {
	//数値ボタンを押した時
	if(isNumberButton(button)) {
		return handleNumberButton(button, state);
	}
	//オペレーターボタンを押した時
	if(isOperatorButton(button)) {
		return handleOperationButton(button, state);
	}
	//.ボタンを押した時
	if(isDotButton(button)) {
		return handleDotButton(state); //buttonの種類は必要ないのでstateだけ
	}
	//DELボタンを押した時
	if(isDelButton(button)) {
		return handleDelButton(state);
	}
	//RESETボタンを押した時
	if(isResetButton(button)) {
		return handleResetButton();
	}
	//=ボタンを押した時
	if(isEquallButton(button)) {
		return handleEquallButton(state);
	}
	
	return state;
}

//型宣言
export interface State {
	current: string;
	operand: number;
	operator: string | null;
	isNextClear: Boolean;
}

//数値ボタン
function isNumberButton(button: string) { //押した数値ボタンが何の可能性があるか
	return (
		button === '0' ||
		button === '1' ||
		button === '2' ||
		button === '3' ||
		button === '4' ||
		button === '5' ||
		button === '6' ||
		button === '7' ||
		button === '8' ||
		button === '9'
	)
}

function handleNumberButton(button: string, state: State): State {
	if(state.isNextClear === true) { //+-x/ボタンが押された場合は表示を消去しないといけないので
		return {
			current: button,
			operand: state.operand,
			operator: state.operator,
			isNextClear: false,
		}
	}
	if(state.current === '0') { //押したボタンが0だったら
		return {
			current: button,
			operand: state.operand,
			operator: state.operator,
			isNextClear: false,
		};
	}
	return { //0以外を押してたら
		current: state.current + button,
		operand: state.operand,
		operator: state.operator,
		isNextClear: false,
	};
}

//演算子ボタン
function isOperatorButton(button: string) { //押したオペレーションボタンが何の可能性があるか
	return(
		button === '+' ||
		button === '-' ||
		button === 'x' ||
		button === '/'
	)
}

function handleOperationButton(button: string, state: State): State {
	if(state.operator === null) { //operationボタン（+-x/）が押されていない場合（sate値に変化がない場合）
		return {
			current: state.current,
			operand: parseFloat(state.current),
			operator: button,
			isNextClear: true,
		}
	}
	const nextValue = operate(state) //計算結果
	return {
		current: `${nextValue}`,
		operand: nextValue,
		operator: button,
		isNextClear: true,
	}
}

//小数点ボタン
function isDotButton(button: string) {
	return button === '.';
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
function isDelButton(button: string) {
	return button === 'DEL';
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
function isResetButton(button: string) {
	return button === 'RESET';
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
function isEquallButton(button: string) {
	return button === '=';
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
function operate(state: State): number {
	const current = parseFloat(state.current);

	if(state.operator === '+') {
		return state.operand + current;
	}
	if(state.operator === '-') {
		return state.operand - current;
	}
	if(state.operator === 'x') {
		return state.operand * current;
	}
	if(state.operator === '/') {
		return state.operand / current;
	}
	return current; //到達することはないが、一応+-x/以外の場合を記載
}

