
let gridContainer = document.querySelector(".grid-container");
let gridSizeChanger = document.querySelector("#grid-size");
let rainbowSketcher = document.querySelector("#rainbow-sketch");
let pastelSketcher = document.querySelector("#pastel-sketch");
let randomSketcher = document.querySelector("#random-sketch");
let blackSketcher = document.querySelector("#black-sketch");
let eraser = document.querySelector("#eraser");
let gridResetter = document.querySelector("#reset");
let gridSize=10;
let paintType = "black";
let currentColor;





//event listening
function etchSketch(){
gridSize = 20;
createGrid(gridSize);
gridSizeChanger.addEventListener('click',changeGridSize);
rainbowSketcher.addEventListener(`click`,colorChanger);
blackSketcher.addEventListener(`click`,colorChanger);
pastelSketcher.addEventListener(`click`,colorChanger);
randomSketcher.addEventListener(`click`,colorChanger);
eraser.addEventListener(`click`,colorChanger);
gridResetter.addEventListener(`click`,resetGrid);

}
function resetGrid(){
    gridContainer.innerHTML='';
    createGrid(gridSize);

}
function colorChanger(e){
    if(e.target.id === "rainbow-sketch"){
        paintType = "rainbow";
    }
    else if (e.target.id === "pastel-sketch"){
        paintType = "pastel";
    }
    else if (e.target.id === "random-sketch"){
        paintType = "random";
        let red = randomGenerator(255);
        let blue = randomGenerator(255);
        let green = randomGenerator(255);
        currentColor = `rgb(${red},${blue},${green})`;
    }
    else if (e.target.id === "black-sketch"){
        paintType = "black";
    }
    else if(e.target.id === "eraser"){
        paintType = "eraser";
    }
}


function changeGridSize(e){
    gridContainer.innerHTML='';
    gridSize = prompt("enter grid size: max 100 ");
    gridSize > 100 ? gridSize = 100 : gridSize;
    createGrid(gridSize);
    
}
function createGrid(gridSize){
    gridContainer.setAttribute('style',`grid-template-columns: repeat(${gridSize},1fr) ; grid-template-rows: repeat(${gridSize},1fr)`);
    for(let i = 1 ; i <= gridSize*gridSize ; i++){
       let gridItem =  document.createElement('div');
       gridItem.className = "grid-item";
       gridContainer.appendChild(gridItem);
    }
    gridItemSelectAndListen();
}

function gridItemSelectAndListen(){
    let gridItems = document.querySelectorAll(".grid-item");
    //console.log(gridItems);
    gridItems.forEach(gridItem => {
        gridItem.addEventListener('mouseover',paintgridItem);
    })

}

function paintgridItem(e){
    if(paintType==="black"){
        currentColor= `black`;
        e.target.setAttribute(`style`, `background-color:${currentColor};`);
    }
    else if(paintType==="eraser"){
        currentColor= `white`;
        e.target.setAttribute(`style`, `background-color:${currentColor};`)
    }
    else if(paintType === "pastel"){
        let red = randomGenerator(255);
        let blue = randomGenerator(255);
        let green = randomGenerator(255);
        let alpha = Math.random();
        if (alpha > 0.5) alpha -= 0.3;
        e.target.setAttribute(`style`,`background-color: rgb(${red},${blue},${green},${alpha})`);
        

    }
    else if(paintType === "rainbow"){
        let red = randomGenerator(255);
        let blue = randomGenerator(255);
        let green = randomGenerator(255);
        let alpha = (Math.random(2)+9)/10;
        e.target.setAttribute(`style`,`background-color: rgb(${red},${blue},${green},${alpha})`);
        
    }
    else if(paintType==="random"){
        e.target.setAttribute(`style`, `background-color:${currentColor};`)
    }
}

function randomGenerator(num1, num2 = 0) {
  return Math.floor(Math.random() * (num1 - num2));
}


etchSketch();