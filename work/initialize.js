let Queue = require('../work/Queue'),
    TablesAvailable = require('../work/TablesAvailable'),
    util = require('../work/util');

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

    const totalArrivalsDaily = util.sumOfVals(arrivalNumbersDaily),
        likelyHoods = util.getLikelyHoods(arrivalNumbersDaily, totalArrivalsDaily),
        arrivals = util.getArrivals(arrivalNumbersDaily),
        shuffledArrivals = util.shuffle(arrivals);

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
