function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    if (FindBrackets(expr) == false) throw ("ExpressionError: Brackets must be paired");
    
    let arr = expr.replace(/\s*/g, '').split('');

    let current = '';
    let stack = [];
    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    arr.forEach(el => {

        if (/\d+/gi.test(el)) {
            current += el;
        }
        else if (/[\(]/gi.test(el)) stack.push(el);

        else if (/[\-+*/]/gi.test(el)) {
            current += ' ';
            while (priority[stack[stack.length - 1]] >= priority[el]) {
                current += stack.pop();
                current += ' ';
            }
            stack.push(el);
        }

        else if (/[\)]/gi.test(el)) {
             current += ' ';
            while (stack[stack.length - 1] !== '(') {current += stack.pop();
            current += ' ';}
            stack.pop();
        }

    });

    while (stack.length !== 0) {
        current += ' ';
        current += stack.pop();
    }


    let newArr = current.split(/\s+/);
    let newStack = [];


    for (let i = 0; i < newArr.length; i++) {
        if (/\d+/gi.test(newArr[i])) newStack.push(newArr[i]);
        if (/[\-+*/]/gi.test(newArr[i])) {

            let a = parseFloat(newStack[newStack.length - 1]),
                b = parseFloat(newStack[newStack.length - 2]);

            if (newArr[i] == '*') {
                newStack.pop();
                newStack.pop();
                newStack.push(b * a);
            }

            if (newArr[i] == '/') {
                if (a !== 0) {
                    newStack.pop();
                    newStack.pop();
                    newStack.push(b / a);
                }
                else throw 'TypeError: Division by zero.';
            }

            if (newArr[i] == '+') {
                newStack.pop();
                newStack.pop();
                newStack.push(b + a);
            }


            if (newArr[i] == '-') {
                newStack.pop();
                newStack.pop();
                newStack.push(b - a);
            }





        }
    }

  return newStack[0];

}
function FindBrackets(expr) {
    let first = 0;
    let second = 0;
      for(let i = 0; i < expr.length; i++) {
      if(expr[i] == '(') first++;
      else if(expr[i] == ')') second++;
    }
    if( first == second) return true;
    else return false;
  }
  
  

module.exports = {
    expressionCalculator
}