let entries = require('../work/entries');
/*
 * A stateful object representing the size of each table available
 * Keeps track of this both a map and list representation
*/
class TablesAvailable {

	/*
	 * Set our map to @obj and synchronize our list with the newly created map
	 * @param {Object} obj
	*/
	constructor(obj) {
		this.map = obj;
		this.syncList();
	}

	/*
	 * Synchronize our list with our map
	*/
	syncList() {
		this.list = [];

		for (let [key, value] of entries(this.map)) {
			for (let i = 0; i < value; i++) {
				this.list.push(key)
			}
		}
	}

	/*
	 * Update our map of available tables
	 * @param {Number/String} key
	 * @param {Boolean} isDecr
	 * @param {Number} num
	*/
	updateAvailability(key, isDecr, num) {

		if (this.map[key] > 0) {
			if (isDecr) {
				this.map[key] -= num;
			}else {
				this.map[key] += num;
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
