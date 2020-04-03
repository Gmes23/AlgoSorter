import React, { useReducer, useState, useEffect } from 'react';
import { getMergeSortAnimations } from './helpers.js';
import './sortingVisualizer.css';


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

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
    /*
      This predefines the array size
      const placeholderArray = new Array(NUMBER_OF_ARRAY_BARS);
      makes the array that size
      new Array(5) == [undefined, undefined, undefined, undefined, undefined]
    */
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

  useEffect(() => {

    var map = new MoonMap('#center', {
      moonSelector: '.array-circle',
      radius: 140
    });

    // map.startCarousel(150);
  })

  return (
    <div>

      <div className="container-fluid">

        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <button onClick={() => handleReset()}> Reset </button>
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <button onClick={() => mergeSort()}> Merge Sort </button>
              </a>
              <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                Blog
              </a>
            </div>
          </div>
        </nav>


        <div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>


    <div class="col-sm">

          <div className="array-container">
            {array.map((value, id) => (
              <div
                className="array-circle"
                key={id}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  // height: `${value}px`,
                  position: 'relative',
                  top: '20%',

                }}>{value}</div>
            ))}
            <div>
              <div id="center" className="orbit-center">
                <span> π </span>
              </div>
            </div>
          </div>

    </div>


    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>



      </div>
      {/* <button onClick={()=> dispatch({ type: 'resetArray' })}> Reset Sort</button> */}
    </div>
  )
}



// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Not working 
function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}



var MoonMap = function (querySelector, options) {

  // keep track of the moons we've added
  this.moons = [];

  this.lastRotation = 0;
  this.selector = querySelector;

  // keep track of the currently active moon
  this.currentlyActive = -1;

  if (typeof options !== 'object')
    options = {};

  var defaults = {
    active: function () { }, // active event
    activeClass: 'active',
    content: '',
    degrees: 360,
    // This changes the width of the circle, increase to make the circle bigger
    margin: 100,
    moonClass: 'moon',
    n: 12,
    radius: false,
    removeOriginal: true,
    startAngle: 90
  };

  // Define the method for merging options
  this.extend = function (a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  // Make sure a querySelector was defined
  if (typeof querySelector == 'undefined') {
    console.error('No query selector was provided to the MoonMap constructor');
    return;
  }

  var element = document.querySelector(querySelector);
  this.options = this.extend(defaults, options);
  this.map = element;

  this.makeAbsolute = function (str) {
    return '<div style="position:relative"><div className="_moon_content" style="position:absolute;width:100%;height:100%">' + str + '</div></div>';
  }
  console.log(element, 'element ')

  if (!this.options.radius)
    this.options.radius = element.offsetWidth + this.options.margin;

  // Calculate the offsets
  var offsetToParentCenter = parseInt(element.offsetWidth / 2);  //assumes parent is square

  // Append the moons
  if (typeof this.options['moonSelector'] !== 'undefined') {

    // moons are defined in the DOM
    var moons = document.querySelectorAll(this.options['moonSelector']),
      n = moons.length,
      div = 360 / n,
      angle = 360 - this.options.startAngle;

    for (var i = 0; i < n; ++i) {

      var moon = document.createElement('div'),
        node = moons[i].cloneNode(true),
        y = Math.sin((angle) * (Math.PI / 180)) * this.options.radius,
        x = Math.cos((angle) * (Math.PI / 180)) * this.options.radius;

      moon.className = this.options.moonClass;
      moon.style.position = 'absolute';
      moon.style.visibility = 'hidden';
      moon.innerHTML = this.makeAbsolute(node.outerHTML);

      element.appendChild(moon);

      var offsetToChildCenter = moon.offsetWidth / 2,
        totalOffset = offsetToParentCenter - offsetToChildCenter;


      moon.style.top = (y + totalOffset).toString() + "px";
      moon.style.left = (x + totalOffset).toString() + "px";
      moon.style.visibility = 'visible';


      if (this.options.removeOriginal)
        moons[i].parentNode.removeChild(moons[i]);

      this.moons.push(moon);

      angle += div;
    }


  } else {

    // moons are NOT defined in the DOM, and are added programmatically
    var n = this.options.n,
      div = 360 / n,
      angle = 360 - this.options.startAngle;


    for (var i = 1; i <= this.options.n; ++i) {

      var moon = document.createElement('div'),
        y = Math.sin((angle) * (Math.PI / 180)) * this.options.radius,
        x = Math.cos((angle) * (Math.PI / 180)) * this.options.radius;

      moon.className = this.options.moonClass;
      moon.style.position = 'absolute';
      moon.style.visibility = 'hidden';

      // check to see if a content setter function was passed in the options
      if (typeof this.options.content == 'function') {

        moon.innerHTML = this.makeAbsolute(this.options.content(i, moon));

      } else if (this.options.content) {

        moon.innerHTML = this.makeAbsolute(this.options.content);
      }

      element.appendChild(moon);

      var offsetToChildCenter = moon.offsetWidth / 2,
        totalOffset = offsetToParentCenter - offsetToChildCenter;

      moon.style.top = (y + totalOffset).toString() + "px";
      moon.style.left = (x + totalOffset).toString() + "px";
      moon.style.visibility = 'visible';


      this.moons.push(moon);

      angle += div;

    }

  }

  this.moonEvent = function (event, fn) {

    var map = this;

    for (var i = 0; i < this.moons.length; i++) {

      this.moons[i].addEventListener(event, function () {

        fn(this, map);
      });

    }

  }

  this.rotateMoons = function (degrees, ms) {

    if (typeof degrees == 'undefined')
      degrees = 90;

    if (typeof ms == 'undefined')
      ms = 1000;

    var seconds = ms / 1000,
      prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', ''],
      newPosition = this.lastRotation + degrees;

    this.lastRotation = degrees;

    for (var k = 0; k < prefixes.length; k++) {

      var prefix = prefixes[k];

      this.map.style[prefix + 'transition'] = 'all ' + seconds + 's ease-in-out';
      this.map.style[prefix + 'transform'] = 'rotate(' + degrees + 'deg)';



    }

  }

  this.current = function () {

    return this.currentlyActive;
  }

  this.next = function () {

    var nextActive = this.currentlyActive + 1;

    if (nextActive > this.moons.length - 1)
      nextActive = 0;

    return nextActive;


  }

  // this.previous = function(){

  // 	prevActive = this.currentlyActive -1;

  // 	if (typeof this.moons[prevActive] == 'undefined')
  // 		prevActive = this.moons.length-1;

  // 	return prevActive;


  // }

  this.startCarousel = function (speed) {

    if (typeof speed == 'undefined')
      speed = 1200;

    var obj = this,
      options = this.options;

    setInterval(function () {

      var moons = obj.moons,
        prevActive = obj.current(),
        nextActive = obj.next();

      obj.currentlyActive = nextActive;

      // Remove the highlighted class
      if (typeof moons[prevActive] !== 'undefined')
        moons[prevActive].className = 'moon';

      // Add the highlighted class to the newly activated element
      moons[nextActive].className = moons[nextActive].className + ' ' + options.activeClass;

      if (typeof options.active == 'function')
        options.active(obj);


    }, speed);


  }

}