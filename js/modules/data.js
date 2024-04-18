export default class dataHandler {
    async fetchData (data, URL) { // Get data from server with fetch
 
        fetch(URL, {
          method: 'get',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            data: data,
          })
        }) .then(res => { // Resoponse
          return res.json()
        })
     
    
    }
    saveData(data) { // Store the data into localstorage
        localStorage.setItem("data", JSON.stringify(data));
    }
    readData(data) { // Read data from localstorage
        data = localStorage.getItem("userData");
        console.log("data: ", JSON.parse(data));
    }


    // DEBUG METHODS
    realFakeData_DEBUG() { // Create random sysinfo data as object
        const data = {
            cpu: {
                temp: this.randomInt_DEBUG(48, 77),
                utilization: this.randomInt_DEBUG(42, 63)
            },
            ram: {
                used: this.randomInt_DEBUG(1000, 2000),
                total: 4000
            },
            disk: {
                used: 35243,
                total: 100000
            },
            network: {
                up: this.randomFloat_DEBUG(1, 3, 2),
                down: this.randomFloat_DEBUG(1, 4, 2)
            },
            general: {
                os: "Raspberry Pi OS",
                dataTime: this.currentDate_DEBUG
            }
        }

        this.saveData(data)
        return data

    }

    randomInt_DEBUG(min, max) { // Returns a random integer
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomFloat_DEBUG(min, max, decimals) { // Returns Random Float
        let factor = Math.pow(10, decimals);
        return Math.round((Math.random() * (max - min) + min) * factor) / factor;
    }

    currentDate_DEBUG() { // Returns current datetime in format :yyyy-mm-ddThh:mm:ss
        const now = new Date();
      
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }    
}



