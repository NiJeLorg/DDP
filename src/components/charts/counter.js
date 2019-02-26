import React from 'react';

const Counter = ({counter}) => {
  return (
    <div className="c-counter-wrapper">
      <div className={'c-counter'}>
        <img className={"img"} src={counter.img}/>
        <span className={'number'}>{counter.count.toLocaleString()}</span>
        <span className={'label'}>{counter.label}</span>
      </div>
    </div>
  );
};

export default Counter;