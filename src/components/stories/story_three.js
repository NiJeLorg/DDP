import React from 'react';
import WhatIsTheBIZ from './sub_stories/what_is_the_biz';
import WhoIsTheBIZ from './sub_stories/who_is_the_biz';
import HowIsTheBIZFunded from './sub_stories/how_is_the_biz_funded';
import WhereDoesBIZInvestmentGo from './sub_stories/where_does_biz_investment_go';
import WhatsTheImpactOfBIZServicesOnTheCommunity from './sub_stories/whats_the_impact_of_biz_services_on_the_community';
import StoryThreeConclusions from './sub_stories/story_three_conclusions';

const StoryThree = () => {  
  return (
    <div className={'story-content'}>
      <WhatIsTheBIZ />
      <WhoIsTheBIZ />
      <HowIsTheBIZFunded />
      <WhereDoesBIZInvestmentGo />
      <WhatsTheImpactOfBIZServicesOnTheCommunity />
      <StoryThreeConclusions />
    </div>

  );
};

export default StoryThree;