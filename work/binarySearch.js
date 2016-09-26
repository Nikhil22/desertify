/*
 * Plain old binary search
 * @param {Array} arr - sorted
 * @param {Number} el
 * @param {Function} compareFn
 * @return {Number} - the index of @el in @arr or (-m-1) where m is the insertion point for the new element
 */
const binarySearch = (arr, el, compareFn = (a, b) => {
    return a - b
}) => {
    let m = 0;
    let n = arr.length - 1;
    while (m <= n) {
        let k = (n + m) >> 1;
        let cmp = compareFn(el, arr[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if (cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

/*
 * Retrieves the next larger element than @el in  @arr
 * @param {Array} arr
 * @param {Number} el -> the number that we want to find an element larger than
 * @return {Number} -> The next larger element than @el in @arr
 * Note: @el need not exist in @arr
 */
const findSmallestLarger = (arr, el) => {
    const idx = binarySearch(arr, el, (a, b) => {
        return b > a ? -1 : 1;
    });
    return arr[Math.abs(idx + 1)];
}

module.exports = {
    binarySearch,
    findSmallestLarger
};
