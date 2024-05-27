export const ButtonPanel = (props: {
	buttonHandler: (code: string) => void;
}): JSX.Element => {
	const buttonHandler = (value: string) => {
    return () => props.buttonHandler(value);
  };
	return(
		<div className="calculator-body-box">
			<div className="body-num-box">
				<button className="num7 num-btn" onClick={buttonHandler('7')}>7</button>
				<button className="num8 num-btn" onClick={buttonHandler('8')}>8</button>
				<button className="num9 num-btn" onClick={buttonHandler('9')}>9</button>
				<button className="del num-btn" onClick={buttonHandler('DEL')}><span>DEL</span></button>
				<button className="num4 num-btn" onClick={buttonHandler('4')}>4</button>
				<button className="num5 num-btn" onClick={buttonHandler('5')}>5</button>
				<button className="num6 num-btn" onClick={buttonHandler('6')}>6</button>
				<button className="plus num-btn" onClick={buttonHandler('+')}>+</button>
				<button className="num1 num-btn" onClick={buttonHandler('1')}>1</button>
				<button className="num2 num-btn" onClick={buttonHandler('2')}>2</button>
				<button className="num3 num-btn" onClick={buttonHandler('3')}>3</button>
				<button className="minus num-btn" onClick={buttonHandler('-')}>-</button>
				<button className="point num-btn" onClick={buttonHandler('.')}>.</button>
				<button className="num0 num-btn" onClick={buttonHandler('0')}>0</button>
				<button className="divide num-btn" onClick={buttonHandler('/')}>/</button>
				<button className="multiple num-btn" onClick={buttonHandler('x')}>x</button>
			</div>
			<div className="reset-equal-btn">
				<button className="reset" onClick={buttonHandler('RESET')}><span>RESET</span></button>
				<button className="equal" onClick={buttonHandler('=')}><span>=</span></button>
			</div>
		</div>
	)
}