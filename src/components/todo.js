import React, { useReducer, useState, useEffect } from 'react';
import { getMergeSortAnimations } from './helpers.js';
import './sortingVisualizer.css';

import { Nav, Container, Row, Col } from 'react-bootstrap';
import { set } from 'animejs';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of circles (value) in the array.
const NUMBER_OF_ARRAY_CIRCLES = 20;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'rgb(${value}, 12, 54)';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'rgb(${value}, 12, 54)';


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
      const placeholderArray = new Array(NUMBER_OF_ARRAY_CIRCLES);
      makes the array that size
      new Array(5) == [undefined, undefined, undefined, undefined, undefined]
    */
    // var elements = document.getElementsByClassName('moon');
    // while(elements.length > 0){
    //     elements[0].parentNode.removeChild(elements[0]);
    // }
  //  var el = document.getElementsByClassName('moon');
  //  if(el) {el.remove()}
  // console.log(el.remove() , 'el')
    const placeholderArray = new Array(NUMBER_OF_ARRAY_CIRCLES);
    for (let i = 0; i < NUMBER_OF_ARRAY_CIRCLES; i++) {
      placeholderArray[i] = randomIntFromInterval(1, 255);
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
        const color = i % 3 === 0 ? `rgb(${barTwoIdx}, 206, 133)` : `rgb(${barOneIdx}, 206, 133)`;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newColor] = animations[i];
          console.log(animations[i], 'animations[i]')

          const barOneStyle = arrayBars[barOneIdx].style;
          console.log(newColor, 'newColor')
          console.log(barOneStyle.backgroundColor, 'barOneStyle.backgroundColor')
          console.log(animations[1], 'animations[i]')


          barOneStyle.backgroundColor = `rgb(${newColor}, 206, 133)`;
          console.log(barOneStyle.backgroundColor, 'barOneStyle.backgroundColor')

        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  function bubblerSort() {
    console.log("Hello World")
  }

  useEffect(() => {
    var circleEffect = new MoonMap('#center', {
      moonSelector: '.array-circle',
      // This changes the radius of the overall circle
      radius: 180
    });

    // circleEffect.startCarousel(150);
  })

  return (
    <div>
      {/*  Header */}
      <div className="gm-header">
        <div className="container-fluid">

          <Container fluid>
            <Row>
              <Col>
        <div className="gm-logo"> 
        <h1 className="gm-font gm-font-logo ">  Algo Sorter </h1>
        </div>

                <Nav className="justify-content-end" as="ul">
                  
                  <Nav.Item as="li">
                    <Nav.Link>
                      <button
                        className="gm-font"
                        onClick={() => handleReset()}
                      >
                        Reset
              </button>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link eventKey="link-1">
                      <button
                        className="gm-font"
                        onClick={() => mergeSort()}
                      >
                        Merge Sort
              </button>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link eventKey="link-2">
                      <button
                        className="gm-font"
                        onClick={() => bubblerSort()}
                      >
                        Bubble Sort
              </button>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link eventKey="link-3">
                      <button
                        className="gm-font"
                        onClick={() => bubblerSort()}
                      >
                        Heap Sort
              </button>
                    </Nav.Link>
                  </Nav.Item>


                  <Nav.Item as="li">
                    <Nav.Link eventKey="link-4">
                      <button
                        className="gm-font"
                        onClick={() => bubblerSort()}
                      >
                        Quick Sort
              </button>
                    </Nav.Link>
                  </Nav.Item>

                </Nav>
              </Col>
            </Row>
          </Container>
        </div>
        </div>
        {/* MAIN BODY  */}
      <div className="gm-body">
          <div className="container">
            <div className="row">
              <div className="col-sm">
            </div>

              <div className="col-sm">
                <div className="array-container">
                  {array.map((value, id) => (
                    <div
                      className="array-circle"
                      key={id}
                      value={value}
                      style={{
                        backgroundColor: `rgb(${value}, 206, 133)`,
                        // height: `${value}px`,
                        position: 'relative',
                        top: '20%',
                        width: '43px',
                        height: '43px',
                        borderColor: 'white',
                      }}>
                    </div>
                  ))}
                  <div>
                    <div id="center" className="orbit-center">
                      <span className="gm-font"> π </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm">
            </div>
            </div>
          </div>
        </div>

      

      {/*  FOOTER  */}
      <div className="gm-footer">
        <h3 className="gm-font"> 255 </h3>
         footer 
      </div>
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