const visorCalc = document.querySelector('.visorCalc');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const btn4 = document.querySelector('.btn4');
const btn5 = document.querySelector('.btn5');
const btn6 = document.querySelector('.btn6');
const btn7 = document.querySelector('.btn7');
const btn8 = document.querySelector('.btn8');
const btn9 = document.querySelector('.btn9');
const btn10 = document.querySelector('.btn10');
const btncoma = document.querySelector('.btncoma');
const btnmas = document.querySelector('.btnmas');
const btnresta = document.querySelector('.btnresta');
const btnmulti = document.querySelector('.btnmulti');
const btndivi = document.querySelector('.btndivi');
const btnigual = document.querySelector('.btnigual');
const btnreset = document.querySelector('.btnreset');
const btnerase = document.querySelector('.btnerase');

const displaNumberOne = document.querySelector('.displaNumberOne');

let numberOne;
let numberTwo;

let operationSelected;

// let startNumer = (visorCalc.value = 0)

btn1.addEventListener('click',() => {
    visorCalc.value += Number(1);
});
btn2.addEventListener('click',() => {
    visorCalc.value += Number(2);
});
btn3.addEventListener('click',() => {
    visorCalc.value += Number(3);
});
btn4.addEventListener('click',() => {
    visorCalc.value += Number(4);
});
btn5.addEventListener('click',() => {
    visorCalc.value += Number(5);
});
btn6.addEventListener('click',() => {
    visorCalc.value += Number(6);
});
btn7.addEventListener('click',() => {
    visorCalc.value += Number(7);
});
btn8.addEventListener('click',() => {
    visorCalc.value += Number(8);
});
btn9.addEventListener('click',() => {
    visorCalc.value += Number(9);
});
btn10.addEventListener('click',() => {
    visorCalc.value += Number(0);
});
btncoma.addEventListener('click',() => {
    visorCalc.value += ".";
});



btnreset.addEventListener('click',() => {
    visorCalc.value = null;
    numberOne = null ;
    numberTwo = null ;
    displaNumberOne.innerHTML = null;

    
});
btnerase.addEventListener('click',() => {
    let eraseDigit = visorCalc.value.slice(0,-1);
    
     visorCalc.value = eraseDigit;
    
});


btnmas.addEventListener('click',() => {
    numberOne = visorCalc.value ;
    
     visorCalc.value = null;

    // operationSelected = "add";
    operationSelected = "+";

    displaNumberOne.innerHTML = numberOne + operationSelected;
});

btnresta.addEventListener('click',() => {
    numberOne = visorCalc.value ;
    
     visorCalc.value = null;

    // operationSelected = "substract";
    operationSelected = "-";
    displaNumberOne.innerHTML = numberOne + operationSelected;
});

btnmulti.addEventListener('click',() => {
    numberOne = visorCalc.value ;
    visorCalc.value = null;
    
    // operationSelected = "multiplication";
    operationSelected = "*";
    displaNumberOne.innerHTML = numberOne + operationSelected;
});

btndivi.addEventListener('click',() => {
    numberOne = visorCalc.value ;
    
     visorCalc.value = null;

    // operationSelected = "division";
    operationSelected = "/";
    displaNumberOne.innerHTML = numberOne + operationSelected;
});


btnigual.addEventListener('click',() => {
    
    numberTwo = visorCalc.value ;
    

    if (operationSelected == "+"){
        
        displaNumberOne.innerHTML = numberOne + operationSelected + numberTwo;

        visorCalc.value = Number(numberOne) + Number(numberTwo);
    }
    else if (operationSelected == "-") {

        displaNumberOne.innerHTML = numberOne + operationSelected + numberTwo;


        visorCalc.value = Number(numberOne) - Number(numberTwo);
    }
    else if (operationSelected == "*") {
        displaNumberOne.innerHTML = numberOne + operationSelected + numberTwo;


        visorCalc.value = Number(numberOne) * Number(numberTwo);
    }
    else if (operationSelected == "/") {
        displaNumberOne.innerHTML = numberOne + operationSelected + numberTwo;


        visorCalc.value = Number(numberOne) / Number(numberTwo);
    }
});


