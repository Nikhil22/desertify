/*
 * A generator to iterate through keys, values of an object
 * @param {Object} obj
 * @return {Generator} a Generator, whose 'next' property is an Array, denoting a [key,value] pair of @obj
 */
function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

module.exports = entries;
