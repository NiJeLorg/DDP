import React from 'react';
import Amenities from './sub_stories/amenities';
import Welcoming from './sub_stories/welcoming';
import Residential from './sub_stories/residential';
const StoryTwo = () => {
  return (
    <div className={'story-content'}>
      <Welcoming />
      <Amenities />
      <Residential />
    </div>

  );
};

export default StoryTwo;