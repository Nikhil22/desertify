let findSmallestLarger = require('../work/binarySearch')['findSmallestLarger'],
    constants = require('../work/constants'),
    initialize = require('../work/initialize'),
    Queue = require('../work/Queue'),
    TablesAvailable = require('../work/TablesAvailable'),
    operation = require('../work/operation');

/*
 * Let the service begin!
 * @return {Number} revenue - total revenue generated in full day of operation
 */
const openDoors = () => {

    let {
        likelyHoods,
        shuffledArrivals,
        tablesAvailable,
        enterQueue,
        exitQueue,
        revenue
    } = initialize();

    shuffledArrivals.forEach((arrival, idx) => {

        /* A person has waited too long in line to eat, they quit and leave */
        if (idx % constants.MAX_WAIT_TIME === 0) {
            operation.onPersonQuit(enterQueue);
        }

        /* A person finishes eating, pays & exits */
        if (idx % constants.ENTERS_PER_EXIT === 0) {
            revenue += operation.onCustomerExit(exitQueue, tablesAvailable, constants.AVG_REVENUE_PER_CUSTOMER);
        }

        if (tablesAvailable.map.has(arrival)) {
            operation.seatCustomer(arrival, enterQueue, exitQueue, tablesAvailable, revenue, constants.AVG_REVENUE_PER_CUSTOMER);

            /*
             * If an exact matching table is not found for arrival, find the next largest table
             * Determine whether it would be worthwhile to seat the arrival in this larger table
             * Based on likelyhoods of future arrival sizes
             */
            if (tablesAvailable.map.get(arrival) === 0) {
                const smallestLarger = findSmallestLarger(tablesAvailable.list, arrival);
                let potential$FromWaiting, potential$FromSeatingArrival;

                if (smallestLarger) {
                    potential$FromSeatingArrival = constants.AVG_REVENUE_PER_CUSTOMER * arrival;
                    potential$FromWaiting = constants.AVG_REVENUE_PER_CUSTOMER * smallestLarger * likelyHoods[smallestLarger];
                }

                if (potential$FromWaiting > potential$FromSeatingArrival) {
                    operation.waitCustomer(enterQueue, arrival);
                } else {
                    operation.seatCustomer(smallestLarger, enterQueue, exitQueue, tablesAvailable, revenue, constants.AVG_REVENUE_PER_CUSTOMER);
                }
            }
        }
    })

    return revenue;
}

module.exports = {
    openDoors
};
