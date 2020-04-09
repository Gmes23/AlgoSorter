
//  the array uses i to check what child we 
// are targeting from array-circles class, since its  
// redner in a map, then we log each change or move from
//  the sort into an array and then place those moves in an
//   equation that changes the background css according to the moves that happened.
//  uses math we can say that the final 3rd array within the array, 
// of every 3 moves is what the solution should be and use that to change the 
// css of the nth child div 
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
