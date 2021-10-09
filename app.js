let gridContainer = document.querySelector(".grid-container");
let gridSizeChanger = document.querySelector("#grid-size");
let rainbowSketcher = document.querySelector("#rainbow-sketch");
let pastelSketcher = document.querySelector("#pastel-sketch");
let randomSketcher = document.querySelector("#random-sketch");
let blackSketcher = document.querySelector("#black-sketch");
let eraser = document.querySelector("#eraser");
let clicker = document.querySelector("#clicker");
let hover = document.querySelector("#hover");
let gridResetter = document.querySelector("#reset");
let gridSize = 10;
let paintType = "black";
let currentColor;
let currentMode = "hover";
etchSketch();
// sketch starter and selector functions
function etchSketch() {
  gridSize = 20;
  createGrid(gridSize);
  hover.addEventListener(`click`, modeChanger);
  clicker.addEventListener(`click`, modeChanger);
  gridSizeChanger.addEventListener("click", changeGridSize);
  rainbowSketcher.addEventListener(`click`, colorChanger);
  blackSketcher.addEventListener(`click`, colorChanger);
  pastelSketcher.addEventListener(`click`, colorChanger);
  randomSketcher.addEventListener(`click`, colorChanger);
  eraser.addEventListener(`click`, colorChanger);
  gridResetter.addEventListener(`click`, resetGrid);
}

function modeChanger(e) {
  if (e.target.id === "clicker") {
    currentMode = "clicker";
    clearEventListeners();
    gridItemSelectAndListen();
  } else if (e.target.id === "hover") {
    currentMode = "hover";
    gridItemSelectAndListen();
  }
}

//grid modification and event listener functions

function clearEventListeners() {
  let gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((gridItem) => {
    gridItem.replaceWith(gridItem.cloneNode(true));
  });
}

function resetGrid() {
  gridContainer.innerHTML = "";
  createGrid(gridSize);
}

function changeGridSize(e) {
  gridContainer.innerHTML = "";
  gridSize = prompt("enter grid size: max 100 ");
  if (!gridSize) gridSize = 20;
  gridSize > 100 ? (gridSize = 100) : gridSize;
  createGrid(gridSize);
}

function createGrid(gridSize) {
  console.log(gridSize);
  gridContainer.setAttribute(
    "style",
    `grid-template-columns: repeat(${gridSize},1fr) ; grid-template-rows: repeat(${gridSize},1fr)`
  );
  for (let i = 1; i <= gridSize * gridSize; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridContainer.appendChild(gridItem);
  }
  gridItemSelectAndListen();
}

function gridItemSelectAndListen() {
  let gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((gridItem) => {
    gridItem.addEventListener("mouseover", paintgridItem);
  });
}

//color decision and painter functions

function paintgridItem(e) {
  if (e.buttons == 1 && currentMode === "clicker") {
    paint(e);
  } else if (currentMode === "hover") {
    paint(e);
  }
}

function colorChanger(e) {
  if (e.target.id === "rainbow-sketch") {
    paintType = "rainbow";
  } else if (e.target.id === "pastel-sketch") {
    paintType = "pastel";
  } else if (e.target.id === "random-sketch") {
    paintType = "random";
    let colorArray = randomColorGenerator();
    currentColor = `rgb(${colorArray[0]},${colorArray[1]},${colorArray[2]})`;
  } else if (e.target.id === "black-sketch") {
    paintType = "black";
  } else if (e.target.id === "eraser") {
    paintType = "eraser";
  }
}

function paint(e) {
  if (paintType === "black") {
    currentColor = `black`;
    e.target.setAttribute(`style`, `background-color:${currentColor};`);
  } else if (paintType === "eraser") {
    currentColor = `white`;
    e.target.setAttribute(`style`, `background-color:${currentColor};`);
  } else if (paintType === "pastel") {
    let colorArray = randomColorGenerator();
    let alpha = Math.random();
    if (alpha > 0.5) alpha -= 0.3;
    e.target.setAttribute(
      `style`,
      `background-color: rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${alpha});`
    );
  } else if (paintType === "rainbow") {
    let colorArray = randomColorGenerator();
    let alpha = (Math.random(2) + 9) / 10;
    e.target.setAttribute(
      `style`,
      `background-color: rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${alpha});`);
  } else if (paintType === "random") {

    e.target.setAttribute(`style`, `background-color:${currentColor}`);
  }
}

//helper functions

function randomGenerator(num1, num2 = 0) {
  return Math.floor(Math.random() * (num1 - num2));
}

function randomColorGenerator() {
  let colorArray = [];
  let red = randomGenerator(255);
  let blue = randomGenerator(255);
  let green = randomGenerator(255);
  colorArray.push(red, green, blue);
  return colorArray;
}