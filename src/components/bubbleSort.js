

export function bubbleSortAnimation(array) {
    const animations = [];

    let swapped = false;

    if (array.length <= 1) return array;

    let endOfArray = array.length - 1;

    do { bubbleSort(endOfArray, animations) } while (swapped);
    return animations;
}


function bubbleSort(endOfArray, animations) {

    for (let i=0; i < end; i++) {
        if (unsortedArray[i] > unsortedArray[i+1]) {
            swapped = true;
            let temp = unsortedArray[i];
            unsortedArray[i] = unsortedArray[i + 1];
            unsortedArray[i + 1] = temp;
        }
    }
    end --;

};