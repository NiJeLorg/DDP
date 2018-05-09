import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
export function generateDateRanges(start_date, end_date) {
  const range = moment.range(start_date, end_date);
  let ranges = [];
  for (let month of range.by('month')) {
    ranges.push(month.format('YYYY-MM-DD'));
  }
  return ranges;
}
