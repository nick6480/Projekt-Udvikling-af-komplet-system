import GraphHandler from "./modules/graph.js"
import Progressbar from "./modules/progressbar.js"
import DataState from "./modules/dataStates.js"
import DataHandler from "./modules/data.js"


// GRAPH

let data = [100, 12, 6, 9, 12, 3, 9]

const graph = new GraphHandler(document.getElementById('mainChart'), data)

graph.newChart()

graph.newValue(80)
graph.newValue(90)
graph.newValue(50)
data = [100, 12, 6, 9, 12, 3, 9]




// DATA VISUALISATION STATES
const states = {
    cpu: ["utilization", "temperature"],
    ram: ["used"],
    disk: ["used"],
    network: ["up", "down"]
}


const dataState = new DataState("cpu", "utilization", states)
dataState.switchMainState("cpu", "utilization")

let elements = document.getElementsByClassName("component-info")

export function getClickedComponent (e) {
    let element = e.target
    while (true) {
        if (!element.classList.contains("component-info")) 
            element = element.parentElement 
        else
            break;
    } 
    //console.log(element.id)
    dataState.switchMainState(element.id)
};


for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', getClickedComponent, false);
}





//Updata data

const cpuProgress = new Progressbar(document.getElementById('cpu-progress'), 0)
const ramProgress = new Progressbar(document.getElementById('ram-progress'), 0)
const diskProgress = new Progressbar(document.getElementById('disk-progress'), 0)

const dataHandler = new DataHandler()

setInterval( function() { dataState.updateData(cpuProgress, ramProgress, diskProgress, dataHandler); }, 5000 );


function updateDebug() { 
    let num = Math.floor(Math.random() * 100)
    graph.newValue(num) 

  }  
  setInterval(updateDebug, 5000);  

  
