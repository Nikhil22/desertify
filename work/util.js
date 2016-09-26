let entries = require('../work/entries');

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

module.exports = {
    shuffle,
    sumOfVals,
    getLikelyHoods,
    getArrivals
};