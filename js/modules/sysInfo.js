export default class SysInfo { // Handles sysinfo --- Way too static should be reworked if time
    constructor(){

    }

    updateCpu(utilization, temp) {
        console.log("UPDATE ", utilization);
        document.getElementById("cpu-temp").innerText = `Temp: ${temp} C°`
        document.getElementById("cpu-utilization").innerText = `Utilized: ${utilization}%`
    }
    updateRam(used, total) {

        const free = total - used

        const usedData = this.dataStorageUnit(used, 1)
        const totalData = this.dataStorageUnit(total, 1)
        const freeData = this.dataStorageUnit(free, 1)
        
   

        document.getElementById("ram-used").innerText = `Used: ${usedData[0]} ${usedData[1]}`
        document.getElementById("ram-total").innerText = `Total: ${totalData[0]} ${totalData[1]}`
        document.getElementById("ram-free").innerText = `Free: ${freeData[0]} ${freeData[1]}`
        
        
    }
    updateDisk(used, total){
        const free = total - used

        const usedData = this.dataStorageUnit(used, 1)
        const totalData = this.dataStorageUnit(total, 1)
        const freeData = this.dataStorageUnit(free, 1)
        
   

        document.getElementById("disk-used").innerText = `Used: ${usedData[0]} ${usedData[1]}`
        document.getElementById("disk-total").innerText = `Total: ${totalData[0]} ${totalData[1]}`
        document.getElementById("disk-free").innerText = `Free: ${freeData[0]} ${freeData[1]}`
    }
    updateNetwork(up, down){
        document.getElementById("network-up").innerText = `Up: ${up} Kb/s`
        document.getElementById("network-down").innerText = `Down: ${down} Kb/s`
    }


    dataStorageUnit(value, decimals) { // Very basic method the dertermine if mb or gb
        let size; 
        //console.log(value);
        if (value > 1000) {
            value = value/1000
            value = (Math.round(value * 100) / 100).toFixed(decimals);
            size = "GB"
        } 
        else {
            size = "MB" 
        }
       
        return [value, size]
    }
}