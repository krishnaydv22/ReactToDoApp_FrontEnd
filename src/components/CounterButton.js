import { useState } from "react";


export default function CounterButton({by,incrementC, decrementC}) {
    const [plusone, setPlusone] = useState(0);
  
  
  
    function handleClickPlus() {
      setPlusone(plusone + 1);
      incrementC(by);
  
    }
  
    function handleClickMinus(){
      setPlusone(plusone - 1);
      decrementC(by);
    }
  
    return (
      <div className="container">
    {/* <span className="count">{by}</span> */}
    <div className="calculator">
      <button className="countButton" onClick={handleClickPlus}>+{by}</button>
      <button className="countButton" onClick={handleClickMinus}>-{by}</button>
      </div>
   
  </div>
    );
  }
  