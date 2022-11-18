import React, { useState } from 'react';
// use
// component name must be Uppercase
// the hook must be in the function/component body
// cannot call conditionally

const UseStateBasics = () => {
  // console.log(useState('matha faka'));
  // const value = useState(1)[0];
  // const handler = useState(1)[1];
  // console.log(value, handler);
  
  // the hook
  const [text, setText] = useState('matha faka');

  const handleClick = () => {
    if (text === 'matha faka') {
      setText('hello darling');
    } else {
      setText('matha faka');
    }
  };

  return (
    <React.Fragment>
      <h1>{ text }</h1>
      <button className='btn' onClick={ handleClick }>change title</button>
    </React.Fragment>
  )
};

export default UseStateBasics;
