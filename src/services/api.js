import mapConfig from '../utils/maps';
import { generateDateRanges} from "../utils/app";
import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export function getEducationAttainmentGeoJson() {
  const educationAttainmentGeoReq = fetch(mapConfig.EDUCATION_ATTAINMENT_GEO_API).then(function (response) {
    return response.json()
  });
  const educationAttainmentApiReq = fetch(mapConfig.EDUCATION_ATTAINMENT_DATA_API).then(function (response) {
    return response.json()
  });
  return Promise.all([educationAttainmentGeoReq, educationAttainmentApiReq]).then((
    [educationAttainmentGeoData, educationAttainmentApiData]) => {
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

  return Promise.all([rentIncomeGeoReq, rentIncomeApiReq]).then((
    [rentIncomeGeoData, rentIncomeApiData]) => {
    return  mapConfig.addRentIncomeDataToGeoJson(rentIncomeGeoData, rentIncomeApiData);
  })
}


export function getDiversityIndexGeoJson() {
  const diversityApiReq = fetch(mapConfig.DIVERSITY_DATA_API).then(function (response) {
    return response.json()
  });
  const diversityGeoReq = fetch(mapConfig.DIVERSITY_GEO_API).then(function (response) {
    return response.json()
  });


  return Promise.all([diversityApiReq, diversityGeoReq]).then((
    [diversityApiData, diversityGeoData]) => {
    return  mapConfig.addDiversityIndexToGeoJSon(diversityGeoData, diversityApiData);
  })
}

export function getCrimeGeoJson() {

  return fetch(mapConfig.CRIME_GEO_API.replace('$start', '2017-01-01').replace('$end', '2017-12-31')).then(function (response) {
    return response.json()
  }).then(data => {
    console.log(data[0],"Some Data");
    return  mapConfig.addViolentCrimeDataToGeoJson(data);
  });
  // let crimeGeoReq = [];
  // _.forEach(generateDateRanges('2017-01-01', '2017-12-31'), (monthStart) => {
  //   let end = moment(monthStart).endOf('month').format('YYYY-MM-DD');
  //   crimeGeoReq.push(
  //     fetch(mapConfig.CRIME_GEO_API.replace('$start', monthStart).replace('$end', end)).then( response => {
  //       return response.json();
  //     }).then(data => {
  //       console.log(data[0],"Some Data");
  //       return  mapConfig.addViolentCrimeDataToGeoJson(data);
  //     })
  //   );
  // });
  // return Promise.all(crimeGeoReq).then((crimeGeoResp) => {
  //   console.log(crimeGeoResp[0], "CRIMEEMEME DATA");
  //   const d =  mapConfig.aggregateCrimeData(crimeGeoResp);
  //   console.log(d, "CRIMEEMEME");
  //   return d;
  // })
}
