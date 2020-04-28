import React, { useReducer, useState, useEffect, useRef } from "react";
import { getMergeSortAnimations } from "./mergeSort.js";
import { getBubbleSortAnimations } from "./bubbleSort.js";
import { getQuickSortAnimations } from "./quickSort.js";
import { getMaxHeapAnimations } from "./heapSort.js";

import "./sortingVisualizer.css";

import { Nav, Container, Row, Col } from "react-bootstrap";


function Waves() {
  return (
    <div>
          <svg class="waves" xmlns="http://www.w3.org/2000/svg" link="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax" stroke="none" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
          <polyline id="Path-7" points="1.28303023 1.16256382 7.78303023 6.6486721 1.28303023 12.1486721 1.28303023 1.20000005"></polyline>
                <use xlinkHref="#gentle-wave" x="49" y="20" fill="rgba(149,207,182,0.8)" />
                <use xlinkHref="#gentle-wave" x="49" y="15" fill="rgba(0,87,255,0.8)" />
                <use xlinkHref="#gentle-wave" x="49" y="8" fill="rgba(238,115,115,0.8)" />
                {/* <use xlinkHref="#gentle-wave" x="48" y="7" fill="#000000" /> */}
            </g>
        </svg>
    </div>
  )
}


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of circles (value) in the array.
const NUMBER_OF_ARRAY_CIRCLES = 40;

// Changes the color of selected circle
const BORDER_COLOR = `black`;

// Color of currently selected or swapped circle
const SELECTED_COLOR = `#0057ff`;


function RenderCircles({ array }) {
  console.log("Rendering circles with array:", array);
  return (
    <div>
      {array.map((value, idx) => (
        <div
          className="array-circle"
          id={idx}
          value={value}
          style={{
            backgroundColor: `rgb(${value}, 206, 133)`,
            position: "relative",
            top: "20%",
            width: "40px",
            height: "40px",
            borderColor: "white"
          }}
        />
      ))}
    </div>
  );
}

