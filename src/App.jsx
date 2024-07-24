import { useEffect, useState } from 'react'


function App() {



  const [input, setInput] = useState("");     //ono sto se unosi u kalkulator tj. ono sto se racuna
  const [result, setResult] = useState("");

  const trimmedInput = input.trim()

  const isOperator = (symbol) => {     //funkcija za provjerit je li znak koji provjeravamo matematicki operator
    return /[*/+-]/.test(symbol);
  }

  const calculate = () => {
    if ( isOperator(trimmedInput.charAt(trimmedInput.length - 1)) ) { // ako input izgleda ovako 9 + 5 + nista nemoj napravit
      return;
    }

    // 10 + - * + 10 = 20 jer zadnji operator se mora koristit

    const parts = trimmedInput.split("");
    const filteredParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {

      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        filteredParts.unshift(parts[i]);;
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        filteredParts.unshift(parts[i]);
      }
       }
    
    const finalExpression = filteredParts.join("");

    if (isOperator(finalExpression.charAt(0))) {
      setResult(eval(result + finalExpression).toString())
    } else {
      setResult(eval(finalExpression).toString())
    }
    setInput("")
  }

  const handleClick = (symbol) => {   
    if (symbol === "C") {
      setInput("0");
      setResult("");
      return;
    } else if (symbol === "%") {
      if (result === "") {
        return;
      } else {
        setResult((parseFloat(result) / 100).toString());
      }
      
    } else if ( symbol === "negative" ) {
      if (result === "") { 
        return;
      } else {
        setResult(
          result.toString().charAt(0) === "-" ? result.slice(1) : "-" + result
        )
      }
    } else if (symbol === "=") {
      calculate();

    } else if (isOperator(symbol)) {
      setInput( trimmedInput + " " + symbol + " " );

      //Moramo sprijecit stavljanje nule na pocetak 
    } else if ( symbol === "0" ) {
      if (input.charAt(0) !== "0") {
        setInput( input + symbol );
    }
  } else if ( symbol === "." ) {
    //split  and get last number
      const lastNum = input.split(/[-+/*]/g).pop();
      if ( !lastNum  ) return;
      if (lastNum.includes(".")) return;
      
      setInput(input + symbol)
  } else {
      if (input.charAt(0) === "0")  {
        setInput(input.slice(1) + symbol)
      } else {
        setInput(input + symbol);
      }
  }
  }



  return (

    <>
      <h1 className='align'>FCC Calculator test</h1>
      <br />
      <div className='calculator' id="calculator">
        <div className='display' id='display'>
          <div className='result'>{result}</div>
          <div className='input'>{input}</div>
        </div>
        <div className='buttons'>
          <button className='red' id="clear" onClick={() => handleClick("C")}>C</button>
          <button className='orange' onClick={() => handleClick("%")}>%</button>
          <button className='orange' id="add" onClick={() => handleClick("+")}>+</button>
          <button className='light-gray' id="seven" onClick={() => handleClick("7")}>7</button>
          <button className='light-gray' id="eight" onClick={() => handleClick("8")}>8</button>
          <button className='light-gray' id="nine" onClick={() => handleClick("9")}>9</button>
          <button className='orange' id="subtract" onClick={() => handleClick("-")}>-</button>
          <button className='light-gray' id="four" onClick={() => handleClick("4")}>4</button>
          <button className='light-gray' id="five" onClick={() => handleClick("5")}>5</button>
          <button className='light-gray' id="six" onClick={() => handleClick("6")}>6</button>
          <button className='orange' id="multiply" onClick={() => handleClick("*")}>x</button>
          <button className='light-gray' id="three" onClick={() => handleClick("3")}>3</button>
          <button className='light-gray' id="two" onClick={() => handleClick("2")}>2</button>
          <button className='light-gray' id="one" onClick={() => handleClick("1")}>1</button>
          <button className='orange' id="divide" onClick={() => handleClick("/")}>/</button>
          <button className='light-gray' id="zero" onClick={() => handleClick("0")}>0</button>
          <button className='orange' onClick={() => handleClick("negative")}>+/-</button>
          <button className='orange' id="decimal" onClick={() => handleClick(".")}>.</button>
          <button className='orange' id="equals" onClick={() => handleClick("=")}>=</button>
        </div>
      </div>

    </>

  )
    ;

}


export default App;
