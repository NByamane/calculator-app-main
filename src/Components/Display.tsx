export const Display = (props: {
	value: string;
}): JSX.Element => {
	return(
		<div className="calculator-result-box">
			<p className="calculator-result">{ props.value }</p>
		</div>
	)
}