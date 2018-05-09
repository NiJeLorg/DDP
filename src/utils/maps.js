import _ from 'lodash';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia2FzaGJvc3MiLCJhIjoiY2pjYnZiOXNyMG1iMjMzbzJlaTQ3dGFqbyJ9.Fe3wRj0zktbL6zxsTNk2DQ';
const MAPBOX_URL = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${MAPBOX_ACCESS_TOKEN}`;
const MAPBOX_ATTRIBUTION = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

const WAC_GEO_API = 'https://services2.arcgis.com/HsXtOCMp1Nis1Ogr/arcgis/rest/services/WorkerAreaCharacteristics_2015_DetroitMSA_20180409/FeatureServer/0/query?outFields=C000,CD04&where=DtownFlag=1&returnGeometry=true&outSR=4326&f=geojson\n';
const WORKERS_DOWNTOWN_GEO_API = 'https://services2.arcgis.com/HsXtOCMp1Nis1Ogr/arcgis/rest/services/WorkerAreaCharacteristics_2015_DetroitMSA_20180409/FeatureServer/0/query?outFields=C000&where=DtownFlag=1&returnGeometry=true&outSR=4326&f=geojson';

const ZOOM_LEVEL = 13;
const DETROIT_POSITION = {
  lat: 42.334165,
  lng: -83.048754
};

const EDUCATION_ATTAINMENT_GEO_API = 'https://api.censusreporter.org/1.0/geo/show/tiger2016?geo_ids=150|06000US2616322000';
const EDUCATION_ATTAINMENT_DATA_API = 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B15003&geo_ids=150%7C06000US2616322000';

const RENT_INCOME_GEO_API = 'https://api.censusreporter.org/1.0/geo/show/tiger2016?geo_ids=150|06000US2616322000';
const RENT_INCOME_DATA_API = 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B19013,B25058&geo_ids=150|06000US2616322000 ';

const DIVERSITY_GEO_API = 'https://api.censusreporter.org/1.0/geo/show/tiger2016?geo_ids=140|06000US2616322000';
const DIVERSITY_DATA_API = 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001B,B01001C,B01001D,B01001E,B01001F,B01001G,B01001H,B01001I&geo_ids=140|06000US2616322000';

const addEducationAttainmentDataToGeoJson = (geoJson, data) => {
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

const addRentIncomeDataToGeoJson = (geoJson, data) => {
  geoJson['features'] = geoJson['features'].map((block) => {
    const geoid = block.properties.geoid;
    const medianIncome = data['data'][geoid]['B19013']['estimate']['B19013001'];
    const medianRent = data['data'][geoid]['B25058']['estimate']['B25058001'];
    block.properties['rent_income_ratio'] = ((medianRent * 12) / parseFloat(medianIncome)) * 100;
    return block
  });
  return geoJson;
};


const addDiversityIndexToGeoJSon = (geoJson, data) => {
  geoJson['features'] = geoJson['features'].map((block) => {
    const geoid = block.properties.geoid;
    const diversityIndex = calculateDiversityIndex(data['data'][geoid]);
    block.properties['diversity_index'] = diversityIndex;
    return block
  });
  return geoJson;
};

function calculateDiversityIndex(data) {
  let totalPopulation = 0;
  let tableTotals = {};
  let sumOfSquares = 0;
  _.forEach(data, (rows, tableId) => {
    tableTotals[tableId] = rows['estimate'][`${tableId}001`];
    totalPopulation += tableTotals[tableId]
  });
  _.forEach(tableTotals, (tableTotal, tableId) => {
      sumOfSquares += Math.pow((tableTotal/parseFloat(totalPopulation)), 2)
  });
  return 1 - sumOfSquares
}


export default {
  MAPBOX_URL,
  MAPBOX_ATTRIBUTION,
  ZOOM_LEVEL,
  DETROIT_POSITION,
  addEducationAttainmentDataToGeoJson,
  addRentIncomeDataToGeoJson,
  addDiversityIndexToGeoJSon,
  EDUCATION_ATTAINMENT_GEO_API,
  WAC_GEO_API,
  EDUCATION_ATTAINMENT_DATA_API,
  WORKERS_DOWNTOWN_GEO_API,
  RENT_INCOME_GEO_API,
  RENT_INCOME_DATA_API,
  DIVERSITY_GEO_API,
  DIVERSITY_DATA_API
};