import React from 'react';
import DataBar from  './data_bar';

const Counter = ({counter}) => {
  return (
    <div className="chart-container">
      <div className={'c-counter'}>
        <img className={"img"} src={counter.img}/>
        <span className={'number'}>{counter.count.toLocaleString()}</span>
        <span className={'label'}>{counter.label}</span>
      </div>
      <DataBar/>
    </div>


  );
};

export default Counter;