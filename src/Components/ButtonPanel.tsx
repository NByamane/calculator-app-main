export const ButtonPanel = (props: {
	buttonHandler: (code: string) => void;
}): JSX.Element => {
	const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		// event.target.value をエラーなく使うための型ガード
		if (!(event.target instanceof HTMLButtonElement)) {
			return;
		}
    props.buttonHandler(String(event.target.value));
  };
	return(
		<div className="calculator-body-box">
			<div className="body-num-box">
				<button className="num7 num-btn" value="7" onClick={buttonHandler}>7</button>
				<button className="num8 num-btn" value="8" onClick={buttonHandler}>8</button>
				<button className="num9 num-btn" value="9" onClick={buttonHandler}>9</button>
				<button className="del num-btn" value="DEL" onClick={buttonHandler}><span>DEL</span></button>
				<button className="num4 num-btn" value="4" onClick={buttonHandler}>4</button>
				<button className="num5 num-btn" value="5" onClick={buttonHandler}>5</button>
				<button className="num6 num-btn" value="6" onClick={buttonHandler}>6</button>
				<button className="plus num-btn" value="+" onClick={buttonHandler}>+</button>
				<button className="num1 num-btn" value="1" onClick={buttonHandler}>1</button>
				<button className="num2 num-btn" value="2" onClick={buttonHandler}>2</button>
				<button className="num3 num-btn" value="3" onClick={buttonHandler}>3</button>
				<button className="minus num-btn" value="-" onClick={buttonHandler}>-</button>
				<button className="point num-btn" value="." onClick={buttonHandler}>.</button>
				<button className="num0 num-btn" value="0" onClick={buttonHandler}>0</button>
				<button className="divide num-btn" value="/" onClick={buttonHandler}>/</button>
				<button className="multiple num-btn" value="x" onClick={buttonHandler}>x</button>
			</div>
			<div className="reset-equal-btn">
				<button className="reset" value="RESET" onClick={buttonHandler}><span>RESET</span></button>
				<button className="equal" value="=" onClick={buttonHandler}><span>=</span></button>
			</div>
		</div>
	)
}