/*
 * A stateful object representing the size of each table available
 * Keeps track of this both a map and list representation
*/
class TablesAvailable {

	/*
	 * Set our map to @map and synchronize our list with the newly created map
	 * @param {Map} map
	*/
	constructor(map) {
		this.map = map;
		this.syncList();
	}

	/*
	 * Synchronize our list with our map
	 * This is a sorted list, where where each element represents the size of a table
	 * Each element appears the same amount of times as there are number of available tables of that size in the restaurant
	 * i.e [2,2,2,3,3,4] -> three 2-seaters, two 3-seaters, one 4-seater
	*/
	syncList() {
		let self = this;
		self.list = [];

		this.map.forEach((v, k) => {
			for (let i = 0; i < v; i++) {
				self.list.push(k);
			}
		});
	}

	/*
	 * Update our map of available tables
	 * @param {Number/String} key
	 * @param {Boolean} isDecr
	 * @param {Number} num
	*/
	updateAvailability(key, isDecr, num) {

		if (this.map.get(key) > 0) {
			if (isDecr) {
				this.map.set(key, this.map.get(key) - num);
			}else {
				this.map.set(key, this.map.get(key) + num);
			}
		}

	}

	/*
	 * Synchronize our map & our list
	 * @param {Number/String} key
	 * @param {Boolean} isDecr
	 * @param {Number} num
	*/
	sync(key, isDecr=true, num=1) {

		this.updateAvailability(key, isDecr, num);
		this.syncList();

	}

	/*
	 * @return {Boolean} - true if our list is empty, false if not
	*/
	isEmpty() {
		return this.list.length === 0;
	}

}

module.exports = TablesAvailable;
