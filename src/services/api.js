import mapConfig from '../utils/maps';
import {generateDateRanges} from "../utils/app";
import _ from 'lodash';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import gsjson from 'google-spreadsheet-to-json';
import GeoJSON from  'geojson';

const moment = extendMoment(Moment);

export function getEducationAttainmentGeoJson() {
  const educationAttainmentGeoReq = fetch(mapConfig.EDUCATION_ATTAINMENT_GEO_API).then(function (response) {
    return response.json()
  });
  const educationAttainmentApiReq = fetch(mapConfig.EDUCATION_ATTAINMENT_DATA_API).then(function (response) {
    return response.json()
  });
  return Promise.all([educationAttainmentGeoReq, educationAttainmentApiReq]).then(([educationAttainmentGeoData, educationAttainmentApiData]) => {
    return mapConfig.addEducationAttainmentDataToGeoJson(educationAttainmentGeoData, educationAttainmentApiData);
  })
}


export function getWACGeoJson() {
  return fetch(mapConfig.WAC_GEO_API).then(function (response) {
    return response.json()
  });
}

export function getDowtownWorkersGeoJson() {
  return fetch(mapConfig.WORKERS_DOWNTOWN_GEO_API).then(function (response) {
    return response.json()
  });
}


export function getRentIncomeGeoJson() {
  const rentIncomeGeoReq = fetch(mapConfig.RENT_INCOME_GEO_API).then(function (response) {
    return response.json()
  });

  const rentIncomeApiReq = fetch(mapConfig.RENT_INCOME_DATA_API).then(function (response) {
    return response.json()
  });

  return Promise.all([rentIncomeGeoReq, rentIncomeApiReq]).then(([rentIncomeGeoData, rentIncomeApiData]) => {
    return mapConfig.addRentIncomeDataToGeoJson(rentIncomeGeoData, rentIncomeApiData);
  })
}


export function getDiversityIndexGeoJson() {
  const diversityApiReq = fetch(mapConfig.DIVERSITY_DATA_API).then(function (response) {
    return response.json()
  });
  const diversityGeoReq = fetch(mapConfig.DIVERSITY_GEO_API).then(function (response) {
    return response.json()
  });


  return Promise.all([diversityApiReq, diversityGeoReq]).then(([diversityApiData, diversityGeoData]) => {
    return mapConfig.addDiversityIndexToGeoJSon(diversityGeoData, diversityApiData);
  })
}

export function getCrimeGeoJson() {
  const crimeValuesReq = fetch("https://cors-anywhere.herokuapp.com/https://mdda.azure-api.net/api/567b-f2cf?$select=block_geo_id,offense_category,Count&$filter=incident_datetime+ge+datetime'2017-01-01'+and+incident_datetime+le+datetime'2017-12-31'&$groupby=offense_category,block_geo_id&$format=geojson$download").then(function (response) {
    return response.json()
  });
  const crimeGeoReq = fetch("https://cors-anywhere.herokuapp.com/https://mdda.azure-api.net/api/567b-f2cf?$select=block_geo_id&$filter=incident_datetime+ge+datetime'2017-01-01'+and+incident_datetime+le+datetime'2017-12-31'&$format=geojson").then(function (response) {
    return response.json()
  });
  return Promise.all([crimeValuesReq, crimeGeoReq]).then(([crimeDataResp, crimeGeoResp]) => {
    crimeGeoResp['value'] = crimeDataResp['value'];
    const d = mapConfig.addViolentCrimeDataToGeoJson(crimeGeoResp);
    console.log(d, "CRIMEEMEME");
    return d;
  })
}


export function getAmenitiesData() {
  const restaurantsCountReq = fetch("https://services6.arcgis.com/kpe5MwFGvZu9ezGW/ArcGIS/rest/services/Restaurants_GreaterDowntown/FeatureServer/0/query?where=1=1&returnCountOnly=true&f=json").then(function (response) {
    return response.json()
  });
  const retailersCountReq = fetch("https://services6.arcgis.com/kpe5MwFGvZu9ezGW/arcgis/rest/services/DowntownRiverfrontBusinesses_May2017/FeatureServer/0/query?where=1=1&returnCountOnly=true&f=json").then(function (response) {
    return response.json()
  });
  const parksCountReq = fetch("https://services6.arcgis.com/kpe5MwFGvZu9ezGW/ArcGIS/rest/services/ParksPlazasDowntown/FeatureServer/0/query?where=BIZ_Maint='yes'&returnCountOnly=true&f=json").then(function (response) {
    return response.json()
  });
  return Promise.all([restaurantsCountReq, retailersCountReq, parksCountReq]).then(([restaurantData, retailerData, parkData]) => {
    const resp = {
      'restaurants': restaurantData.count,
      'retailers': retailerData.count,
      'parks': parkData.count
    };
    return resp;
  })
}

