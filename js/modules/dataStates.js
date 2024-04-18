import toolbox from "./toolbox.js"
import DataHandler from "./data.js"
import GraphHandler from "./graph.js"
import Progressbar from "./progressbar.js"
import SysInfo from "./sysInfo.js"


export default class StateMachine { // Handles the different states
    constructor(mainState,subState, states) {
        this.mainState = mainState;
        this.subState = subState;
        this.states = states
        this.toolbox = new toolbox()
        this.switchMainState(mainState, subState)
        this.switchSubState(subState)
    }

    switchMainState(mainState) { // Switch the main state ie. which component is being displayed on graph
        this.mainState = mainState
        this.updateMainSelection()
       
        

        // Create the buttons to switch sub states
        const graphBtns = document.getElementById("graphBtns")
        this.toolbox.clearElement(graphBtns)
        this.toolbox.createBtns(this.states[mainState].length, graphBtns, this.states[mainState], this.states[mainState], ["subStateBtn"])
        const btns = document.getElementsByClassName("subStateBtn")
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', (e) => {
                this.switchSubState(e.target.id)
            })
        }

        this.switchSubState(this.states[mainState][0])
        this.updateSubSelection()




        
    }   



    switchSubState(subState){; // Switches the substate ie. sysinfo for the the mainstate component
        this.subState = subState
        this.updateSubSelection()
    }
    
    updateMainSelection(){ // Update the visuals of which component is selected
        const elements =  Array.from(document.getElementsByClassName("component-info"))
        elements.forEach(element => {
            element.style.border = "#7d2ae800 solid 3px"
        });


        const element =  document.getElementById(this.mainState)
        element.style.border = "#7d2ae8 solid 3px"
    }


    updateSubSelection(){ // Update the visuals of which sysinfo is selected

        const elements =  Array.from(document.getElementsByClassName("subStateBtn"))
        elements.forEach(element => {
            element.style.color = "#414141"
        });

        const element =  document.getElementById(this.subState)
        element.style.color = "#fff"
    }

    
    updateData(cpu, ram, disk, dataHandler){ // Updates sysinfo and visualisations -- should be reworked
        
        const data = dataHandler.realFakeData_DEBUG()
        

        const sysInfo = new SysInfo()    
        
        // Cpu
       
        cpu.setvalue(data.cpu.utilization)
        sysInfo.updateCpu(data.cpu.utilization, data.cpu.temp)

        // Ram
        const ramPercent = data.ram.used / data.ram.total * 100
        ram.setvalue(Math.round(ramPercent))
        sysInfo.updateRam(data.ram.used, data.ram.total)

        // Disk
        const diskPercent = data.disk.used / data.disk.total * 100
        disk.setvalue(Math.round(diskPercent))
        sysInfo.updateDisk(data.disk.used, data.disk.total)
        
        // Network
        sysInfo.updateNetwork(data.network.up, data.network.down)

    }

}


