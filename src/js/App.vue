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
		<button class="btn" id="equals"><img class="btn-op" src="../assets/svg/equals.svg"></button>
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
				expr: '0' ,
				res: '0' ,
				operands: [] ,
			}
		} ,
		methods: {
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
			clear () {
				this.expr = '0';
				this.res = '0';
				this.operands = [];
			} ,
			backspace () {
				if (this.expr.length > 1) {
					this.expr = this.expr.substring(0 , this.expr.length - 1);
				} else {
					this.expr = '0';
				}
			} ,
			insertOp (e) {
				const op = this.ops.find((opb) => {
					return opb.s === e.target.closest('button').id;
				}).v;
				const latestOperand = this.operands[this.operands.length-1];
				if (this.expr.length < 12 && this.expr !== '0') {
					if (latestOperand !== '') {
						const isLastDot = latestOperand.indexOf('.') === (latestOperand.length - 1);
						if (!isLastDot) {
							if (Number(latestOperand) > 0) {
								if (this.expr.length !== 11) {
									this.expr = this.expr + op;
								}
							}
						}
					} else {
						this.expr = this.expr.slice(0 , this.expr.length-1);
						this.expr = this.expr + op;
					}
				}
			} ,
		} ,
		computed: {
			result () {
				this.operands = this.expr.split(/[\+\-\*\%\/]+/);
				return this.res = this.expr;
			} ,
		} ,
	}
</script>

<style lang="scss">
	
</style>