/*
 * A queue implementation (fist in, first out)
 * enqueue -> O(1)
 * dequeue -> 0(1) b/c per every n operations, we shift n elements
 */
class Queue {

    constructor() {
        this.queue = [];
        this.offset = 0;
    }

    getLength() {
        return (this.queue.length - this.offset);
    }

    isEmpty() {
        return (this.queue.length === 0);
    }

    enqueue(item) {
        this.queue.push(item);
    }

    dequeue() {

        if (this.queue.length === 0) return null;

        const item = this.queue[this.offset];

        // increment the offset and remove the free space if necessary
        if (++this.offset * 2 >= this.queue.length) {
            this.queue = this.queue.slice(this.offset);
            this.offset = 0;
        }

        return item;

    }

    peek() {
        return (this.queue.length > 0 ? this.queue[this.offset] : null);
    }

}

module.exports = Queue;
