export function getQuickSortAnimations(array) {
    const animations = [];

    console.log(array, ' array fromqs')
    return quickSort(array);

}

function quickSort(arr) {
    // Checks that we have an array greater than 2 
    console.log(arr)
    if (arr.length === 1) { 
        return arr;
    }

    // our pivot(element) is the last element in the array
    var pivot = arr[arr.length - 1];
    // We then set two empty arrays
    var leftArr = [];
    var rightArr = [];

    // Starting from the pivot we compare is the current element in the array is less then 
    // our pivot and place it on a left array, if its equal to or greater we place it on the 
    // right array 
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    // As long as the left array and right array is greater than one element we keep 
    // running quicksort recusively
    if (leftArr.length > 0 && rightArr.length > 0) {
        return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
        // our pivot can be the last element so we keep quick sorting until the left array length is zero
    } else if (leftArr.length > 0) {
        return [...quickSort(leftArr), pivot];
        // our pivot could have move to the front so we have conditional to quick sort to the right array as well
    } else {
        return [pivot, ...quickSort(rightArr)];
    }
}
