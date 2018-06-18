import * as moment from 'moment';
import median from './median';
import standardDeviation from './standardDeviation';
import filterOutliers from './filterOutliers';

export default (picks) => {
  if (!picks || !picks.length) return [{ pick: 350, date: new Date() }];
  const sortedArray = picks.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1);
  let date = moment();
  date.subtract(30, 'days');
  const buckets = [[]];
  sortedArray.forEach((pick) => {
    let pickUsed = false;
    while (!pickUsed) {
      if (moment(pick.date) > date) {
        buckets[0].push(pick);
        pickUsed = true;
      } else {
        while (buckets[0].length < 4) buckets[0].push({ pick: 350, date: date.toDate()});
        date.subtract(30, 'days');
        buckets.unshift([]);
      }
    }
  });
  return buckets.map(array => {
    const stdev = standardDeviation(filterOutliers(array).map(x => x.pick));
    const med = median(array.map(x => x.pick));
    return [new Date(array[0].date).getTime(), med - stdev, med + stdev]
  });
}
