
let gridContainer = document.querySelector(".grid-container");
let gridSizeChanger = document.querySelector("#grid-size");
let gridSize=10;





//event listening
function etchSketch(){


gridSizeChanger.addEventListener('click',changeGridSize);
gridItemSelectAndListen();

}


function changeGridSize(e){
    gridContainer.innerHTML='';
    gridSize = prompt("enter grid size:");
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
    console.log(e.target);
}


etchSketch();