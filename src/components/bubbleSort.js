

export function getBubbleSortAnimations(array) {
    const animations = [];
    // let inputArr = array;
    let len = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
            if (array[i] > array[i + 1]) {

                let tmp = array[i];
                


                animations.push([i,i])
                array[i] = array[i + 1];

                animations.push([i,i + 1])


                array[i + 1] = tmp;
                animations.push([i ,array[i]])


                swapped = true;
            }
        }
    } while (swapped);

    return animations;

}
