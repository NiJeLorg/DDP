const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia2FzaGJvc3MiLCJhIjoiY2pjYnZiOXNyMG1iMjMzbzJlaTQ3dGFqbyJ9.Fe3wRj0zktbL6zxsTNk2DQ';
const MAPBOX_URL = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${MAPBOX_ACCESS_TOKEN}`;
const MAPBOX_ATTRIBUTION = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

const ZOOM_LEVEL = 13;
const DETROIT_POSITION = {
  lat: 42.334165,
  lng: -83.048754
};

const EDUCATION_ATTAINMENT_GEO_API = 'https://api.censusreporter.org/1.0/geo/show/tiger2016?geo_ids=150|06000US2616322000\n';
const  EDUCATION_ATTAINMENT_DATA_API = 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B15003&geo_ids=150%7C06000US2616322000';

const addEducationAttainmentDataToGeoJson = (geoJson, data) =>{
  geoJson['features'] = geoJson['features'].map((block) => {
    const geoid = block.properties.geoid;
    const totalPopulation = data['data'][geoid]['B15003']['estimate']['B15003001'];
    const bachelorsPopulation = data['data'][geoid]['B15003']['estimate']['B15003022'];
    block.properties['total_population'] = totalPopulation;
    block.properties['bachelors_population'] = bachelorsPopulation;
    return block
  });
  return geoJson;
};

export default  {
  MAPBOX_URL,
  MAPBOX_ATTRIBUTION,
  ZOOM_LEVEL,
  DETROIT_POSITION,
  addEducationAttainmentDataToGeoJson,
  EDUCATION_ATTAINMENT_GEO_API,
  EDUCATION_ATTAINMENT_DATA_API
};