export function getCleaningWelcomingWorkData() {
  return gsjson({
    spreadsheetId: '1r6-qbuca22jmO3PooE0ElvKaubvoM-l8PwAP7wJ6ASY',
    worksheet: ['Summary']
  })
}

export function getAmenitiesServicesGeoJsonLayers() {
  const restaurantsReq = fetch("https://opendata.arcgis.com/datasets/f32e553f2b8f44258d46fbc7dbee1bf0_0.geojson").then(function (response) {
    return response.json()
  });
  const retailersReq = fetch("https://opendata.arcgis.com/datasets/fbd1487a98d14012acf7bd9cefe5f02e_0.geojson").then(function (response) {
    return response.json()
  });

  const parksReq = fetch("https://services6.arcgis.com/kpe5MwFGvZu9ezGW/ArcGIS/rest/services/ParksPlazasDowntown/FeatureServer/0/query?outFields=*&where=BIZ_Maint='yes'&returnGeometry=true&outSR=4326&f=geojson"
  ).then(function (response) {
    return response.json()
  });
  return Promise.all([restaurantsReq, retailersReq, parksReq]).then(([restaurants, retailers, parkData]) => {
     return {
       'restaurants': restaurants,
       'retailers': retailers,
       'parks': parkData
     }
  })
}

export function getAmenitiesInfrasctructureGeoJsonLayers() {
  const parkingGaragesReq = fetch("https://opendata.arcgis.com/datasets/1d3252a24eb0497c9a32d2f531f34da6_0.geojson\n").then(function (response) {
    return response.json()
  });

  const lighthousesReq = fetch("https://opendata.arcgis.com/datasets/35296f2001f94a37879586e35e8e0717_0.geojson").then(function (response) {
    return response.json()
  });

  const mogoStationsReq = fetch("https://opendata.arcgis.com/datasets/aed58cd4930d44db9da8867c5e784efd_0.geojson").then(function (response) {
    return response.json()
  });
  return Promise.all([parkingGaragesReq, lighthousesReq, mogoStationsReq]).then(([parkingGarages, lighthouses, mogoStations]) => {
    return {
      'parking garages': parkingGarages,
      'lighthouses': lighthouses,
      'MoGo stations': mogoStations
    }
  });
}

export function getWelcomingDataGeoJsonLayers() {
  return gsjson({
    spreadsheetId: '1r6-qbuca22jmO3PooE0ElvKaubvoM-l8PwAP7wJ6ASY',
    worksheet: ['March_EverythingReport.csv']
  }).then(resp => {
    let dataset = {};
    _.forEach(resp[0], (val, key) => {
        if(!dataset.hasOwnProperty(val['type'])){
          dataset[val['type']] = [];
        }
      dataset[val['type']].push(val)
    });
    let geoJsonDataset = {};
    _.forEach(dataset, (val, key) => {
      geoJsonDataset[key] = GeoJSON.parse(val, {Point: ['latitude', 'longitude']});
    });
    return geoJsonDataset;
  })
}

export function getWelcomingGeoJsonLayers() {
  const landscapingReq = fetch("https://opendata.arcgis.com/datasets/0836afc43295419d93d0de55aec712c0_0.geojson ").then(function (response) {
    return response.json()
  });

  return Promise.all([landscapingReq]).then(([landscapingData]) => {
    return {
      'landscaping': landscapingData,
    }
  });
}

export function getResidentialBuildingGeoJson(year) {
  let filter = 'where=1=1';
  if(year === '2018'){
    filter = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'"
  }else if(year === '2019'){ filter = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'+OR+EstDelivery='2019'"
  }else if(year === '2020'){
    filter = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'+OR+EstDelivery='2019'+OR+EstDelivery='2020'"
  }
  else if(year === '2021'){
    filter = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'+OR+EstDelivery='2019'+OR+EstDelivery='2020'+OR+EstDelivery='2021'"
  }
  else if(year === '2022'){
   filter = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'+OR+EstDelivery='2019'+OR+EstDelivery='2020'+OR+EstDelivery='2021'+OR+EstDelivery='2022'"
  }
  return fetch(`https://services6.arcgis.com/kpe5MwFGvZu9ezGW/ArcGIS/rest/services/ResidentialPipeline/FeatureServer/0/query?outFields=*&${filter}&returnGeometry=true&outSR=4326&f=geojson`).then(function (response) {
    return response.json()
  });

}


