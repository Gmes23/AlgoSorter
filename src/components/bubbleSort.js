

export function getBubbleSortAnimations(array) {
    const animations = [];
    let inputArr = array;
    let len = inputArr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i] > inputArr[i + 1]) {

                let tmp = inputArr[i];

                inputArr[i] = inputArr[i + 1];
                animations.push([inputArr[i]])
                inputArr[i + 1] = tmp;
                animations.push([inputArr[i + 1]])

                swapped = true;
            }
        }
    } while (swapped);

    return inputArr;

}
