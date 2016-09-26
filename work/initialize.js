let Queue = require('../work/Queue'),
    TablesAvailable = require('../work/TablesAvailable'),
    entries = require('../work/entries');

/*
 * shuffle an array so that each element has an equal chance of being placed at a particular random index
 * @param {Array} arr
 * @return {Array} - a new, shuffled array from @arr
*/
const shuffle = (arr) => {

  const getRandomArbitraryInt = (floor, ceiling) => {
    floor = Math.ceil(floor);
    ceiling = Math.floor(ceiling);
    return Math.floor(Math.random() * (ceiling - floor)) + floor;
  }

  return arr.map((el, idx) => {

    const randomIdx = getRandomArbitraryInt(0, arr.length),
          randomEl = arr[randomIdx],
          originalElAtTgtIdx = el;

    el = randomEl;
    arr[randomIdx] = originalElAtTgtIdx;

    return el;
  })
}

/*
 * Calculate the sum of all object values
 * @param {Object} obj
 * @return {Number}
*/
const sumOfVals = (obj) => {
	return Object.keys(obj).reduce((prev, curr) => {
  		return prev + obj[curr];
	}, 0);
}

/*
 * How likely is it that say, a group of 4 people will show up next?
 * @param {Object} obj
 * @param {Number} n
 * @return {Object}
*/
const getLikelyHoods = (obj, n) => {
	return Object.keys(obj).reduce((prev, curr) => {
		prev[curr] = obj[curr] / n;
		return prev;
	}, {})
}

/*
 * Returns an array of arrivals, where each element represents the number of people per group arriving
 * @param {Object} obj
*/
const getArrivals = (obj) => {
	const out = [];

	for (let [key, value] of entries(obj)) {
  		for (let i = 0; i < value; i++) {
    		out.push(Number(key));
  		}
	}

	return out;
}

/*
 * Initialize all data
*/
const initialize = () => {

  /*
   * The key represents the seating capacity in terms of # of people
   * The value represents the quantity of the table
  */
	const arrivalNumbersDaily = {
  		1: 5,
  		2: 20,
  		3: 20,
  		4: 15,
  		5: 10
	}

  /*
   * The key represents the number of people in a group who enter a restaurant
   * The value represents the number of times a day a group of size [key] enters
  */
	const tablesAvailableTemplate = new Map([
        [2, 4],
        [3, 3],
        [4, 2],
        [5, 2]
    ]);

    const totalArrivalsDaily = sumOfVals(arrivalNumbersDaily),
        likelyHoods = getLikelyHoods(arrivalNumbersDaily, totalArrivalsDaily),
        arrivals = getArrivals(arrivalNumbersDaily),
        shuffledArrivals = shuffle(arrivals);

    let tablesAvailable = new TablesAvailable(tablesAvailableTemplate);

    /*
    * a queue representing the people who are waiting to enter
    */
	let enterQueue = new Queue();

    /*
    * a queue representing the people who are eating, ready to eventually exit
    */
	let exitQueue = new Queue();
	let revenue = 0;

	return {
		totalArrivalsDaily,
		likelyHoods,
		arrivals,
		shuffledArrivals,
		tablesAvailable,
		enterQueue,
		exitQueue,
		revenue
	}
}

module.exports = initialize;
