import mapConfig from '../utils/maps';
import {generateDateRanges} from "../utils/app";
import _ from 'lodash';
import Moment from 'moment';
import {extendMoment} from 'moment-range';

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
