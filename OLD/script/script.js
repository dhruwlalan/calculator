// output object
let output 		= document.getElementById('output');
// text operations
let clear 		= document.getElementById('clear');
let backspace 	= document.getElementById('backspace');
// operators
let modulus 	= document.getElementById('modulus');
let divide		= document.getElementById('divide');
let multiply 	= document.getElementById('multiply');
let minus 		= document.getElementById('minus');
let plus 		= document.getElementById('plus');
let equals 		= document.getElementById('equals');
// numbers
let one 		= document.getElementById('one');
let two 		= document.getElementById('two');
let three 		= document.getElementById('three');
let four 		= document.getElementById('four');
let five 		= document.getElementById('five');
let six 		= document.getElementById('six');
let seven 		= document.getElementById('seven');
let eight 		= document.getElementById('eight');
let nine 		= document.getElementById('nine');
let zero 		= document.getElementById('zero');
let dot 		= document.getElementById('dot');
// variables
let op1 = 0;
let op2 = 0;
let op;
let result = 0;


// text operations event listeners
clear.addEventListener( 'click' , function() {
	output.textContent = '0';
	op1 = 0;
	op2 = 0;
	op = '';
	result = 0;
});
backspace.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length > 1) {
		text = text.substring(0 , text.length - 1);
		output.textContent = text;
	} else {
		output.textContent = '0';
	}
});

// numbers event listeners
one.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '1';
		} else {
			text = text + '1';
		}
		output.textContent = text;
	}
});
two.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '2';
		} else {
			text = text + '2';
		}
		output.textContent = text;
	}
});
three.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '3';
		} else {
			text = text + '3';
		}
		output.textContent = text;
	}
});
four.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '4';
		} else {
			text = text + '4';
		}
		output.textContent = text;
	}
});
five.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '5';
		} else {
			text = text + '5';
		}
		output.textContent = text;
	}
});
six.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '6';
		} else {
			text = text + '6';
		}
		output.textContent = text;
	}
});
seven.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '7';
		} else {
			text = text + '7';
		}
		output.textContent = text;
	}
});
eight.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '8';
		} else {
			text = text + '8';
		}
		output.textContent = text;
	}
});
nine.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '9';
		} else {
			text = text + '9';
		}
		output.textContent = text;
	}
});
zero.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.length == 1 && text == '0') {
			text = '0';
		} else {
			text = text + '0';
		}
		output.textContent = text;
	}
});
dot.addEventListener( 'click' , function() {
	let text = output.textContent;
	if (text.length < 11) {
		if (text.indexOf('.') === -1) {
			if (text.length == 1 && text == '0') {
				text = '0.';
				isdot = true;
			} else {
				text = text + '.';
				isdot = true;
			}
			output.textContent = text;
		}	
	}
});

// operators event listeners
plus.addEventListener( 'click' , function() {
	op1 = parseNumber();
	output.textContent = '0';
	op = '+';
});
minus.addEventListener( 'click' , function() {
	op1 = parseNumber();
	output.textContent = '0';
	op = '-';
});
multiply.addEventListener( 'click' , function() {
	op1 = parseNumber();
	output.textContent = '0';
	op = '*';
});
divide.addEventListener( 'click' , function() {
	op1 = parseNumber();
	output.textContent = '0';
	op = '/';
});
modulus.addEventListener( 'click' , function() {
	op1 = parseNumber();
	output.textContent = '0';
	op = '%';
});
equals.addEventListener( 'click' , function() {
	if (output.textContent.length < 11) {
		switch(op) {
			case '+':
				op2 = parseNumber();
				result = op1 + op2;
				op1 = result;
				op = '+='
				break;
			case '+=':
				result += op2;
				break;
			case '-':
				op2 = parseNumber();
				result = op1 - op2;
				op1 = result;
				op = '-='
				break;
			case '-=':
				result -= op2;
				break;
			case '*':
				op2 = parseNumber();
				result = op1 * op2;
				op1 = result;
				op = '*='
				break;
			case '*=':
				result *= op2;
				break;
			case '/':
				op2 = parseNumber();
				result = op1 / op2;
				result = parseFloat(result.toFixed(4));
				op1 = result;
				op = '/='
				break;
			case '/=':
				result = result / (op2);
				result = parseFloat(result.toFixed(4));
				break;
			case '%':
				op2 = parseNumber();
				result = (op1 / op2) * 100;
				op = '%='
				break;
			case '%=':
				result = (result / op1) * 100;
				break;
		}
		if ( (result + '').indexOf('.') !== -1 ) {
			result = parseFloat(result.toFixed(4));
		}
		let length = (result + '').replace('.', '').length;
		if (length < 12) {
			output.textContent = result;
		}
	}
});

// grab current output textContent and return as number
function parseNumber() {
	let text = output.textContent;
	let dotIndex = text.indexOf('.');
	if (dotIndex !== -1) {
		let befDot = text.substring(0 , dotIndex);
		let afterDot;
		if ( text[text.length - 1] !== '.') {
			aftDot = text.substring(dotIndex + 1 , text.length);
		} else {
			return parseInt(befDot);
		}
		let dec = parseInt(aftDot) / (Math.pow(10 , aftDot.length) * 1.0);
		return parseInt(befDot) + dec;
	} else {
		return parseInt(text);
	}
}