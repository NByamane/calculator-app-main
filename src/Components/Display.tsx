export const Display = (props: {
	value: string;
}): JSX.Element => {

	const formattedValue = Number(props.value).toLocaleString(); //numberに変換してカンマをつける
	return(
		<div className="calculator-result-box">
			<p className="calculator-result">{ formattedValue }</p>
		</div>
	)
}