export default function TodosApp() {
  const makeCircles = () =>
    Array.from({ length: NUMBER_OF_ARRAY_CIRCLES }, () =>
      randomIntFromInterval(10, 255)
    );

  const [array, setArray] = useState(makeCircles());

  function handleReset() {
    console.log(array, 'array from reset')
    const newCircles = makeCircles();
    setArray(newCircles);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-circle");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color =
          i % 3 === 0
            ? `rgb(${barTwoIdx}, 206, 133)`
            : `rgb(${barOneIdx}, 206, 133)`;
        const border = i % 3 === 0 ? `solid` : `solid`;
        const borderColor = i % 3 === 0 ? SELECTED_COLOR : BORDER_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barOneStyle.border = border;
          barTwoStyle.border = border;
          barOneStyle.borderColor = borderColor;
          barTwoStyle.borderColor = borderColor;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newColor] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = `rgb(${newColor}, 206, 133)`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  function bubblerSort() {
    console.log(array, "array");
    const animations = getBubbleSortAnimations(array);
    console.log(array, "array");
    console.log(animations, "animations ");

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-circle");
      console.log(arrayBars, "arraybars ");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color =
          i % 3 === 0
            ? barOneStyle.backgroundColor
            : barTwoStyle.backgroundColor;
        const border = i % 3 === 0 ? `solid` : `solid`;
        const borderColor = i % 3 === 0 ? SELECTED_COLOR : BORDER_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barOneStyle.border = border;
          barTwoStyle.border = border;
          barOneStyle.borderColor = borderColor;
          barTwoStyle.borderColor = borderColor;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newColor, barTwoIdx, newColor2] = animations[i];
          console.log(animations[i], "xx  animations[i]");

          const barOneStyle = arrayBars[barOneIdx].style;
          console.log(
            barOneStyle.backgroundColor,
            "barOneStyle.backgroundColor"
          );

          barOneStyle.backgroundColor = `rgb(${newColor}, 206, 133)`;
          console.log(
            barOneStyle.backgroundColor,
            "barOneStyle.backgroundColor"
          );

          const barTwoStyle = arrayBars[barTwoIdx].style;
          console.log(
            barTwoStyle.backgroundColor,
            "barTwostyle.backgroundColor"
          );

          barTwoStyle.backgroundColor = `rgb(${newColor2}, 206, 133)`;
          console.log(
            barOneStyle.backgroundColor,
            "barTwoStyle.backgroundColor"
          );
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  function quickSort() {
    console.log(array, "array");
    const animations = getQuickSortAnimations(array);
    console.log(animations, "animations");
    console.log(array, "array after");

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-circle");
      console.log(arrayBars, "arraybars ");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color =
          i % 3 === 0
            ? barOneStyle.backgroundColor
            : barTwoStyle.backgroundColor;
        const border = i % 3 === 0 ? `solid` : `solid`;
        const borderColor = i % 3 === 0 ? SELECTED_COLOR : BORDER_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barOneStyle.border = border;
          barTwoStyle.border = border;
          barOneStyle.borderColor = borderColor;
          barTwoStyle.borderColor = borderColor;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newColor, barTwoIdx, newColor2] = animations[i];
          console.log(animations[i], "xx  animations[i]");

          const barOneStyle = arrayBars[barOneIdx].style;
          console.log(
            barOneStyle.backgroundColor,
            "barOneStyle.backgroundColor"
          );

          barOneStyle.backgroundColor = `rgb(${newColor}, 206, 133)`;
          console.log(
            barOneStyle.backgroundColor,
            "barOneStyle.backgroundColor"
          );

          const barTwoStyle = arrayBars[barTwoIdx].style;
          console.log(
            barTwoStyle.backgroundColor,
            "barTwostyle.backgroundColor"
          );

          barTwoStyle.backgroundColor = `rgb(${newColor2}, 206, 133)`;
          console.log(
            barOneStyle.backgroundColor,
            "barTwoStyle.backgroundColor"
          );
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  function heapSort() {
    console.log(array, "array");

    const animations = getMaxHeapAnimations(array);
    console.log(animations);
    console.log(array, "array after");

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-circle");

      // console.log(arrayBars, 'arraybars ')

      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color =
          i % 3 === 0
            ? barOneStyle.backgroundColor
            : barTwoStyle.backgroundColor;

        const border = i % 3 === 0 ? `solid` : `solid`;
        const borderColor = i % 3 === 0 ? SELECTED_COLOR : BORDER_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barOneStyle.border = border;
          barTwoStyle.border = border;
          barOneStyle.borderColor = borderColor;
          barTwoStyle.borderColor = borderColor;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newColor, barTwoIdx, newColor2] = animations[i];
          console.log(animations[i], "xx  animations[i]");

          const barOneStyle = arrayBars[barOneIdx].style;
          console.log(
            barOneStyle.backgroundColor,
            "barOneStyle.backgroundColor"
          );

          barOneStyle.backgroundColor = `rgb(${newColor}, 206, 133)`;
          console.log(
            barOneStyle.backgroundColor,
            "barOneStyle.backgroundColor"
          );

          const barTwoStyle = arrayBars[barTwoIdx].style;
          console.log(
            barTwoStyle.backgroundColor,
            "barTwostyle.backgroundColor"
          );

          barTwoStyle.backgroundColor = `rgb(${newColor2}, 206, 133)`;
          console.log(
            barOneStyle.backgroundColor,
            "barTwoStyle.backgroundColor"
          );
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  // useEffect(() => {
  //   document.querySelector("#center").innerHTML = "";
  //   new MoonMap("#center", {
  //     moonSelector: ".array-circle",
  //     // This changes the radius of the overall circle
  //     radius: 220
  //   });

  //   // This is for binary tree display
  //   // let cx = document.querySelector("canvas").getContext("2d");
  //   // function branch(length, angle, scale) {
  //   //   cx.fillRect(0, 0, 1, length);
  //   //   if (length < 8) return;
  //   //   cx.save();
  //   //   cx.translate(0, length); cx.rotate(-angle);
  //   //   branch(length * scale, angle, scale); cx.rotate(2 * angle);
  //   //   branch(length * scale, angle, scale);
  //   //   cx.restore();
  //   // }
  //   //   cx.translate(300, 0);
  //   //   branch(60, 0.5, 0.8);
  //   // circleEffect.startCarousel(150);
  // }, [array]);

  return (
    <div>
      {/*  Header */}
      <div className="gm-header">
        <div className="container-fluid">
          <Container fluid>
            <Row>
              <Col>
                <div className="gm-logo">
                  <h1 className="gm-font gm-font-logo "> Algo Sorter </h1>
                </div>

                <Nav className="justify-content-end" as="ul">
                  <Nav.Item as="li">
                    <Nav.Link>
                        <button className="gm-font fill-font" onClick={() => handleReset()}>
                        Reset
                      </button>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link eventKey="link-1">
                      <button className="gm-font" onClick={() => mergeSort()}>
                        Merge Sort
                      </button>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link eventKey="link-2">
                      <button className="gm-font" onClick={() => bubblerSort()}>
                        Bubble Sort
                      </button>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link eventKey="link-3">
                      <button className="gm-font" onClick={() => heapSort()}>
                        Heap Sort
                      </button>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li">
                    <Nav.Link eventKey="link-4">
                      <button className="gm-font" onClick={() => quickSort()}>
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
            <div className="col-md">
              <div className="array-container">
                {/* {array.map(value => Circle({ idx: value }))} */}
                {array.map((value, idx) => Circle(value, idx))}

                <div>
                  <div id="center" className="orbit-center">
                    <button><span className="gm-font" onClick={()=> handleReset()}> π </span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  FOOTER  */}
      <div className="gm-footer">
        <h3 className="gm-font"> 255 </h3>

        {/* <Waves /> */}
        {/* <canvas className="gm-canvas" width="600" height="300"></canvas> */}
      </div>
    </div>
  );
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function Circle(value, idx) {
  const options = {
    activeClass: "active",
    content: "",
    degrees: 360,
    // This changes the width of the circle, increase to make the circle bigger
    margin: 0,
    moonClass: "moon",
    // This changes the amount of circles being rendered 
    n: 40,
    // Radius of the circle in pixels 
    radius: 233,
    removeOriginal: true,
    startAngle: 90
  };

  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  var offsetToParentCenter = parseInt(dimensions.width / 2); //assumes parent is square

  const n = options.n;
  const div = 360 / n;
  const angle = 360 - options.startAngle;

  // Future Math algo fun 
  // const angle = 360 - options.startAngle + (idx * Math.PI * Math.PI);

  const y = Math.sin((angle + div * idx) * (Math.PI / 180)) * options.radius;
  const x = Math.cos((angle + div * idx) * (Math.PI / 180)) * options.radius;

  const offsetToChildCenter = dimensions.width / 2;
  const totalOffset = offsetToParentCenter - offsetToChildCenter;

  return (
    <div
      key={idx}
      className="moon"
      ref={targetRef}
      style={{
        position: "absolute",
        visibility: "visible",
        top: (y + totalOffset).toString() + "px",
        left: (x + totalOffset).toString() + "px"
      }}
    >
      <div style={{ position: "relative" }}>
        <div
          className="_moon_content new"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%"
          }}
        >
          <div
            className="array-circle"
            value="157"
            style={{
              backgroundColor: `rgb(${value}, 206, 133)`,
              position: "relative",
              top: "20%",
              width: "40px",
              height: "40px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
