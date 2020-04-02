import React, { useReducer, useState } from 'react';
import { getMergeSortAnimations } from './helpers.js';
import './sortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


function appReducer(state, action) {
  switch (action.type) {
    case 'resetArray': {
      return [
        ...state,
        testFunction(),
      ];
    }
    case 'mergeSort': {
      return [
        ...state,
        testFunction(),
      ];
    }
    default:
      break;
  }
}



function testFunction(state, array) {
  console.log(state)
}

export default function TodosApp() {
  const [state, dispatch] = useReducer(appReducer, [])
  const [array, setArray] = useState([]);

  function handleReset() {
    // const placeholderArray = new Array(NUMBER_OF_ARRAY_BARS);
    // makes the array that size
    // new Array(5) == [undefined, undefined, undefined, undefined, undefined]
    const placeholderArray = new Array(NUMBER_OF_ARRAY_BARS);
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      placeholderArray[i] = randomIntFromInterval(5, 730);
    }
    setArray(placeholderArray)
    console.log(array)
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-circle');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  function bubblerSort() {

  }

  return (
    <div>
      <div className="array-container">
        {array.map((value, id) => (
          <div
            className="array-circle"
            key={id}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              position: 'relative',
              top: '20%',
              
            }}></div>
        ))}
      </div>

      <h1> Sort App </h1>
      <button onClick={() => handleReset()}> Reset </button>
      <button onClick={() => mergeSort()}> Merge Sort </button>

      {/* <button onClick={()=> dispatch({ type: 'resetArray' })}> Reset Sort</button> */}




    </div>
  )
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}