export function getResidentialUnitsData() {
  const baseUrl = `https://services6.arcgis.com/kpe5MwFGvZu9ezGW/ArcGIS/rest/services/ResidentialPipeline/FeatureServer/0/query?outStatistics=[{"statisticType": "sum","onStatisticField": "units","outStatisticFieldName": "total_units"}]&`;
  const returnType = "&f=json";
  const data2018 = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'";
  const data2019 = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'+OR+EstDelivery='2019'";
  const data2020 = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'+OR+EstDelivery='2019'+OR+EstDelivery='2020'";
  const data2021 = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'+OR+EstDelivery='2019'+OR+EstDelivery='2020'+OR+EstDelivery='2021'";
  const data2022 = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'+OR+EstDelivery='2019'+OR+EstDelivery='2020'+OR+EstDelivery='2021'+OR+EstDelivery='2022'";
  const req2018 = fetch(baseUrl + data2018 + returnType).then(function (response) {
    return response.json()
  });
  const req2019 = fetch(baseUrl + data2019 + returnType).then(function (response) {
    return response.json()
  });
  const req2020 = fetch(baseUrl + data2020 + returnType).then(function (response) {
    return response.json()
  });
  const req2021 = fetch(baseUrl + data2021 + returnType).then(function (response) {
    return response.json()
  });
  const req2022 = fetch(baseUrl + data2022 + returnType).then(function (response) {
    return response.json()
  });
  return Promise.all([req2018, req2019, req2020, req2021, req2022]).then(([resp2018, resp2019, resp2020, resp2021, resp2022]) => {
    return {
      '2018': resp2018['features'][0]['attributes']['total_units'],
      '2019': resp2019['features'][0]['attributes']['total_units'],
      '2020': resp2020['features'][0]['attributes']['total_units'],
      '2021': resp2021['features'][0]['attributes']['total_units'],
      '2022': resp2022['features'][0]['attributes']['total_units'],
    }
  });

}

export function getBIZRevenueData() {
  // set up for future API pulls to get BIZ revenue
  const baseUrl = `https://services6.arcgis.com/kpe5MwFGvZu9ezGW/ArcGIS/rest/services/ResidentialPipeline/FeatureServer/0/query?outStatistics=[{"statisticType": "sum","onStatisticField": "units","outStatisticFieldName": "total_units"}]&`;
  const returnType = "&f=json";
  const data2018 = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'";
  const req2018 = fetch(baseUrl + data2018 + returnType).then(function (response) {
    return response.json()
  });

  return Promise.all([req2018]).then(([resp2018]) => {
    return {
      '2014': 4002576,
      '2015': 4008309,
      '2016': 4014355,
      '2017': 4077192,
      '2018': 4165972,
    }
  });

}

export function getAssessedValueData() {
  // set up for future API pulls to get Assessed Value
  const baseUrl = `https://services6.arcgis.com/kpe5MwFGvZu9ezGW/ArcGIS/rest/services/ResidentialPipeline/FeatureServer/0/query?outStatistics=[{"statisticType": "sum","onStatisticField": "units","outStatisticFieldName": "total_units"}]&`;
  const returnType = "&f=json";
  const data2018 = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'";
  const req2018 = fetch(baseUrl + data2018 + returnType).then(function (response) {
    return response.json()
  });

  return Promise.all([req2018]).then(([resp2018]) => {
    return {
      '2013': 838000000,
      '2014': 825000000,
      '2015': 888000000,
      '2016': 946000000,
      '2017': 969000000,
    }
  });

}

export function getChangeInAssessment() {
  // set up for future API pulls to get Assessed Value
  const baseUrl = `https://services6.arcgis.com/kpe5MwFGvZu9ezGW/ArcGIS/rest/services/ResidentialPipeline/FeatureServer/0/query?outStatistics=[{"statisticType": "sum","onStatisticField": "units","outStatisticFieldName": "total_units"}]&`;
  const returnType = "&f=json";
  const data2018 = "where=EstDelivery='Before 2010'+OR+EstDelivery='2011'+OR+EstDelivery='2012'+OR+EstDelivery='2013'+OR+EstDelivery='2014'+OR+EstDelivery='2015'+OR+EstDelivery='2016'+OR+EstDelivery='2017'+OR+EstDelivery='2018'";
  const req2018 = fetch(baseUrl + data2018 + returnType).then(function (response) {
    return response.json()
  });

  return Promise.all([req2018]).then(([resp2018]) => {
    return {
      'Assessed Value (SEV)': 17,
      'BIZ Assessment': 4,
    }
  });

}

