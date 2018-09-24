import React from 'react';

const CounterImpact = ({counter}) => {
  return (
    <div className="l-story-grid">
      <div className="l-story-grid-row">
        <div className="l-story-grid-column-half">
          <div className={'c-counter'}>
            <img className={"img"} src={counter.img}/>
            <span className={'number'}>{counter.count.toLocaleString()}</span>
            <span className={'label'}>{counter.label}</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CounterImpact;