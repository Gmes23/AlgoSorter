export function getQuickSortAnimations(array) {

    let items = array;
    let animations = [];

    function swap(items, leftIndex, rightIndex) {
        
        let temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;

        
    }

    function partition(items, left, right) {
        let pivot = items[Math.floor((right + left) / 2)], //middle element
            i = left, //left pointer
            j = right; //right pointer
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {

                j--;
            }
            if (i <= j) {
                swap(items, i, j); //sawpping two elements
                i++;
                j--;
            }
        }

        return i;
    }

    function quickSort(items, left, right) {
        animations.push([left, right])

        let index;
        if (items.length > 1) {
            index = partition(items, left, right); //index returned from partition
            animations.push([index, index, '1'])
            if (left < index - 1) { //more elements on the left side of the pivot
            animations.push([left, right, '2'])

                quickSort(items, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
            animations.push([right, items[index]])

                quickSort(index, right, '3');
            }
        }

        return items;
    }
    // first call to quick sort
    let sortedArray = quickSort(items, 0, items.length - 1);
    console.log(sortedArray); //prints [2,3,5,6,7,9]
    return sortedArray, animations;
}