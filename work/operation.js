/*
 * Seat as many customers (who are waiting in line) as we can
 * @param {Number} arrival - the number of people in the group that arrived
 * @param {Queue} enterQueue - a queue representing the people who are waiting to enter
 * @param {Queue} exitQueue - a queue representing the people who are eating, ready to eventually exit
 * @param {TablesAvailable} model - an object with a map representing the quantity & size of tables available
 * @param {Number} revenue - revenue made so far by the restaurant
 * @param {Number} avgRev - average revenue made per customer
 */
const seatCustomer = (arrival, enterQueue, exitQueue, model, revenue, avgRev) => {
    if (model.map.get(arrival) > 0) {
        model.sync(arrival);
        exitQueue.enqueue(arrival);

        if (!enterQueue.isEmpty()) {
            const enteringCustomer = enterQueue.dequeue();
            seatCustomer(enteringCustomer, enterQueue, exitQueue, model, revenue, avgRev);
            revenue += enteringCustomer * avgRev;
        }
    }
}

/*
 * Make the newly arrived customer wait in line
 * @param {Queue} queue
 * @param {Number} arrival
*/
const waitCustomer = (queue, arrival) => {
    queue.enqueue(arrival);
}

/*
 * Handle the case when a person has waited too long and leaves the restaurant
 * @param {Queue} queue
*/
const onPersonQuit = (queue) => {
    if (!queue.isEmpty) queue.dequeue();
}

/*
 * Handle the case when a customer finishes their meal, pays and leaves
 * @param {Queue} queue
 * @param {TablesAvailable} model
 * @param {Number} avgRev
*/
const onCustomerExit = (queue, model, avgRev) => {
    const leavingCustomer = queue.dequeue();
    model.sync(leavingCustomer, false);
    
    return leavingCustomer * avgRev;
}

module.exports = {
    seatCustomer,
    onPersonQuit,
    onCustomerExit
}