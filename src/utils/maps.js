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

const HTTP_PROXY = 'https://cors-anywhere.herokuapp.com/';
let CRIME_GEO_API =  "https://mdda.azure-api.net/api/567b-f2cf?$select=block_geo_id,offense_category,Count&$filter=incident_datetime+ge+datetime'$start'+and+incident_datetime+le+datetime'$end'&$groupby=offense_category,block_geo_id&$format=geojson";


const VALID_CRIME_CATEGORIES = ["AGGRAVATED ASSAULT", "ASSAULT", "BURGLARY", "HOMICIDE", "LARCENY", "ROBBERY", "SEXUAL ASSAULT", "STOLEN VEHICLE"];

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
    const diversityIndex = calculateDiversityIndex(data['data'][ block.properties.geoid]);
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

const addViolentCrimeDataToGeoJson = (geoJson) => {
  geoJson['data'] = {};
  geoJson['features'] = geoJson['features'].map((block) => {
    block.properties['crime'] = aggregateViolentCrimeCount(geoJson['value'], block.properties.geo_id);
    geoJson['data'][block.properties.geo_id] = block.properties['crime'];
    return block;
  });
  return geoJson;
};

function aggregateViolentCrimeCount(data, geoid) {
  let totalCrime = 0;
  _.forEach(data, (block, index) => {
    if(block.block_geo_id  === geoid && _.includes(VALID_CRIME_CATEGORIES, block.offense_category)) {
      totalCrime += parseInt(block['Count']);
    }
  });
  return totalCrime;
}



const wacValProperty = (feature) => {
  return feature.properties.CD04 / parseFloat(feature.properties.C000) * 100
};
const wacToolTip = (feature, layer)=> {
  layer.bindTooltip(() => {
    let percentage = feature.properties.CD04 / parseFloat(feature.properties.C000) * 100;
    return `Workers with Bachelor's Degeree: ${_.floor(percentage, 2)}%`
  });
};

const workersDowntownProperty = (feature) => {
  return feature.properties.C000
};

const workersDowntownToolTip = (feature, layer)=> {
  layer.bindTooltip(() => {
    return `Total workers downtown: ${feature.properties.C000}`
  });
}

const rentIncomeProperty = (feature) => {
  return feature.properties.rent_income_ratio
};

const rentIncomeToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `Percentage ratio of rent to median household income: ${_.floor(feature.properties.rent_income_ratio, 2)}%`
  });
};

const diversityIndexProperty = (feature) => {
  return feature.properties.diversity_index
};

const diversityIndexToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.name} Diversity Index: ${_.floor(feature.properties.diversity_index, 2)}`
  });
};

const crimeIndexProperty = (feature) => {
  return feature.properties.crime
};

const crimeIndexToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `Total Crime: ${feature.properties.crime}`
  });
};

const educationAttainmentValProperty = (feature) => {
  return feature.properties.bachelors_population / parseFloat(feature.properties.total_population) * 100
};

const educationAttainmentToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    let percentage = feature.properties.bachelors_population / parseFloat(feature.properties.total_population) * 100;
    return `Workers with Bachelor's Degeree: ${_.floor(percentage, 2)}%`
  });
};


const aggregateCrimeData = (geoJson) =>{
    let aggregateGeoJson = {};
    aggregateGeoJson = geoJson[0];
    _.forEach(geoJson, (data, index) => {
      if(index >  0) {
        aggregateGeoJson['features'] = aggregateGeoJson['features'].map((block) => {
          block.properties['crime'] +=  data['data'][block.properties.geo_id];
          return block;
        });
      }
    })
  return aggregateGeoJson;
};

const restaurantsToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.Name} ${feature.properties.Street_Address} ${feature.properties.Phone_Number}`
  });
};
const retailToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.COMPANYNAME}`
  });
};
const lighthousesToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.PopupInfo}`
  });
};

const parksToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.FULLNAME}`
  });
};
const parkingGarageToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.FacilityName}. Total Parking Space: ${feature.properties.TotalSpace}`
  });
};
const mogoToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.Name} - ${feature.properties.Location}`
  });
};

const welcomingToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.ambassadorFullname} - ${feature.properties.zoneTitle}`
  });
};

const landscapingToolTip = (feature, layer) => {
  layer.bindTooltip(() => {
    return `${feature.properties.LndscpArea} - ${feature.properties.LndscpNum}`
  });
};

export default {
  MAPBOX_URL,
  MAPBOX_ATTRIBUTION,
  ZOOM_LEVEL,
  DETROIT_POSITION,
  addEducationAttainmentDataToGeoJson,
  addRentIncomeDataToGeoJson,
  addDiversityIndexToGeoJSon,
  addViolentCrimeDataToGeoJson,
  wacToolTip,
  wacValProperty,
  workersDowntownProperty,
  workersDowntownToolTip,
  rentIncomeProperty,
  rentIncomeToolTip,
  diversityIndexProperty,
  diversityIndexToolTip,
  crimeIndexProperty,
  crimeIndexToolTip,
  educationAttainmentValProperty,
  educationAttainmentToolTip,
  aggregateCrimeData,
  restaurantsToolTip,
  retailToolTip,
  lighthousesToolTip,
  parksToolTip,
  parkingGarageToolTip,
  mogoToolTip,
  welcomingToolTip,
  landscapingToolTip,
  EDUCATION_ATTAINMENT_GEO_API,
  WAC_GEO_API,
  EDUCATION_ATTAINMENT_DATA_API,
  WORKERS_DOWNTOWN_GEO_API,
  RENT_INCOME_GEO_API,
  RENT_INCOME_DATA_API,
  DIVERSITY_GEO_API,
  DIVERSITY_DATA_API,
  CRIME_GEO_API
};