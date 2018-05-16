import React from 'react';
import Amenities from './sub_stories/amenities';
import Welcoming from './sub_stories/welcoming';
const StoryTwo = () => {
  return (
    <div className={'story-content'}>
      <Welcoming />
      <Amenities />
    </div>

  );
};

export default StoryTwo;