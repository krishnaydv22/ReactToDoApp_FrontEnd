import { useState } from "react";
import "./Counter.css";
import CounterButton from "./CounterButton";


export default function Counter(){
    
const [plus, setPlus] = useState(0);



  function incrementCounter(by){
    setPlus(plus + by)
}
function decrementCounter(by){
    setPlus(plus - by)
}

function handleReset(){
    setPlus(0);
}


   return (
    <>

  <span className="count">{plus}</span>

    <CounterButton by={1} incrementC = {incrementCounter} decrementC={decrementCounter}/>
    <CounterButton by={3} incrementC = {incrementCounter} decrementC={decrementCounter}/>
    <CounterButton by={5} incrementC = {incrementCounter} decrementC={decrementCounter}/>
    

    <button className="countButton" onClick={handleReset}>Reset</button>

    </>
   )

}

