export function getQuickSortAnimations(array) {

    let items = array;
    let animations = [];

    function swap(items, leftIndex, rightIndex) {
        animations.push([ leftIndex, rightIndex ])
        animations.push([ leftIndex, rightIndex ])

        let temp = items[leftIndex];
        
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;

        animations.push([ leftIndex, items[leftIndex] , rightIndex, items[rightIndex] ])

        
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

        let index;
        if (items.length > 1) {
            index = partition(items, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                quickSort(items, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                quickSort(items, index, right);
            }
        }

        return items;
    }
    // first call to quick sort
    let sortedArray = quickSort(items, 0, items.length - 1);
    console.log(sortedArray); //prints [2,3,5,6,7,9]
    return sortedArray, animations;
}