<template>
    <div>
        <app-settings :design="design" @changeDesign="design = $event" 
                      :theme="theme" @changeTheme="theme = $event"
                      :class="designTheme"
                      :modal="modal" @openModal="modal = true" @closeModal="modal = false">
        </app-settings>
        <div class="container" :class="[designTheme , {blur: modal}]">
            <div class="grid" :class="`grid--${design }`">
                <!-- numbers -->
                <button class="btn" :class="`btn--${design }`" :id="num.s" v-for="num in nums" @click="insertNum">
                    <span class="btn-num">{{ num.v }}</span>
                </button>
                <!-- operators -->
                <button class="btn" :class="`btn--${design }`" v-for="op in ops" :id="op.s" @click="insertOp">
                    <img class="btn-op" :src="require(`../assets/svg/${op.s }.svg`)" :alt="op.s">
                </button>
                <!-- clear , backspace & equals -->
                <button class="btn" :class="`btn--${design }`" id="clear" @click="clear">
                    <img class="btn-ot" src="../assets/svg/clear.svg">
                </button>
                <button class="btn" :class="`btn--${design }`" id="backspace" @click="backspace">
                    <img class="btn-ot" src="../assets/svg/backspace.svg">
                </button>
                <button class="btn" :class="`btn--${design }`" id="equals" @click="display">
                    <img class="btn-op" src="../assets/svg/equals.svg">
                </button>
                <!-- output -->
                <div id="output" class="output" :class="`output--${design }`">
                    <transition :name="animationType">
                        <div class="output__expression" v-if="switchResult">
                            <span :class="`output__expression--${token.s }`" v-for="token in tokens">{{ token.v }}</span>
                        </div>
                    </transition>
                    <transition :name="animationType">
                        <div class="output__expression" v-if="!switchResult">
                            <span :class="`output__expression--${token.s }`" v-for="token in tokens">{{ token.v }}</span>
                        </div>
                    </transition>
                    <span class="output__result" :class="`output__result`">{{ result }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Settings from './components/Settings.vue';
    export default {
        components: {
            appSettings: Settings ,
        } ,
        data () {
            return {
                nums: [ {s:'zero',v:0},{s:'one',v:1},{s:'two',v:2},{s:'three',v:3},{s:'four',v:4},{s:'five',v:5},
                        {s:'six',v:6},{s:'seven',v:7},{s:'eight',v:8},{s:'nine',v:9},{s:'dot',v:'.'} ] ,
                ops: [ {s:'plus',v:'+'},{s:'minus',v:'-'},{s:'multiply',v:'*'},{s:'divide',v:'/'},{s:'modulus',v:'%'} ] ,
                precedence: { '+':2 , '^':2 , '*':5, '/':5, '%':1 } ,
                expr: '0' ,
                res: '' ,
                totalDigits: 14 ,
                curExprArr: [] ,
                operands: [] ,
                operators: [] ,
                switchResult: true ,
                animationType: 'fade' ,
                design: 'material' ,
                theme: 'light' ,
                modal: false ,
            }
        } ,
        methods: {
            clear () {
                // clear only if something to be cleared:
                if (this.expr !== '0') {
                    this.expr = '0';
                    this.res = '0';
                    this.curExprArr = [];
                    this.operands = [];
                    this.operators = [];
                    this.switchResult = !this.switchResult;
                    this.animationType = 'clear';
                }               
            } ,
            backspace () {
                if (this.expr.length > 1) {
                    const pop = this.expr[this.expr.length-1];
                    // check if the poped character is an operator
                    if (pop.match(/[\+\^\*\%\/]+/)) {
                        this.operators.pop();
                    }
                    this.expr = this.expr.substring(0 , this.expr.length - 1);
                } else {
                    this.expr = '0';
                }
            } ,
            insertNum (e) {
                // get the number key pressed:
                const key = e.target.textContent;
                // append the key if enough space:
                if (this.expr.length < this.totalDigits) {
                    // handle the first digit:
                    if (this.expr === '0') {
                        if (key === '.') {
                            this.expr = this.expr + key;
                        } else {
                            this.expr = key;
                        }
                    } else {
                        if (key === '.') {
                            // only append single dot in an operand:
                            if (!this.latestOperand.includes('.') && this.isValidLatestOperand) {
                                if (this.expr.length !== this.totalDigits - 1) {
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
                // get the correct operator:
                const op = this.ops.find((opb) => {
                    return opb.s === e.target.closest('button').id;
                }).v;
                // add operator to the stack:
                if (this.expr.length < this.totalDigits && this.expr !== '0' && this.expr !== '-') {
                    if (this.latestOperand !== '') {
                        const isLastDot = this.latestOperand.indexOf('.') === (this.latestOperand.length - 1);
                        const isLastMinus = this.latestOperand.indexOf('-') === (this.latestOperand.length - 1);
                        if (!isLastDot && !isLastMinus) {
                            if (Number(this.latestOperand) !== 0) {
                                if (this.expr.length !== this.totalDigits - 1) {
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
                            if (this.expr.length < this.totalDigits - 1) {
                                this.expr += op;
                            }
                        } else {
                            this.expr = this.expr.slice(0 , this.expr.length-1);
                            this.expr = this.expr + op;
                            this.operators.pop();
                            this.operators.push(`${op }`);
                        }
                    }
                } else {
                    // first digit can be minus as operand:
                    if (this.expr.length < this.totalDigits - 1) {
                        if (op === '-') {
                            this.expr = op;
                        }
                    }
                }
            } ,
            display () {
                if (typeof this.res === 'number') {
                    this.expr = String(this.res);
                    this.animationType = 'fade';
                    this.switchResult = !this.switchResult;
                }
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
            exprType (expr) {
                let isOperand = (expr.split(/[\+\^\*\%\/]+/)).length === 1;
                let isOperator = (expr.split(/[\+\^\*\%\/]+/)).length === 2;
                if (isOperand) {
                    return 'operand';
                } else if (isOperator) {
                    return 'operator';
                }
            } ,
            sanatizeAns (ans) {
                let isDec = Number(ans.toFixed(0)) === Number(ans.toFixed(2));
                if (isDec) {
                    return Number(ans);
                } else {
                    return Number(ans.toFixed(2));
                }
            } ,
        } ,
        computed: {
            result () {
                // split latest expr to extract all the operands:
                this.operands = this.expr.split(/[\+\^\*\%\/]+/);

                // split latest expr into array of operands and operators:
                this.curExprArr = this.expr.split(/([\+\^\*\%\/]+)/g);

                let localOperands = [];
                let localOperators = [];
                let i = 0;
                let l = this.curExprArr.length;

                // set l upto valid expr that can be calculated:
                if ( this.curExprArr[l-1] === '' || this.curExprArr[l-1] === '-' ) {
                    l -= 2;
                }

                // check if there is an valid expression to be calculated:
                if (i < l) {
                    // read the current expression array:
                    while (i < l) {
                        // get the current expression for the current expressions array:
                        let curExpr = this.curExprArr[i];

                        if (this.exprType(curExpr) === 'operand') {
                            localOperands.push(curExpr);
                        } else if (this.exprType(curExpr) === 'operator') {
                            let curOpPrecedence = this.precedence[curExpr];
                            // if there exist any operators in the operators stack:
                            if (localOperators.length > 0) {
                                let topOpPrecedence = this.precedence[localOperators[localOperators.length - 1]];
                                while (curOpPrecedence <= topOpPrecedence) {
                                    let b = Number(localOperands.pop());
                                    let a = Number(localOperands.pop());
                                    let ans = this.calculate(a , localOperators.pop() , b);
                                    localOperands.push(this.sanatizeAns(ans));
                                    // check if still there is any operator left else exit:
                                    if (localOperators.length > 0) {
                                        topOpPrecedence = this.precedence[localOperators[localOperators.length - 1]];
                                    } else {
                                        break;
                                    }
                                }
                            }
                            // push the current operator to operators stack:
                            localOperators.push(curExpr);
                        }
                        i++;
                    }
                }
                // pop all the remaining operators:
                if (localOperators.length > 0) {
                    while(localOperators.length !== 0) {
                        let b = Number(localOperands.pop());
                        let a = Number(localOperands.pop());
                        let ans = this.calculate(a , localOperators.pop() , b);
                        localOperands.push(this.sanatizeAns(ans));
                    }
                }

                // get the final result:
                this.res = localOperands.pop();

                // if only there is a result of an expression calculated, return the result: 
                if (typeof this.res === 'number') {
                    return this.res;
                }
            } ,
            tokens () {
                let tokensArr = [];
                let tokens = this.expr.split('');
                tokens.forEach((token) => {
                    if (token === '+') {
                        tokensArr.push( {s:'op', v:'+'} );
                    } else if (token === '^') {
                        tokensArr.push( {s:'op', v:'-'} );
                    } else if (token === '*') {
                        tokensArr.push( {s:'op', v:'×'} );
                    } else if (token === '/') {
                        tokensArr.push( {s:'op', v:'÷'} );
                    } else if (token === '%') {
                        tokensArr.push( {s:'mod', v:'%'});
                    } else {
                        tokensArr.push({s:'num' , v:token});
                    }
                });
                return tokensArr;
            } ,
            latestOperand () {
                return this.operands[this.operands.length-1];
            } ,
            isValidLatestOperand() {
                return (this.latestOperand !== '' && this.latestOperand !== '-');
            } ,
            designTheme () {
                return `${this.design }--${this.theme }`;
            } ,
        } ,
    }
</script>

<style lang="scss">
</style>