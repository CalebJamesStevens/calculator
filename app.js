let cBtn = document.querySelectorAll('.cBtn');
let btmDisp = document.querySelector('#bottom-display');
let topDisp = document.querySelector('#top-display');
let clearBtn = document.querySelector('#clear-button')
let btmDispStr = "";
let topDispStr = "";



cBtn.forEach(btn => btn.addEventListener('mouseover', mouseOver))
cBtn.forEach(btn => btn.addEventListener('click', cBtnClick))
cBtn.forEach(btn => btn.addEventListener('mouseout', mouseOut))

clearBtn.addEventListener('click', clear);
clearBtn.addEventListener('mouseover', mouseOver);
clearBtn.addEventListener('mouseout', mouseOut);

function mouseOver(e) {
    this.style['background-color'] = 'darkgrey';
}

function mouseOut(e) {
    this.style['background-color'] = 'lightgrey';
}

function cBtnClick(e) {
    if (btmDispStr == '0' && this.attributes[0].value == 0) {
        if (topDispStr.match(/[-,\*,\/,\+]/g)) {
            evaluate(topDispStr);
            return;
        }
        return;
    } 
    
    if (this.attributes[0].value.match(/[0-9]/g)) {
        if ((topDispStr != '' && !topDispStr.match(/[-,\*,\/,\+]/g)) || (topDispStr != '' && topDispStr[0] == "-" && topDispStr.match(/[-,\*,\/,\+]/g).length === 1)) {
            return;
        }
        btmDispStr += this.attributes[0].value;
        btmDisp.textContent = btmDispStr;
   }

    if (this.attributes[0].value.match(/\./g) && !btmDispStr.match(/\./g)) {
        if ((topDispStr != '' && !topDispStr.match(/[-,\*,\/,\+]/g)) || (topDispStr != '' && topDispStr[0] == "-" && topDispStr.match(/[-,\*,\/,\+]/g).length === 1)) {
            return;
        }
        console.log(`The truth is ${topDispStr[0] == "-"}, its actually ${topDispStr[0]}`);
        btmDispStr += this.attributes[0].value;
        btmDisp.textContent = btmDispStr;
    }



    if (this.attributes[0].value.match(/[-,\*,\/,\+]/g)) { 
        if(topDispStr === '' && btmDispStr === '') {
            return;
        }
        console.log('Clicked an operand');
        //is neg?
        if (Array.from(topDispStr)[0] === '-') {
            //if so is there still an operator?
            if (topDispStr.match(/[-,\*,\/,\+]/g).length > 1) {
                //if so is the bottom display populated
                if (btmDispStr !== '') {
                    //if soo evaluate
                    topDispStr += btmDispStr;
                    evaluate(topDispStr);
                    topDispStr += this.attributes[0].value;
                    return;
                } else {
                    return;
                    //if not return

                }
            } else {
                topDispStr += this.attributes[0].value;
                //if not add to top display
            }
        //if not neg
        } else {
            //is there already an operator?
            if (topDispStr.match(/[-,\*,\/,\+]/g)) {
                console.log('1')
                //if not is the bottom display populated?
                if (btmDispStr !== '') {
                    //if so evaluate
                    console.log('2')
                    topDispStr += btmDispStr;
                    evaluate(topDispStr);
                    topDispStr += this.attributes[0].value;
                    topDisp.textContent = topDispStr;
                    return;
                } else {
                    //if not return
                    return;
                }
            //if not add to top display
            } else {
                topDispStr += btmDispStr + this.attributes[0].value;
                topDisp.textContent = topDispStr;
                btmDispStr = '';
                btmDisp.textContent = btmDispStr;
            }

        }
    }

    if (this.attributes[0].value.match(/[\=]/g)) {
        topDispStr += btmDispStr;
        evaluate(topDispStr);
    }

    btmDisp.textContent = btmDispStr;
    topDisp.textContent = topDispStr;
}

function evaluate(str) {
    console.log(`evaluating ${topDispStr}`)
    let answer;
    let start = '';
    let operand;
    let operandIndex;
    let end = '';
    let afterOp = false;

    if (str.match(/[-,\*,\/,\+]/g).length > 1) {
        operand = str.match(/[-,\*,\/,\+]/g)[1];

    } else {
        operand = str.match(/[-,\*,\/,\+]/g)[0];
    }

    console.log (`Operand is ${operand}`)

    //operandIndex = str.search(/[-,\*,\/,\+]/g);
    Array.from(str);
    console.log(`This is the array ${Array.from(str)}`)
    for (i = 0; i < str.length; i++) {
        if (str[i].match(/[-,\*,\/,\+]/g) && i !== 0) {
            afterOp = true;
        }

        if (str[i].match(/[-,\*,\/,\+]/g) && i === 0) {
            start += str[i].toString();
        }

        if (str[i].match(/\./g) && !afterOp) {
            start += str[i].toString();

        }
        if (str[i].match(/\./g) && afterOp) {
            end += str[i].toString();

        }

        if (str[i].match(/[0-9]/g) && !afterOp) {
            start += str[i].toString();
        }

        if (str[i].match(/[0-9]/g) && afterOp) {
            end += str[i].toString();
        }
    }

    switch (operand) {
        case '\-':
            answer = parseFloat(start) - parseFloat(end);
            break;
        case '\+':
            answer = parseFloat(start) + parseFloat(end);
            break;
        case '\*':
            answer = parseFloat(start) * parseFloat(end);
            break;
        case '\/':
            answer = parseFloat(start) / parseFloat(end);
            break;

    }

    console.log(`answer is ${answer}`);
    btmDispStr = '';
    topDispStr = answer.toString();
    btmDisp.textContent = btmDispStr;
    topDisp.textContent = topDispStr;
}

function clear() {
    topDispStr = '';
    btmDispStr = '';
    topDisp.textContent = topDispStr;
    btmDisp.textContent = btmDispStr;
}