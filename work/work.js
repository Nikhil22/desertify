let findSmallestLarger = require('../work/binarySearch')['findSmallestLarger'],
		constants = require('../work/constants'),
		initialize = require('../work/initialize'),
		Queue = require('../work/Queue'),
		TablesAvailable = require('../work/TablesAvailable');

/*
 * Seat as many customers (who are waiting in line) as we can
 */
const seatCustomer = (arrival, enterQueue, exitQueue, tablesAvailable, revenue, avgRev) => {
	if (tablesAvailable.map[arrival] > 0) {
		tablesAvailable.sync(arrival);
		exitQueue.enqueue(arrival);

		if (!enterQueue.isEmpty()) {
			const enteringCustomer = enterQueue.dequeue();
			seatCustomer(enteringCustomer, enterQueue, exitQueue, tablesAvailable, revenue, avgRev);
			revenue += enteringCustomer * avgRev;
		}
	}
}

/*
 * Let the service begin!
*/
const openDoors = () => {

	let {
		totalArrivalsDaily,
		likelyHoods,
		arrivals,
		shuffledArrivals,
		tablesAvailable,
		enterQueue,
		exitQueue,
		revenue
	} = initialize();

	arrivals.forEach(function(arrival, idx) {

		/* A person has waited too long in line to eat */
		if (idx % constants.MAX_WAIT_TIME === 0) {
			if (!enterQueue.isEmpty) enterQueue.dequeue();
		}

		/* A person finishes eating, pays & exits */
		if (idx % constants.ENTERS_PER_EXIT === 0) {
			const leavingCustomer = exitQueue.dequeue();
			revenue += leavingCustomer * constants.AVG_REVENUE_PER_CUSTOMER;
			tablesAvailable.sync(leavingCustomer, false);
		}

		if (tablesAvailable.map.hasOwnProperty(arrival)) {

			seatCustomer(arrival, enterQueue, exitQueue, tablesAvailable, revenue, constants.AVG_REVENUE_PER_CUSTOMER);

			/*
			 * If an exact matching table is not found for arrival, find the next largest table
			 * Determine whether it would be worthwhile to seat the arrival in this larger table
			 * Based on likehoods of future arrival sizes
			*/
      if (tablesAvailable.map[arrival] === 0) {
        const smallestLarger = findSmallestLarger(tablesAvailable.list, arrival);
			  let potential$FromWaiting, potential$FromSeatingArrival;

				if (smallestLarger) {
						potential$FromSeatingArrival = constants.AVG_REVENUE_PER_CUSTOMER * arrival;
						potential$FromWaiting = constants.AVG_REVENUE_PER_CUSTOMER * smallestLarger * likelyHoods[smallestLarger];
				}

  			if (potential$FromWaiting > potential$FromSeatingArrival) {
  					enterQueue.enqueue(arrival);
  			}else {
					seatCustomer(smallestLarger, enterQueue, exitQueue, tablesAvailable, revenue, constants.AVG_REVENUE_PER_CUSTOMER);
				}
      }

		}
	})

	return revenue;
}

module.exports = {openDoors};
