import React from 'react';
import StoryNavigator from './story_navigator';
import GeoMap from './geomap';
import DataDrawer from './data_drawer';
const Stories = () => {
    return (
        <div className="c-stories">
            {/*<DataDrawer />*/}
            <StoryNavigator />
            <GeoMap />

        </div>
    );
};

export default Stories;