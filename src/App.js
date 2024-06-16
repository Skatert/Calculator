import { useState } from 'react';
import style from './App.module.css';

const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '+', '=', '*', '/', 'C'];
export const App = () => {
	const [operator, setOperator] = useState('');
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [result, setResult] = useState(null);
	const handleReset = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
		setResult(null);
	};
	const math = () => {
		switch (operator) {
			case '+':
				return setResult(Number(operand1) + Number(operand2));
			case '-':
				return setResult(Number(operand1) - Number(operand2));
			case '*':
				return setResult(Number(operand1) * Number(operand2));
			case '/':
				return setResult(Number(operand1) / Number(operand2));
		}
	};
	const handleClick = (number) => {
		if (operand1 && operand2 && operand1 && number === '=') {
			setOperand2('');
			return math();
		}
		if (result) {
			setOperand1(result);
			setResult(null);
		}
		if (number === 'C') return handleReset();
		const isNum = !isNaN(number);
		if (operand1 && !isNum) {
			setOperator(number);
			return;
		}

		if (!operator && isNum) {
			setOperand1((prev) => prev + number);
		} else {
			setOperand2((prev) => prev + number);
		}
	};
	const res = result || operand1 + operator + operand2;
	return (
		<div className={style.wrapper}>
			<input
				type="text"
				disabled
				className={style.textfield + ' ' + (result && style.active)}
				defaultValue={res}
			/>
			<div className={style.calculator}>
				{symbols.map((item, index) => (
					<button onClick={() => handleClick(item)} key={index}>
						{item}
					</button>
				))}
			</div>
		</div>
	);
};
