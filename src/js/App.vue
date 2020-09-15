<template>
	<div class="container">
		<!-- numbers -->
		<button class="btn" :id="num.s" v-for="num in nums" @click="insertNum">
			<span class="btn-num">{{ num.v }}</span>
		</button>
		<!-- clear & backspace -->
		<button class="btn" id="clear" @click="clear"><img class="btn-ot" src="../assets/svg/clear.svg"></button>
		<button class="btn" id="backspace" @click="backspace"><img class="btn-ot" src="../assets/svg/backspace.svg"></button>
		<!-- operators -->
		<button class="btn" v-for="op in ops" :id="op.s" @click="insertOp">
			<img class="btn-op" :src="require(`../assets/svg/${op.s }.svg`)" :alt="op.s"></button>
		</button>
		<!-- equals -->
		<button class="btn" id="equals" @click="display"><img class="btn-op" src="../assets/svg/equals.svg"></button>
		<div id="output">
			<span class="output__expression">{{ expr }}</span>
			<span class="output__result">{{ result }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				nums: [ {s:'zero',v:0},{s:'one',v:1},{s:'two',v:2},{s:'three',v:3},
						{s:'four',v:4},{s:'five',v:5},{s:'six',v:6},{s:'seven',v:7},
						{s:'eight',v:8},{s:'nine',v:9},{s:'dot',v:'.'},
				] ,
				ops: [ {s:'plus',v:'+'},{s:'minus',v:'-'},{s:'multiply',v:'*'},{s:'divide',v:'/'},{s:'modulus',v:'%'} ] ,
				precedence: { '+':2 , '^':2 , '*':5, '/':5, '%':1 } ,
				
				expr: '0' ,
				res: '' ,
				curExprArr: [] ,
				operands: [] ,
				operators: [] ,
			}
		} ,
		methods: {
			clear () {
				this.expr = '0';
				this.res = '0';
				this.curExprArr = [];
				this.operands = [];
				this.operators = [];
			} ,
			backspace () {
				if (this.expr.length > 1) {
					const pop = this.expr[this.expr.length-1];
					if (pop.match(/[\+\^\*\%\/]+/)) {
						this.operators.pop();
					}
					this.expr = this.expr.substring(0 , this.expr.length - 1);
				} else {
					this.expr = '0';
				}
			} ,
			insertNum (e) {
				const key = e.target.textContent;
				if (this.expr.length < 12) {
					if (this.expr.length === 1 && this.expr === '0') {
						if (key === '.') {
							this.expr = this.expr + key;
						} else {
							this.expr = key;
						}
					} else {
						if (key === '.') {
							const latestOperand = this.operands[this.operands.length-1];
							if (!latestOperand.includes('.') && latestOperand !== '') {
								if (this.expr.length !== 11) {
									this.expr = this.expr + key;
								}
							}
						} else {
							this.expr = this.expr + key;
						}
					}
				}
			} ,
			insertOp (e) {
				const op = this.ops.find((opb) => {
					return opb.s === e.target.closest('button').id;
				}).v;
				const latestOperand = this.operands[this.operands.length-1];
				if (this.expr.length < 12 && this.expr !== '0' && this.expr !== '-') {
					if (latestOperand !== '') {
						const isLastDot = latestOperand.indexOf('.') === (latestOperand.length - 1);
						const isLastMinus = latestOperand.indexOf('-') === (latestOperand.length - 1);
						if (!isLastDot && !isLastMinus) {
							if (Number(latestOperand) !== 0) {
								if (this.expr.length !== 11) {
									if (op === '-') {
										this.expr += '^';
										this.operators.push('^');

									} else {
										this.expr = this.expr + op;
										this.operators.push(`${op }`);
									}
								}
							}
						}
					} else {
						if (op === '-') {
							this.expr += op;
						} else {
							this.expr = this.expr.slice(0 , this.expr.length-1);
							this.expr = this.expr + op;
							this.operators.pop();
							this.operators.push(`${op }`);
						}
					}
				} else {
					if (op === '-') {
						this.expr = op;
					}
				}
			} ,
			display () {
				this.expr = String(this.res);
			} ,
			calculate (a , op , b) {
				switch (op) {
					case '+': return a + b;
					case '^': return a - b;
					case '*': return a * b;
					case '/': return a / b;
					case '%': return ((b / a) * 100);
					default: return null;
				}
			} ,
		} ,
		computed: {
			result () {
				this.operands = this.expr.split(/[\+\^\*\%\/]+/);
				this.curExprArr = this.expr.split(/([\+\^\*\%\/]+)/g);
				let localOperands = [];
				let localOperators = [];
				let i = 0;
				let l = this.curExprArr.length;
				if ( this.curExprArr[l-1] === '' || this.curExprArr[l-1] === '-' ) {
					l -= 2;
				}
				if (i < l) {
					while (i < l) {
						let curExpr = this.curExprArr[i];
						let isOperand = (curExpr.split(/[\+\^\*\%\/]+/)).length === 1;
						let isOperator = (curExpr.split(/[\+\^\*\%\/]+/)).length === 2;
						if (isOperand) {
							localOperands.push(curExpr);
						} else if (isOperator) {
							let curOpPrecedence = this.precedence[curExpr];
							if (localOperators.length > 0) {
								let topOpPrecedence = this.precedence[localOperators[localOperators.length - 1]];
								while (curOpPrecedence <= topOpPrecedence) {
									let b = Number(localOperands.pop());
									let a = Number(localOperands.pop());
									let ans = this.calculate(a , localOperators.pop() , b);
									let isDec = Number(ans.toFixed(0)) === Number(ans.toFixed(2));
									if (isDec) {
										localOperands.push(ans);
									} else {
										localOperands.push(ans.toFixed(2));
									}

									if (localOperators.length > 0) {
										topOpPrecedence = this.precedence[localOperators[localOperators.length - 1]];
									} else {
										break;
									}
								}
							}
							localOperators.push(curExpr);
						}
						i++;
					}
				}
				if (localOperators.length > 0) {
					while(localOperators.length !== 0) {
						let b = Number(localOperands.pop());
						let a = Number(localOperands.pop());
						let ans = this.calculate(a , localOperators.pop() , b);
						let isDec = Number(ans.toFixed(0)) === Number(ans.toFixed(2));
						if (isDec) {
							localOperands.push(ans);
						} else {
							localOperands.push(ans.toFixed(2));
						}
					}
				}
				this.res = localOperands.pop();
				if (typeof this.res === 'number') {
					return this.res;
				}
			} ,
		} ,
	}
</script>

<style lang="scss">
	
</style>